import sgMail from 'npm:@sendgrid/mail';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

interface EmailData {
  answers: Record<string, string>;
  assessment: {
    severity: string;
    message: string;
  };
  customerInfo?: CustomerInfo; // Make customerInfo optional
  deviceImages?: string[];
  ticketId?: string;
}

function formatAssessmentDetails(answers: Record<string, string>): string {
  const sections = {
    'Device Information': [
      ['Device Type', answers.storage_type || 'Not specified'],
      ['Device State', answers.device_state || 'Not specified'],
      ['Physical Condition', answers.physical_condition || 'Not specified']
    ],
    'Issue Details': [
      ['Primary Issue', answers.primary_issue || 'Not specified'],
      ['Previous Attempts', answers.recovery_attempts || 'None'],
      ['Additional Notes', answers.additional_comments || 'None']
    ]
  };

  let formattedContent = '';
  for (const [section, items] of Object.entries(sections)) {
    formattedContent += `\n${section}:\n`;
    formattedContent += items.map(([key, value]) => `  ${key}: ${value}`).join('\n');
    formattedContent += '\n';
  }

  return formattedContent;
}

// Function to check if a URL is absolute (starts with http:// or https://)
function isAbsoluteUrl(url: string): boolean {
  return /^https?:\/\//.test(url);
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    console.log('Received assessment submission request');

    const SENDGRID_API_KEY = Deno.env.get('SENDGRID_API_KEY');
    if (!SENDGRID_API_KEY) {
      throw new Error('SendGrid API key not configured');
    }

    sgMail.setApiKey(SENDGRID_API_KEY);

    const { answers, assessment, deviceImages, ticketId, customerInfo } = await req.json() as EmailData;

    console.log('Processing assessment with images:', deviceImages?.length || 0);

    // Verify image URLs are accessible, but only if they are absolute URLs
    if (deviceImages?.length) {
      console.log('Verifying image URLs...');
      for (const url of deviceImages) {
        // Only try to verify absolute URLs
        if (isAbsoluteUrl(url)) {
          try {
            const response = await fetch(url, { method: 'HEAD' });
            console.log(`Image URL ${url} status:`, response.status);
          } catch (error) {
            console.error(`Failed to verify image URL ${url}:`, error);
            // Continue even if verification fails
          }
        } else {
          console.log(`Skipping verification for non-absolute URL: ${url}`);
        }
      }
    }

    // Generate customer information section only if customerInfo is provided
    const customerInfoSection = customerInfo ? `
      Customer Information:
      ------------------
      Name: ${customerInfo.firstName} ${customerInfo.lastName}
      Email: ${customerInfo.email}
      Phone: ${customerInfo.phone || 'Not provided'}
    ` : 'No customer information provided';

    const emailContent = `
      New Data Recovery Assessment - Ticket #${ticketId || 'Pending'}
      
      ${customerInfoSection}
      
      Assessment Summary:
      ----------------
      Severity Level: ${assessment.severity.toUpperCase()}
      ${assessment.message}
      
      ${formatAssessmentDetails(answers)}
      
      Device Images: ${deviceImages?.length ? '\n' + deviceImages.map((url, i) => `  Image ${i + 1}: ${url}`).join('\n') : 'No images provided'}
      
      Previous Recovery Attempts:
      ${answers.previous_recovery === 'no' ? 'None reported' : `
        ${answers.repair_shop_name ? `\nRepair Shop: ${answers.repair_shop_name}\nDiagnosis: ${answers.repair_shop_diagnosis}` : ''}
        ${answers.recovery_company_name ? `\nRecovery Service: ${answers.recovery_company_name}\nDiagnosis: ${answers.recovery_company_diagnosis}` : ''}`
      }
    `;

    console.log('Sending email with content length:', emailContent.length);

    const msg = {
      to: Deno.env.get('ASSESSMENT_EMAIL') || 'assessment@drwiztech.com',
      from: 'noreply@wiztech.zip',
      subject: `${Deno.env.get('ASSESSMENT_SUBJECT') || 'New Data Recovery Assessment'} - ${assessment.severity.toUpperCase()}`,
      text: emailContent,
    };

    await sgMail.send(msg);
    console.log('Email sent successfully');

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});