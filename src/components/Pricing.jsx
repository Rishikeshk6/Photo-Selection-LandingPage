import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Sparkles } from 'lucide-react';

export default function Pricing({ onOpenAuth }) {
  return (
    <section className="pricing-section" id="pricing">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">SIMPLE PRICING</span>
          <h2 className="section-title">Choose Your Subscription Plan</h2>
          <p>Claim 1-Year Free Pro Access today under our limited Early Bird Promotion.</p>
        </div>

        <div className="pricing-grid">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="pricing-card"
          >
            <h3 className="plan-name">Free Plan</h3>
            <div className="plan-price">
              ₹0 <span>/ forever</span>
            </div>
            <p className="plan-desc">Basic tools for small studio projects.</p>

            <ul className="feature-list">
              <li>
                <div className="check-icon"><Check size={12} /></div>
                <span>Maximum 5 Projects</span>
              </li>
              <li>
                <div className="check-icon"><Check size={12} /></div>
                <span>Maximum 500 Photos</span>
              </li>
              <li className="disabled">
                <span style={{ margin: '0 4px', color: '#a1a1aa' }}>✕</span>
                <span>Client Website Exporter</span>
              </li>
              <li className="disabled">
                <span style={{ margin: '0 4px', color: '#a1a1aa' }}>✕</span>
                <span>Unlimited Projects & Storage</span>
              </li>
            </ul>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => onOpenAuth('free')}
            >
              Use Free Plan
            </button>
          </motion.div>

          {/* Pro Plan (Featured) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="pricing-card featured"
          >
            <div className="pricing-badge">
              <Sparkles size={12} style={{ display: 'inline', marginRight: '4px' }} />
              SPECIAL OFFER
            </div>
            <h3 className="plan-name">Pro Plan</h3>
            <div className="plan-price">
              ₹0 <span>/ 1st Year (Free)</span>
            </div>
            <p className="plan-desc">₹100 / Year after 1st Year. Unlimited capabilities for professionals.</p>

            <ul className="feature-list">
              <li>
                <div className="check-icon"><Check size={12} /></div>
                <strong>Unlimited Projects</strong>
              </li>
              <li>
                <div className="check-icon"><Check size={12} /></div>
                <strong>Unlimited Photos</strong>
              </li>
              <li>
                <div className="check-icon"><Check size={12} /></div>
                <span>Client Selection Website Exporter</span>
              </li>
              <li>
                <div className="check-icon"><Check size={12} /></div>
                <span>AI Face Detection & Bounding Box</span>
              </li>
              <li>
                <div className="check-icon"><Check size={12} /></div>
                <span>Cloud Account & Subscription Sync</span>
              </li>
            </ul>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onOpenAuth('pro')}
            >
              Claim 1-Year Free Pro Plan
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
