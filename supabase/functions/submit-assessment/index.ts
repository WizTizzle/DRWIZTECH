import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface AssessmentData {
  answers: Record<string, any>;
  assessment: {
    severity: string;
    message: string;
    estimatedCost?: string;
    estimatedTime?: string;
  };
  deviceImages?: string[];
  ticketId?: string;
  customerInfo?: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
}

function formatAssessmentForEmail(data: AssessmentData): string {
  const { answers, assessment, deviceImages } = data;

  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #4B9CD3 0%, #8ED8F8 100%); color: white; padding: 30px; border-radius: 8px; margin-bottom: 30px; }
        .header h1 { margin: 0 0 10px 0; font-size: 28px; }
        .badge { display: inline-block; padding: 6px 12px; border-radius: 4px; font-weight: bold; font-size: 12px; text-transform: uppercase; }
        .badge-standard { background: #10b981; color: white; }
        .badge-moderate { background: #f59e0b; color: white; }
        .badge-advanced { background: #ef4444; color: white; }
        .section { background: #f9fafb; border-left: 4px solid #4B9CD3; padding: 20px; margin: 20px 0; border-radius: 4px; }
        .section h2 { margin-top: 0; color: #4B9CD3; font-size: 18px; }
        .info-row { display: flex; margin: 8px 0; }
        .info-label { font-weight: 600; min-width: 180px; color: #6b7280; }
        .info-value { color: #111827; }
        .images { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px; margin-top: 15px; }
        .images img { width: 100%; height: 200px; object-fit: cover; border-radius: 8px; border: 2px solid #e5e7eb; }
        .footer { margin-top: 30px; padding: 20px; background: #f3f4f6; border-radius: 8px; font-size: 14px; color: #6b7280; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔧 New Data Recovery Assessment</h1>
          <div>
            <span class="badge badge-${assessment.severity}">${assessment.severity.toUpperCase()}</span>
            ${data.ticketId ? `<span style="margin-left: 10px; opacity: 0.9;">Ticket #${data.ticketId}</span>` : ''}
          </div>
        </div>
  `;

  if (data.customerInfo || answers.firstName) {
    html += `
      <div class="section">
        <h2>👤 Customer Information</h2>
        <div class="info-row"><span class="info-label">Name:</span><span class="info-value">${answers.firstName || data.customerInfo?.firstName} ${answers.lastName || data.customerInfo?.lastName}</span></div>
        <div class="info-row"><span class="info-label">Email:</span><span class="info-value">${answers.email || data.customerInfo?.email}</span></div>
        <div class="info-row"><span class="info-label">Phone:</span><span class="info-value">${answers.phone || data.customerInfo?.phone || 'Not provided'}</span></div>
      </div>
    `;
  }

  if (answers.address1) {
    html += `
      <div class="section">
        <h2>📦 Shipping Address</h2>
        <div class="info-row"><span class="info-label">Address:</span><span class="info-value">${answers.address1}</span></div>
        ${answers.address2 ? `<div class="info-row"><span class="info-label">Address 2:</span><span class="info-value">${answers.address2}</span></div>` : ''}
        <div class="info-row"><span class="info-label">City:</span><span class="info-value">${answers.city || 'Not provided'}</span></div>
        <div class="info-row"><span class="info-label">State/Province:</span><span class="info-value">${answers.state || 'Not provided'}</span></div>
        <div class="info-row"><span class="info-label">ZIP/Postal:</span><span class="info-value">${answers.zipCode || 'Not provided'}</span></div>
        <div class="info-row"><span class="info-label">Country:</span><span class="info-value">${answers.country || 'Not provided'}</span></div>
      </div>
    `;
  }

  html += `
    <div class="section">
      <h2>💽 Device & Issue Details</h2>
      <div class="info-row"><span class="info-label">Device Type:</span><span class="info-value">${answers.storage_type || 'Not specified'}</span></div>
      <div class="info-row"><span class="info-label">Device State:</span><span class="info-value">${answers.device_state || 'Not specified'}</span></div>
      <div class="info-row"><span class="info-label">Physical Condition:</span><span class="info-value">${answers.physical_condition || 'Not specified'}</span></div>
      <div class="info-row"><span class="info-label">Data Loss Type:</span><span class="info-value">${answers.data_loss_type || 'Not specified'}</span></div>
      ${answers.file_system_state ? `<div class="info-row"><span class="info-label">File System:</span><span class="info-value">${answers.file_system_state}</span></div>` : ''}
      ${answers.data_access_level ? `<div class="info-row"><span class="info-label">Data Access:</span><span class="info-value">${answers.data_access_level}</span></div>` : ''}
    </div>

    <div class="section">
      <h2>📊 Assessment Results</h2>
      <div class="info-row"><span class="info-label">Severity:</span><span class="info-value"><strong>${assessment.severity.toUpperCase()}</strong></span></div>
      <div class="info-row"><span class="info-label">Analysis:</span><span class="info-value">${assessment.message}</span></div>
      ${assessment.estimatedCost ? `<div class="info-row"><span class="info-label">Estimated Cost:</span><span class="info-value">${assessment.estimatedCost}</span></div>` : ''}
      ${assessment.estimatedTime ? `<div class="info-row"><span class="info-label">Estimated Time:</span><span class="info-value">${assessment.estimatedTime}</span></div>` : ''}
    </div>
  `;

  if (answers.previous_recovery && answers.previous_recovery !== 'no') {
    html += `
      <div class="section">
        <h2>🔄 Previous Recovery Attempts</h2>
        ${answers.repair_shop_name ? `
          <div style="margin: 10px 0;">
            <div class="info-row"><span class="info-label">Repair Shop:</span><span class="info-value">${answers.repair_shop_name}</span></div>
            <div class="info-row"><span class="info-label">Diagnosis:</span><span class="info-value">${answers.repair_shop_diagnosis}</span></div>
          </div>
        ` : ''}
        ${answers.recovery_company_name ? `
          <div style="margin: 10px 0;">
            <div class="info-row"><span class="info-label">Recovery Service:</span><span class="info-value">${answers.recovery_company_name}</span></div>
            <div class="info-row"><span class="info-label">Diagnosis:</span><span class="info-value">${answers.recovery_company_diagnosis}</span></div>
          </div>
        ` : ''}
      </div>
    `;
  }

  if (answers.additional_comments) {
    html += `
      <div class="section">
        <h2>💬 Additional Comments</h2>
        <p>${answers.additional_comments}</p>
      </div>
    `;
  }

  if (deviceImages && deviceImages.length > 0) {
    html += `
      <div class="section">
        <h2>📷 Device Images (${deviceImages.length})</h2>
        <div class="images">
          ${deviceImages.map((url, i) => `<img src="${url}" alt="Device Image ${i + 1}" />`).join('')}
        </div>
        <div style="margin-top: 15px; font-size: 13px; color: #6b7280;">
          <strong>Image URLs for CRM:</strong><br/>
          ${deviceImages.map((url, i) => `${i + 1}. <a href="${url}">${url}</a>`).join('<br/>')}
        </div>
      </div>
    `;
  }

  html += `
      <div class="footer">
        <strong>Next Steps:</strong><br/>
        1. Review assessment details<br/>
        2. Contact customer at ${answers.email || data.customerInfo?.email}<br/>
        3. Create/update ticket in RepairDesk<br/>
        4. Schedule device pickup or provide shipping instructions
      </div>
    </div>
    </body>
    </html>
  `;

  return html;
}

async function createRepairDeskTicket(data: AssessmentData): Promise<{ success: boolean; ticketId?: string; error?: string }> {
  const apiKey = Deno.env.get("REPAIRDESK_API_KEY");
  if (!apiKey) {
    console.error("REPAIRDESK_API_KEY not configured");
    return { success: false, error: "RepairDesk not configured" };
  }

  const { answers, assessment } = data;

  const ticketPayload = {
    customer: {
      first_name: answers.firstName || data.customerInfo?.firstName || "Customer",
      last_name: answers.lastName || data.customerInfo?.lastName || "",
      email: answers.email || data.customerInfo?.email,
      phone: answers.phone || data.customerInfo?.phone || ""
    },
    device_info: {
      type: answers.storage_type || "Unknown Device",
      condition: answers.physical_condition || "Unknown"
    },
    issue_description: `${assessment.message}\n\nSeverity: ${assessment.severity.toUpperCase()}\n\nDevice Type: ${answers.storage_type || 'Unknown'}\nDevice State: ${answers.device_state || 'Unknown'}\nData Loss: ${answers.data_loss_type || 'Unknown'}`,
    priority: assessment.severity === 'advanced' ? 'high' : assessment.severity === 'moderate' ? 'medium' : 'normal',
    status: 'open'
  };

  try {
    const response = await fetch("https://api.repairdesk.co/api/web/v1/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(ticketPayload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("RepairDesk API error:", response.status, errorText);
      return { success: false, error: `API returned ${response.status}` };
    }

    const result = await response.json();
    console.log("RepairDesk ticket created:", result);
    return { success: true, ticketId: result.data?.id || result.id || data.ticketId };
  } catch (error) {
    console.error("RepairDesk request failed:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

async function sendEmailNotification(data: AssessmentData, repairDeskTicketId?: string): Promise<{ success: boolean; error?: string }> {
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const recipientEmail = Deno.env.get("ASSESSMENT_EMAIL");

  if (!resendApiKey || !recipientEmail) {
    console.error("Email not configured - missing RESEND_API_KEY or ASSESSMENT_EMAIL");
    return { success: false, error: "Email service not configured" };
  }

  const emailData = {
    ...data,
    ticketId: repairDeskTicketId || data.ticketId
  };

  const emailPayload = {
    from: "assessments@wiztech.zip",
    to: recipientEmail,
    subject: `🔧 New Assessment - ${data.assessment.severity.toUpperCase()} ${repairDeskTicketId ? `(Ticket #${repairDeskTicketId})` : ''}`,
    html: formatAssessmentForEmail(emailData)
  };

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendApiKey}`
      },
      body: JSON.stringify(emailPayload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Resend API error:", response.status, errorText);
      return { success: false, error: `Email API returned ${response.status}` };
    }

    const result = await response.json();
    console.log("Email sent successfully:", result);
    return { success: true };
  } catch (error) {
    console.error("Email send failed:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const data: AssessmentData = await req.json();
    console.log("Processing assessment submission");

    const repairDeskResult = await createRepairDeskTicket(data);
    console.log("RepairDesk result:", repairDeskResult);

    const emailResult = await sendEmailNotification(data, repairDeskResult.ticketId);
    console.log("Email result:", emailResult);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Assessment processed successfully",
        ticketId: repairDeskResult.ticketId,
        repairDeskSuccess: repairDeskResult.success,
        emailSent: emailResult.success,
        warnings: [
          !repairDeskResult.success ? `RepairDesk: ${repairDeskResult.error}` : null,
          !emailResult.success ? `Email: ${emailResult.error}` : null
        ].filter(Boolean)
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );

  } catch (error) {
    console.error("Error processing assessment:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
        details: "Assessment processing failed"
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});
