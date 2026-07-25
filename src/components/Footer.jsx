import React from 'react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '12px' }}>
              SubhBandhanAi
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', maxWidth: '290px', marginBottom: '20px' }}>
              Premium event album designing platform. Creating timeless memories with artistry and love.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <a href="https://subhbandhanai.in/" target="_blank" rel="noopener noreferrer" className="footer-social-btn">IG</a>
              <a href="https://subhbandhanai.in/" target="_blank" rel="noopener noreferrer" className="footer-social-btn">FB</a>
              <a href="https://subhbandhanai.in/" target="_blank" rel="noopener noreferrer" className="footer-social-btn">IN</a>
              <a href="https://subhbandhanai.in/" target="_blank" rel="noopener noreferrer" className="footer-social-btn">YT</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-title">QUICK LINKS</h4>
            <ul className="footer-links" style={{ listStyleType: 'disc', paddingLeft: '18px' }}>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#how-it-works">About</a></li>
              <li><a href="https://subhbandhanai.in/" target="_blank" rel="noopener noreferrer">Become Designer</a></li>
              <li><a href="https://subhbandhanai.in/" target="_blank" rel="noopener noreferrer">Studio Partners</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="footer-title">SERVICES</h4>
            <ul className="footer-links" style={{ listStyleType: 'disc', paddingLeft: '18px' }}>
              <li><a href="https://subhbandhanai.in/" target="_blank" rel="noopener noreferrer">Wedding Albums</a></li>
              <li><a href="https://subhbandhanai.in/" target="_blank" rel="noopener noreferrer">Event Albums</a></li>
              <li><a href="https://subhbandhanai.in/" target="_blank" rel="noopener noreferrer">Premium Albums</a></li>
              <li><a href="https://subhbandhanai.in/" target="_blank" rel="noopener noreferrer">Luxury Albums</a></li>
              <li><a href="https://flipbook.subhbandhanai.in/" target="_blank" rel="noopener noreferrer">Digital Flipbooks</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="footer-title">SUPPORT</h4>
            <ul className="footer-links" style={{ listStyleType: 'disc', paddingLeft: '18px' }}>
              <li><a href="mailto:subhbandhanai@gmail.com">subhbandhanai@gmail.com</a></li>
              <li style={{ marginTop: '10px' }}><a href="tel:+919296346847">+91 92963 46847</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} SubhBandhanAi. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#" style={{ color: 'var(--text-muted)' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'var(--text-muted)' }}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
