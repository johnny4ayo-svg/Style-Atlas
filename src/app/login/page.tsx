'use client'

import Link from "next/link";
import Image from "next/image";
import { login, signup } from "@/app/auth/actions";
import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState(true);

  async function handleSubmit(formData: FormData) {
    setError(null);
    try {
      const result = isLogin 
        ? await login(formData)
        : await signup(formData);
        
      if (result?.error) {
        setError(typeof result.error === 'string' ? result.error : JSON.stringify(result.error));
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      // Ignore NEXT_REDIRECT error as it is intentional
      if (e?.message !== 'NEXT_REDIRECT') {
        setError(e?.message || 'An unexpected error occurred');
      }
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-visual">
        <Image 
          src="/images/bridal-black.jpg" 
          alt="Elegant Nigerian fashion" 
          width={1200} 
          height={1200}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div className="auth-copy">
          <Link href="/">
            <Image src="/brand/styleatlas-logo-dark.svg" alt="STYLEATLAS" width={210} height={35} style={{ filter: 'invert(1)' }} />
          </Link>
          <h2>Come back to the people, pieces and possibilities you saved.</h2>
          <p>One account keeps customer shortlists, business enquiries, bookings, orders and editorial preferences connected.</p>
        </div>
      </section>

      <section className="auth-panel">
        <form className="auth-box" action={handleSubmit}>
          <span className="eyebrow">{isLogin ? 'Welcome back' : 'Join us'}</span>
          <h1>{isLogin ? 'Log in to STYLEATLAS' : 'Create an account'}</h1>
          <p>{isLogin ? 'Use your customer, professional, school, employer or platform account.' : 'Join the premium fashion directory.'}</p>
          
          {error && (
            <div style={{ padding: '12px', background: '#ffebee', color: '#c62828', borderRadius: '8px', marginBottom: '16px', fontSize: '12px' }}>
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input 
              id="email" 
              name="email" 
              className="form-control" 
              type="email" 
              required 
              defaultValue="amina@styleatlas.demo"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              id="password" 
              name="password" 
              className="form-control" 
              type="password" 
              required 
              defaultValue="StyleAtlas123!"
            />
          </div>

          {isLogin && (
            <div className="form-help">
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input type="checkbox" defaultChecked /> Keep me signed in
              </label>
              <Link href="#" style={{ color: 'var(--gold-2)' }}>Forgot password?</Link>
            </div>
          )}

          <button type="submit" className="btn btn-gold" style={{ width: '100%', marginTop: isLogin ? '0' : '20px' }}>
            {isLogin ? 'Log in' : 'Create account'}
          </button>

          <div className="auth-divider">or continue with</div>
          
          <div className="social-login">
            <button type="button">Google</button>
            <button type="button">Apple</button>
          </div>

          <p style={{ textAlign: 'center', marginTop: '22px', fontSize: '11px', color: 'var(--muted)' }}>
            {isLogin ? 'New to STYLEATLAS?' : 'Already have an account?'}
            {' '}
            <button 
              type="button"
              className="text-link" 
              style={{ background: 'none', border: 'none', padding: 0, display: 'inline', cursor: 'pointer' }}
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Create an account' : 'Log in here'}
            </button>
          </p>
        </form>
      </section>
    </main>
  );
}
