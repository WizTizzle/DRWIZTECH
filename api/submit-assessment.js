const sgMail = require('@sendgrid/mail');

// Configure SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Helper function to format assessment details for email
function formatAssessmentDetails(answers) {
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
      ['Data Loss Type', answers.data_loss_type || 'Not specified'],
      ['File System State', answers.file_system_state || 'Not specified'],
      ['Data Access Level', answers.data_access_level || 'Not specified'],
      ['Previous Recovery Attempts', answers.previous_recovery || 'None'],
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

// Function to create RepairDesk ticket
async function createRepairDeskTicket(assessmentData) {
  const { answers, assessment, ticketId } = assessmentData;
  
  // RepairDesk API endpoint (adjust based on their API documentation)
  const repairDeskUrl = `https://api.repairdesk.co/api/web/v1/tickets`;
  
  const ticketData = {
    store_id: process.env.REPAIRDESK_STORE_ID,
    customer: {
      first_name: answers.firstName,
      last_name: answers.lastName,
      email: answers.email,
      phone: answers.phone
    },
    device: {
      type: answers.storage_type || 'Unknown',
      brand: 'Various',
      model: 'Data Recovery Assessment'
    },
    issue_description: `Data Recovery Assessment - ${assessment.severity.toUpperCase()}\n\n${assessment.message}\n\n${formatAssessmentDetails(answers)}`,
    priority: assessment.severity === 'advanced' ? 'high' : 'medium',
    status: 'open'
  };

  try {
    const response = await fetch(repairDeskUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REPAIRDESK_API_KEY}`
      },
      body: JSON.stringify(ticketData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`RepairDesk API error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    return { success: true, ticketId: result.id || ticketId };
  } catch (error) {
    console.error('RepairDesk ticket creation failed:', error);
    // Don't fail the entire process if RepairDesk is down
    return { success: false, error: error.message, ticketId };
  }
}

// Main serverless function handler
module.exports = async (req, res) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ message: 'OK' });
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { answers, assessment, deviceImages, ticketId, customerInfo } = req.body;

    console.log('Processing assessment submission:', {
      hasAnswers: !!answers,
      hasAssessment: !!assessment,
      imageCount: deviceImages?.length || 0,
      ticketId
    });

    // Create RepairDesk ticket
    const repairDeskResult = await createRepairDeskTicket({
      answers,
      assessment,
      ticketId
    });

    // Prepare email content
    const customerInfoSection = customerInfo ? `
      Customer Information:
      ------------------
      Name: ${customerInfo.firstName} ${customerInfo.lastName}
      Email: ${customerInfo.email}
      Phone: ${customerInfo.phone || 'Not provided'}
    ` : 'Customer information included in assessment details below';

    const emailContent = `
      New Data Recovery Assessment - Ticket #${repairDeskResult.ticketId || ticketId || 'Pending'}
      
      ${customerInfoSection}
      
      Assessment Summary:
      ----------------
      Severity Level: ${assessment.severity.toUpperCase()}
      ${assessment.message}
      
      ${formatAssessmentDetails(answers)}
      
      Device Images: ${deviceImages?.length ? '\n' + deviceImages.map((url, i) => `  Image ${i + 1}: ${url}`).join('\n') : 'No images provided'}
      
      RepairDesk Integration: ${repairDeskResult.success ? 'SUCCESS - Ticket created' : `FAILED - ${repairDeskResult.error}`}
      
      Previous Recovery Attempts:
      ${answers.previous_recovery === 'no' ? 'None reported' : `
        ${answers.repair_shop_name ? `\nRepair Shop: ${answers.repair_shop_name}\nDiagnosis: ${answers.repair_shop_diagnosis}` : ''}
        ${answers.recovery_company_name ? `\nRecovery Service: ${answers.recovery_company_name}\nDiagnosis: ${answers.recovery_company_diagnosis}` : ''}`
      }
    `;

    // Send email notification
    const msg = {
      to: process.env.RECIPIENT_EMAIL,
      from: process.env.RECIPIENT_EMAIL, // SendGrid requires verified sender
      subject: `${process.env.ASSESSMENT_SUBJECT || 'New Data Recovery Assessment'} - ${assessment.severity.toUpperCase()}`,
      text: emailContent,
    };

    await sgMail.send(msg);
    console.log('Email sent successfully');

    // Return success response
    res.status(200).json({
      success: true,
      message: 'Assessment processed successfully',
      ticketId: repairDeskResult.ticketId || ticketId,
      repairDeskSuccess: repairDeskResult.success
    });

  } catch (error) {
    console.error('Error processing assessment:', error);
    
    res.status(500).json({
      error: error.message || 'Unknown error occurred',
      details: 'Assessment processing failed'
    });
  }
};