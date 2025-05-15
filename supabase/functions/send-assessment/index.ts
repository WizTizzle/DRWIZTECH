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
  customerInfo: CustomerInfo;
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

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const SENDGRID_API_KEY = Deno.env.get('SENDGRID_API_KEY');
    if (!SENDGRID_API_KEY) {
      throw new Error('SendGrid API key not configured');
    }

    sgMail.setApiKey(SENDGRID_API_KEY);

    const { answers, assessment, deviceImages, ticketId, customerInfo } = await req.json() as EmailData;

    const emailContent = `
      New Data Recovery Assessment - Ticket #${ticketId || 'Pending'}
      
      Customer Information:
      ------------------
      Name: ${customerInfo.firstName} ${customerInfo.lastName}
      Email: ${customerInfo.email}
      Phone: ${customerInfo.phone || 'Not provided'}
      
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

    const msg = {
      to: Deno.env.get('ASSESSMENT_EMAIL') || 'assessment@drwiztech.com',
      from: 'noreply@wiztech.zip', // Verified sender email
      subject: `${Deno.env.get('ASSESSMENT_SUBJECT') || 'New Data Recovery Assessment'} - ${assessment.severity.toUpperCase()}`,
      text: emailContent,
    };

    await sgMail.send(msg);

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