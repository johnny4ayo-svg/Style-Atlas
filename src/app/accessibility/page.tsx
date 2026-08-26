import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessibility Statement | STYLEATLAS",
  description: "Our commitment to making STYLEATLAS accessible to everyone.",
};

export default function AccessibilityPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <div>
            <div className="breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>Accessibility</span>
            </div>
            <h1 className="page-title">Accessibility Statement</h1>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="prose">
            <p>
              STYLEATLAS is committed to making its website accessible to all users, regardless of ability or technology. We are actively working towards WCAG 2.2 Level AA compliance to ensure an inclusive experience for discovering Nigerian fashion.
            </p>

            <h2>Our Current Capabilities</h2>
            <ul>
              <li><strong>Keyboard Navigation:</strong> Most interactive elements can be accessed and operated using a keyboard.</li>
              <li><strong>Screen Readers:</strong> We provide meaningful alt text for functional images and use semantic HTML to assist screen reader users.</li>
              <li><strong>Text Resizing:</strong> The website text can be resized up to 200% without loss of content or functionality.</li>
              <li><strong>Contrast:</strong> Our core design system uses high-contrast text and background color combinations.</li>
            </ul>

            <h2>Known Limitations</h2>
            <p>
              While we strive for comprehensive accessibility, you may encounter limitations in some areas:
            </p>
            <ul>
              <li>Some uploaded portfolio images may lack detailed alternative text descriptions from the business owners.</li>
              <li>Certain advanced filtering components may have partial keyboard support on older browsers.</li>
            </ul>

            <h2>Reporting Accessibility Issues</h2>
            <p>
              If you experience any difficulty accessing our website or need assistance, please let us know. We welcome your feedback and are dedicated to improving the platform.
            </p>
            <p>
              <Link href="/contact">Contact us to report an issue</Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
