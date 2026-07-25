import React from 'react';
import { motion } from 'framer-motion';
import { Download, LogIn, Gift, ArrowRight } from 'lucide-react';
import MockupPreview from './MockupPreview';

export default function Hero({ onOpenAuth }) {
  return (
    <section className="hero-section">
      <div className="container">
        {/* Animated Early Bird Offer Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="badge-offer"
        >
          <div className="badge-pulse"></div>
          <span>🎁 Early Bird Access: 1-Year Pro Plan FREE</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hero-title"
        >
          <span className="gradient-text">Next-Generation Photo Selection</span>
          <br />
          For Professional Photographers
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hero-desc"
        >
          Blazing fast RAW & JPEG photo rendering, AI face detection, and single-click client selection website generator. Everything you need to complete client proofing in minutes.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hero-ctas"
        >
          <a href="#download" className="btn btn-primary btn-lg">
            <Download size={20} />
            <span>Download Software (.exe)</span>
          </a>
          <button
            type="button"
            className="btn btn-secondary btn-lg"
            onClick={() => onOpenAuth('signin')}
          >
            <LogIn size={20} />
            <span>Sign In to Account</span>
          </button>
        </motion.div>

        {/* Interactive Software Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <MockupPreview />
        </motion.div>
      </div>
    </section>
  );
}
