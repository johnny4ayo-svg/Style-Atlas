import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <Image src="/brand/styleatlas-logo-dark.svg" alt="STYLEATLAS" width={180} height={30} />
          <p>Nigeria's premium fashion discovery platform for trusted designers, brands, schools and creative professionals.</p>
          <div className="socials">
            <Link className="social" href="/feature" aria-label="Instagram">IG</Link>
            <Link className="social" href="/feature" aria-label="TikTok">TT</Link>
            <Link className="social" href="/feature" aria-label="YouTube">YT</Link>
            <Link className="social" href="/feature" aria-label="LinkedIn">IN</Link>
          </div>
        </div>
        <div className="footer-col">
          <h4>Directory</h4>
          <Link href="/directory">Designers</Link>
          <Link href="/directory">Brands</Link>
          <Link href="/directory">Stylists</Link>
          <Link href="/directory">Schools</Link>
          <Link href="/directory">Photographers</Link>
          <Link href="/directory">Fabric stores</Link>
        </div>
        <div className="footer-col">
          <h4>Explore</h4>
          <Link href="/marketplace">Marketplace</Link>
          <Link href="/jobs">Fashion jobs</Link>
          <Link href="/events">Events</Link>
          <Link href="/article">Editorial</Link>
          <Link href="/directory">Cities</Link>
          <Link href="/concierge">AI concierge</Link>
        </div>
        <div className="footer-col">
          <h4>For business</h4>
          <Link href="/add-business">Add a listing</Link>
          <Link href="/pricing">Membership plans</Link>
          <Link href="/dashboard">Business dashboard</Link>
          <Link href="/advertise">Advertise</Link>
          <Link href="/verification">Get verified</Link>
          <Link href="/jobs">Post a job</Link>
        </div>
        <div className="footer-col">
          <h4>Stay in style</h4>
          <p style={{ fontSize: '10px' }}>Weekly designer stories, openings, jobs and fashion events.</p>
          <form className="newsletter">
            <input type="email" required placeholder="Email address" aria-label="Email address" />
            <button type="submit">Subscribe</button>
          </form>
          <Link href="/about">About STYLEATLAS</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/help">Help centre</Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 STYLEATLAS. Demo UI kit with fictional profiles.</span>
        <div className="footer-bottom-links">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/accessibility">Accessibility</Link>
          <Link href="/editorial-policy">Editorial policy</Link>
        </div>
      </div>
    </footer>
  );
}
