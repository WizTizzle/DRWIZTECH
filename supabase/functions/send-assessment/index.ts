import sgMail from 'npm:@sendgrid/mail';
import { Buffer } from 'node:buffer';
import fetch from 'npm:node-fetch@3.3.2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function imageUrlToBase64(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
    
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    
    return `data:${contentType};base64,${base64}`;
  } catch (error) {
    console.error('Error converting image to base64:', error);
    return url; // Fallback to original URL if conversion fails
  }
}

function formatDeviceImages(images: string[]): string {
  if (!images?.length) return '';
  
  return `
    <div style="margin: 20px 0;">
      <h3 style="color: #333; margin-bottom: 10px;">Device Images</h3>
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
        ${images.map((url, index) => `
          <img src="${url}" 
               alt="Device image ${index + 1}" 
               style="width: 100%; max-width: 300px; height: auto; border-radius: 8px;"
          />
        `).join('')}
      </div>
    </div>
  `;
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

  return Object.entries(sections).map(([section, items]) => `
    <div style="margin: 20px 0;">
      <h3 style="color: #333; margin-bottom: 10px;">${section}</h3>
      <table style="width: 100%; border-collapse: collapse;">
        ${items.map(([key, value]) => `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; width: 30%;">
              ${key}
            </td>
            <td style="padding: 8px; border: 1px solid #ddd;">
              ${value}
            </td>
          </tr>
        `).join('')}
      </table>
    </div>
  `).join('');
}

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

    // Convert image URLs to base64
    const base64Images = deviceImages?.length 
      ? await Promise.all(deviceImages.map(url => imageUrlToBase64(url)))
      : [];

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
        <h2 style="color: #4B9CD3; margin-bottom: 20px;">
          New Data Recovery Assessment - Ticket #${ticketId || 'Pending'}
        </h2>
        
        <div style="margin: 20px 0;">
          <h3 style="color: #333; margin-bottom: 10px;">Customer Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; width: 30%;">Name</td>
              <td style="padding: 8px; border: 1px solid #ddd;">
                ${customerInfo.firstName} ${customerInfo.lastName}
              </td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${customerInfo.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Phone</td>
              <td style="padding: 8px; border: 1px solid #ddd;">
                ${customerInfo.phone || 'Not provided'}
              </td>
            </tr>
          </table>
        </div>

        <div style="margin: 20px 0; padding: 15px; background-color: ${
          assessment.severity === 'advanced' ? '#fff3cd' :
          assessment.severity === 'moderate' ? '#cce5ff' : '#d4edda'
        }; border-radius: 8px;">
          <h3 style="margin-bottom: 10px;">Assessment Summary</h3>
          <p style="margin: 0;"><strong>Severity Level:</strong> ${assessment.severity.toUpperCase()}</p>
          <p style="margin-top: 10px;">${assessment.message}</p>
        </div>

        ${formatAssessmentDetails(answers)}
        
        ${formatDeviceImages(base64Images)}

        ${answers.previous_recovery !== 'no' ? `
          <div style="margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 10px;">Previous Recovery Attempts</h3>
            <table style="width: 100%; border-collapse: collapse;">
              ${answers.repair_shop_name ? `
                <tr>
                  <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; width: 30%;">
                    Repair Shop
                  </td>
                  <td style="padding: 8px; border: 1px solid #ddd;">
                    ${answers.repair_shop_name}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">
                    Repair Shop Diagnosis
                  </td>
                  <td style="padding: 8px; border: 1px solid #ddd;">
                    ${answers.repair_shop_diagnosis}
                  </td>
                </tr>
              ` : ''}
              ${answers.recovery_company_name ? `
                <tr>
                  <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">
                    Recovery Service
                  </td>
                  <td style="padding: 8px; border: 1px solid #ddd;">
                    ${answers.recovery_company_name}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">
                    Recovery Service Diagnosis
                  </td>
                  <td style="padding: 8px; border: 1px solid #ddd;">
                    ${answers.recovery_company_diagnosis}
                  </td>
                </tr>
              ` : ''}
            </table>
          </div>
        ` : ''}
      </div>
    `;

    const msg = {
      to: Deno.env.get('ASSESSMENT_EMAIL') || 'assessment@drwiztech.com',
      from: 'noreply@wiztech.zip', // Verified sender email
      subject: `${Deno.env.get('ASSESSMENT_SUBJECT') || 'New Data Recovery Assessment'} - ${assessment.severity.toUpperCase()}`,
      html: emailHtml,
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