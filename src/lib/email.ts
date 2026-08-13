import { Resend } from 'resend';

// Only initialize if we have the key to prevent crashing on local dev without keys
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
// Use a verified domain or Resend's testing email
const FROM_EMAIL = 'StyleAtlas <onboarding@resend.dev>'; 

export async function sendOrderReceipt(
  customerEmail: string, 
  orderDetails: { orderId: string, amount: number, address: string, date: string }
) {
  if (!resend) {
    console.log("No RESEND_API_KEY found. Mocking order receipt email to:", customerEmail);
    console.log(orderDetails);
    return { success: true, mocked: true };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: customerEmail,
      subject: `Order Confirmation - #${orderDetails.orderId.substring(0, 8)}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #c69a52;">Order Confirmed!</h2>
          <p>Thank you for your purchase on StyleAtlas.</p>
          <div style="background: #f9f6f3; padding: 24px; border-radius: 8px; margin: 24px 0;">
            <h3>Order Details</h3>
            <p><strong>Order ID:</strong> ${orderDetails.orderId}</p>
            <p><strong>Date:</strong> ${orderDetails.date}</p>
            <p><strong>Total Amount:</strong> ₦${(orderDetails.amount / 100).toLocaleString()}</p>
            <p><strong>Shipping to:</strong> ${orderDetails.address}</p>
          </div>
          <p>You can track your order status in your <a href="https://styleatlas.vercel.app/dashboard">dashboard</a>.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
}

export async function sendQuoteNotification(
  businessEmail: string,
  quoteDetails: { businessName: string, customerName: string, occasion: string, budget: string }
) {
  if (!resend) {
    console.log("No RESEND_API_KEY found. Mocking quote notification to:", businessEmail);
    console.log(quoteDetails);
    return { success: true, mocked: true };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: businessEmail,
      subject: `New Quote Request from ${quoteDetails.customerName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #c69a52;">New Quote Request</h2>
          <p>Hi ${quoteDetails.businessName},</p>
          <p>You have received a new custom project request from <strong>${quoteDetails.customerName}</strong>.</p>
          <div style="background: #f9f6f3; padding: 24px; border-radius: 8px; margin: 24px 0;">
            <p><strong>Occasion:</strong> ${quoteDetails.occasion}</p>
            <p><strong>Budget Range:</strong> ${quoteDetails.budget}</p>
          </div>
          <p>Please log in to your <a href="https://styleatlas.vercel.app/dashboard/business">business dashboard</a> to view the full details and respond.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
}
