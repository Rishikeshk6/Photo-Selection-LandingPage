import React, { useState, useEffect } from 'react';
import { Menu, X, User, LogOut, Sparkles } from 'lucide-react';

export default function Navbar({ onOpenAuth }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="nav-wrapper">
          <a href="#" className="logo-brand">
            <div className="logo-icon-box">P</div>
            <span>SubhBandhanAi</span>
          </a>

          <ul className="nav-menu">
            <li><a href="#features" className="nav-link">Features</a></li>
            <li><a href="#how-it-works" className="nav-link">How It Works</a></li>
            <li><a href="#pricing" className="nav-link">Pricing</a></li>
            <li><a href="#download" className="nav-link">Download</a></li>
          </ul>

          <div className="nav-actions">
            {user ? (
              <>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => onOpenAuth('account')}
                >
                  <User size={16} />
                  <span>{user.name || 'Account'}</span>
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setUser(null)}
                >
                  <LogOut size={16} />
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => onOpenAuth('signin')}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => onOpenAuth('signup')}
                >
                  Sign Up
                </button>
              </>
            )}

            {/* Mobile Toggle */}
            <button
              type="button"
              className="btn btn-secondary"
              style={{ display: 'none', padding: '8px 12px' }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer open">
          <a href="#features" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Features</a>
          <a href="#how-it-works" className="nav-link" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
          <a href="#pricing" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
          <a href="#download" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Download</a>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
            <button type="button" className="btn btn-outline" onClick={() => { setMobileMenuOpen(false); onOpenAuth('signin'); }}>Sign In</button>
            <button type="button" className="btn btn-primary" onClick={() => { setMobileMenuOpen(false); onOpenAuth('signup'); }}>Sign Up</button>
          </div>
        </div>
      )}
    </header>
  );
}
