"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const mobile = formData.get("mobile") as string;
  const details = formData.get("details") as string;

  try {
    const { data, error } = await resend.emails.send({
      from: `${firstName} ${lastName} <onboarding@resend.dev>`, 
      to: ["omdealer7@gmail.com"],
      subject: `New Quote Request: ${firstName} ${lastName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f6; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 20px rgba(0,0,0,0.08); }
            .header { background-color: #074d6b; padding: 30px 20px; text-align: center; }
            .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 0.5px; }
            .header p { color: #846437; font-size: 13px; margin-top: 8px; margin-bottom: 0; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; }
            .content { padding: 40px; }
            .field { margin-bottom: 24px; }
            .label { font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 6px; }
            .value { font-size: 16px; color: #1e293b; margin: 0; font-weight: 500; }
            .value a { color: #074d6b; text-decoration: none; font-weight: 600; }
            .details-box { background-color: #f8fafc; border-left: 4px solid #846437; padding: 20px; border-radius: 0 8px 8px 0; margin-top: 10px; }
            .details-box p { margin: 0; font-size: 15px; color: #334155; line-height: 1.6; }
            .footer { text-align: center; padding: 20px; font-size: 13px; color: #94a3b8; background-color: #f1f5f9; border-top: 1px solid #e2e8f0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Quote Request</h1>
              <p>Om Dealer Centering Materials</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Client Name</div>
                <div class="value">${firstName} ${lastName}</div>
              </div>
              <div class="field">
                <div class="label">Email Address</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              <div class="field">
                <div class="label">Mobile Number</div>
                <div class="value"><a href="tel:${mobile}">${mobile}</a></div>
              </div>
              <div class="field">
                <div class="label">Project Details</div>
                <div class="details-box">
                  <p>${details.replace(/\n/g, '<br>')}</p>
                </div>
              </div>
            </div>
            <div class="footer">
              This is an automated message from your website's contact form.
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error: any) {
    console.error("Server Action Exception:", error);
    return { success: false, error: error.message || "Failed to send email" };
  }
}
