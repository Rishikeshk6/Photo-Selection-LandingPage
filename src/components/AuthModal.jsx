import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Mail, User as UserIcon, ArrowRight, CheckCircle2, Sparkles, PartyPopper, Crown, Check } from 'lucide-react';
import { useSignIn, useUser } from '@clerk/clerk-react';
import confetti from 'canvas-confetti';

export default function AuthModal({ isOpen, mode, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [step, setStep] = useState('auth'); // 'auth' | 'claim_pro' | 'redirecting'
  const [loadingProvider, setLoadingProvider] = useState(null);
  const [pendingUser, setPendingUser] = useState(null);

  const { isLoaded: isSignInLoaded, signIn } = useSignIn();
  const { user: clerkUser } = useUser();

  if (!isOpen) return null;

  // Trigger party bomb confetti animation
  const triggerConfettiExplosion = () => {
    // Center burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10b981', '#6366f1', '#f59e0b', '#ec4899', '#3b82f6']
    });

    // Side cannons after brief delay
    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#10b981', '#f59e0b', '#ffffff']
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#6366f1', '#ec4899', '#ffffff']
      });
    }, 200);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const mockId = "usr_" + Math.random().toString(36).substring(2, 10);
    const userName = name || (email ? email.split('@')[0] : 'Studio User');
    setPendingUser({
      id: mockId,
      name: userName,
      email: email
    });
    setStep('claim_pro');
  };

  const handleSocialAuth = async (provider) => {
    const strategy = provider === 'Google' ? 'oauth_google' : 'oauth_facebook';
    setLoadingProvider(provider);

    try {
      if (isSignInLoaded && signIn) {
        await signIn.authenticateWithRedirect({
          strategy,
          redirectUrl: window.location.origin,
          redirectUrlComplete: window.location.origin,
        });
      } else {
        // Fallback for local demo simulation
        setTimeout(() => {
          setPendingUser({
            id: `usr_${provider.toLowerCase()}_${Date.now()}`,
            name: `${provider} Studio User`,
            email: `user@${provider.toLowerCase()}.com`
          });
          setLoadingProvider(null);
          setStep('claim_pro');
        }, 1000);
      }
    } catch (err) {
      console.warn("Clerk OAuth redirect fallback:", err);
      setPendingUser({
        id: `usr_${provider.toLowerCase()}_${Date.now()}`,
        name: `${provider} Studio User`,
        email: `user@${provider.toLowerCase()}.com`
      });
      setLoadingProvider(null);
      setStep('claim_pro');
    }
  };

  const handleAcceptProPlan = () => {
    // 💥 Fire party bomb explosion confetti!
    triggerConfettiExplosion();
    setStep('redirecting');

    const u = pendingUser || {
      id: clerkUser?.id || "usr_demo123",
      name: clerkUser?.fullName || clerkUser?.firstName || "Studio Owner",
      email: clerkUser?.primaryEmailAddress?.emailAddress || "studio@subhbandhan.com"
    };

    setTimeout(() => {
      // Redirect payload to Python Desktop HTTP callback server on port 54321
      const callbackUrl = `http://localhost:54321/callback?user_id=${encodeURIComponent(u.id)}&name=${encodeURIComponent(u.name)}&email=${encodeURIComponent(u.email)}&plan=pro`;
      window.location.href = callbackUrl;
    }, 1800);
  };

  const handleDeclineFreePlan = () => {
    setStep('redirecting');
    const u = pendingUser || {
      id: clerkUser?.id || "usr_demo123",
      name: clerkUser?.fullName || "Studio Owner",
      email: clerkUser?.primaryEmailAddress?.emailAddress || "studio@subhbandhan.com"
    };

    setTimeout(() => {
      const callbackUrl = `http://localhost:54321/callback?user_id=${encodeURIComponent(u.id)}&name=${encodeURIComponent(u.name)}&email=${encodeURIComponent(u.email)}&plan=free`;
      window.location.href = callbackUrl;
    }, 1000);
  };

  const getTitle = () => {
    if (mode === 'signup') return 'Create Your Account';
    if (mode === 'pro') return 'Claim 1-Year Free Pro Plan';
    if (mode === 'free') return 'Activate Free Plan';
    return 'Sign In to Studio';
  };

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 10 }}
          transition={{ duration: 0.25 }}
          className="modal-card"
          style={{ maxWidth: step === 'claim_pro' ? '480px' : '440px' }}
          onClick={(e) => e.stopPropagation()}
        >
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>

          {/* STEP 1: AUTHENTICATION */}
          {step === 'auth' && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{ width: 44, height: 44, background: '#09090b', color: '#fff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', fontWeight: 900, fontSize: '1.2rem' }}>
                  P
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {getTitle()}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Access your studio proofing projects & sync desktop software
                </p>
              </div>

              {/* Social Login Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                <button
                  type="button"
                  onClick={() => handleSocialAuth('Google')}
                  disabled={loadingProvider !== null}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center',
                    gap: '12px',
                    width: '100%',
                    padding: '11px 16px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-light)',
                    background: '#ffffff',
                    color: 'var(--text-main)',
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>{loadingProvider === 'Google' ? 'Connecting to Google...' : 'Continue with Google'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSocialAuth('Facebook')}
                  disabled={loadingProvider !== null}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center',
                    gap: '12px',
                    width: '100%',
                    padding: '11px 16px',
                    borderRadius: '10px',
                    border: '1px solid #1877F2',
                    background: '#1877F2',
                    color: '#ffffff',
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 6px rgba(24, 119, 242, 0.2)'
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>{loadingProvider === 'Facebook' ? 'Connecting to Facebook...' : 'Continue with Facebook'}</span>
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0', gap: '12px' }}>
                <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }}></div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  OR WITH EMAIL
                </span>
                <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }}></div>
              </div>

              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {(mode === 'signup' || mode === 'pro') && (
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px', display: 'block' }}>
                      Full Name / Studio Name
                    </label>
                    <div style={{ position: 'relative' }}>
                      <UserIcon size={16} style={{ position: 'absolute', left: 12, top: 13, color: '#71717a' }} />
                      <input
                        type="text"
                        required
                        placeholder="Royal Studio"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ width: '100%', padding: '10px 12px 10px 38px', borderRadius: '8px', border: '1px solid var(--border-light)', fontSize: '0.9rem', outline: 'none' }}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px', display: 'block' }}>
                    Email Address
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={16} style={{ position: 'absolute', left: 12, top: 13, color: '#71717a' }} />
                    <input
                      type="email"
                      required
                      placeholder="studio@subhbandhan.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ width: '100%', padding: '10px 12px 10px 38px', borderRadius: '8px', border: '1px solid var(--border-light)', fontSize: '0.9rem', outline: 'none' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px', display: 'block' }}>
                    Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Lock size={16} style={{ position: 'absolute', left: 12, top: 13, color: '#71717a' }} />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{ width: '100%', padding: '10px 12px 10px 38px', borderRadius: '8px', border: '1px solid var(--border-light)', fontSize: '0.9rem', outline: 'none' }}
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '6px' }}>
                  <span>{mode === 'pro' ? 'Claim Pro Plan Now' : mode === 'signup' ? 'Create Account' : 'Sign In'}</span>
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>
          )}

          {/* STEP 2: 1-YEAR PRO PLAN ACCEPTANCE CARD */}
          {step === 'claim_pro' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(16, 185, 129, 0.12)', color: '#059669', fontSize: '0.75rem', fontWeight: 900, padding: '4px 14px', borderRadius: '20px', textTransform: 'uppercase', marginBottom: '16px' }}>
                <PartyPopper size={14} /> EARLY BIRD SPECIAL OFFER
              </div>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '6px' }}>
                🎉 Welcome, {pendingUser?.name || 'Studio Owner'}!
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                You are eligible to claim <strong style={{ color: 'var(--text-main)' }}>1-Year FREE Pro Access</strong> today!
              </p>

              {/* Plan Box */}
              <div style={{ background: 'var(--bg-surface)', border: '2px solid #09090b', borderRadius: '16px', padding: '20px', textAlign: 'left', marginBottom: '20px', boxShadow: 'var(--shadow-soft)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#09090b' }}>Pro Plan Subscription</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>365 Days Full Unlimited Access</span>
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#09090b' }}>
                    ₹0 <span style={{ fontSize: '0.75rem', textDecoration: 'line-through', color: '#a1a1aa' }}>₹1,200</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#09090b', fontWeight: 700 }}>
                    <Check size={16} style={{ color: '#10b981' }} /> Unlimited Projects & Unlimited Photos
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#09090b', fontWeight: 700 }}>
                    <Check size={16} style={{ color: '#10b981' }} /> AI Face Detection & Group Shot Filters
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#09090b', fontWeight: 700 }}>
                    <Check size={16} style={{ color: '#10b981' }} /> Standalone HTML Client Selection Generator
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#09090b', fontWeight: 700 }}>
                    <Check size={16} style={{ color: '#10b981' }} /> Cloud Sync with Neon PostgreSQL Database
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  type="button"
                  onClick={handleAcceptProPlan}
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%', fontSize: '1rem', padding: '14px 20px', background: '#09090b' }}
                >
                  <Sparkles size={18} style={{ color: '#f59e0b' }} />
                  <span>Accept 1-Year Free Pro Plan</span>
                </button>

                <button
                  type="button"
                  onClick={handleDeclineFreePlan}
                  className="btn btn-secondary"
                  style={{ width: '100%', fontSize: '0.85rem', color: 'var(--text-muted)' }}
                >
                  Skip & Continue with Basic Free Plan (5 Projects Limit)
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: REDIRECTING TO DESKTOP APP */}
          {step === 'redirecting' && (
            <div style={{ textAlign: 'center', padding: '30px 0' }}>
              <CheckCircle2 size={56} style={{ color: '#10b981', margin: '0 auto 16px' }} />
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>
                💥 Pro Plan Activated!
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                Connecting to Photo Selection Studio desktop software...<br />
                Syncing database profile with Neon Cloud.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
