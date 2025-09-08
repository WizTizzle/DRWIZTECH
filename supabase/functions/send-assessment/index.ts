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
  customerInfo?: CustomerInfo;
  deviceImages?: string[];
  ticketId?: string;
}

function formatAssessmentDetails(answers: Record<string, string>): string {
  const sections = {
    'Customer Information': [
      ['Name', `${answers.firstName || 'Not provided'} ${answers.lastName || 'Not provided'}`],
      ['Email', answers.email || 'Not provided'],
      ['Phone', answers.phone || 'Not provided']
    ],
    'Shipping Address': [
      ['Address Line 1', answers.address1 || 'Not provided'],
      ['Address Line 2', answers.address2 || 'Not provided'],
      ['City', answers.city || 'Not provided'],
      ['State/Province', answers.state || 'Not provided'],
      ['ZIP/Postal Code', answers.zipCode || 'Not provided'],
      ['Country', answers.country || 'Not provided']
    ],
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

    // For now, we'll simulate email sending since SendGrid isn't available
    // In production, you would configure SendGrid properly
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

    console.log('Email content generated, length:', emailContent.length);

    // Simulate successful email sending
    // In production, you would use SendGrid here:
    /*
    const msg = {
      to: Deno.env.get('ASSESSMENT_EMAIL') || 'assessment@drwiztech.com',
      from: 'noreply@wiztech.zip',
      subject: `${Deno.env.get('ASSESSMENT_SUBJECT') || 'New Data Recovery Assessment'} - ${assessment.severity.toUpperCase()}`,
      text: emailContent,
    };

    await sgMail.send(msg);
    */
    
    console.log('Assessment processed successfully (email simulation)');

    return new Response(
      JSON.stringify({ success: true, message: 'Assessment processed successfully' }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error processing assessment:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Unknown error occurred',
        details: 'Assessment processing failed'
      }),
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