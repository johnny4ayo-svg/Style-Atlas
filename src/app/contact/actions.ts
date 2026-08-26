"use server";

export type FormState = { error?: string; success?: boolean; message?: string } | null;

export async function submitContactForm(prevState: FormState, formData: FormData) {
  // Extract fields
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const category = formData.get("category") as string;
  const message = formData.get("message") as string;
  const consent = formData.get("consent");

  // Basic validation
  if (!name || !email || !category || !message || !consent) {
    return { error: "All fields are required, including consent." };
  }
  
  if (!email.includes("@")) {
    return { error: "Please enter a valid email address." };
  }

  if (message.length < 10) {
    return { error: "Message must be at least 10 characters long." };
  }

  // Rate limiting / Spam protection (mocked for now)
  // In a real scenario, this would use a rate limiting service and ReCaptcha/Turnstile
  
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Success
  return { success: true, message: "Thank you for reaching out. We will get back to you shortly." };
}
