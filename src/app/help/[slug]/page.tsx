import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

const articles: Record<string, { title: string; content: string }> = {
  "finding-the-right-designer": {
    title: "Finding the right designer",
    content: "Search our verified directory by city and specialty to find the perfect professional for your needs. Use the 'Request a professional' feature if you cannot find an exact match.",
  },
  "pricing-and-quotes": {
    title: "Understanding pricing and quotes",
    content: "Prices vary by designer and project complexity. Discuss your budget and requirements directly with the professional. STYLEATLAS does not currently process payments or provide quotes directly.",
  },
  "leaving-a-review": {
    title: "Leaving a review",
    content: "The review feature is currently unavailable. Once launched, you will be able to review professionals you have successfully worked with. All reviews will be moderated according to our community guidelines.",
  },
  "listing-your-business": {
    title: "Listing your business",
    content: "Apply to list your fashion business by clicking 'Add Business' and completing our onboarding process. Your application will be subject to our verification and editorial review.",
  },
  "verification-process": {
    title: "The verification process",
    content: "We verify identity, portfolios, and business information to ensure a high-quality directory. Verification involves submitting proof of work and identity, which our editorial team reviews before publishing your profile.",
  },
  "updating-your-portfolio": {
    title: "Updating your portfolio",
    content: "Once logged into your verified business dashboard, you can upload new images and update your bio. All changes are subject to quick review to ensure they meet our quality standards.",
  },
  "managing-your-subscription": {
    title: "Managing your subscription",
    content: "Paid subscriptions are currently disabled as we are in a pre-launch phase. Join the waitlist on our Pricing page to be notified when premium features become available.",
  },
  "reset-password": { // Using reset-password instead of resetting-your-password to be safe, but guide says resetting-your-password
    title: "Resetting your password",
    content: "If you have forgotten your password, use the 'Forgot Password' link on the login page to receive a reset email. Follow the instructions in the email to regain access.",
  },
  "deleting-your-account": {
    title: "Deleting your account",
    content: "You can request account deletion by contacting support. Deleting your account will permanently remove your data and business listings from our platform.",
  },
  "reporting-inaccurate-information": {
    title: "Reporting inaccurate information",
    content: "If you find inaccurate information on a profile or listing, please contact support with a link to the page and details of the inaccuracy. Our editorial team will investigate promptly.",
  },
  "community-guidelines": {
    title: "Our community guidelines",
    content: "We expect all members of the STYLEATLAS community to interact professionally and respectfully. Harassment, fake reviews, or misrepresentation will result in account suspension.",
  },
};

// Aliases
articles["resetting-your-password"] = articles["reset-password"];

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = articles[params.slug];
  if (!article) return { title: "Article Not Found | STYLEATLAS" };
  return {
    title: `${article.title} | STYLEATLAS Help`,
    description: article.content.substring(0, 150) + "...",
  };
}

export default function HelpArticlePage({ params }: { params: { slug: string } }) {
  const article = articles[params.slug];

  if (!article) {
    notFound();
  }

  return (
    <main>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <div>
            <div className="breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/help">Help centre</Link>
              <span>/</span>
              <span>Article</span>
            </div>
            <h1 className="page-title">{article.title}</h1>
          </div>
        </div>
      </section>

      <section className="section compact">
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="prose" style={{ marginBottom: '40px' }}>
            <p>{article.content}</p>
          </div>

          <div style={{ padding: '32px', background: 'var(--cream)', borderRadius: '8px', textAlign: 'center', marginTop: '40px' }}>
            <h3 style={{ marginBottom: '16px' }}>Still need help?</h3>
            <p style={{ marginBottom: '24px' }}>Our support team is available to assist you with any questions or issues.</p>
            <Link href="/contact" className="btn btn-dark">Contact Support</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
