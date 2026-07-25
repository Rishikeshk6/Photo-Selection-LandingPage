import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, Package, FolderOutput, Cloud, ShieldCheck } from 'lucide-react';

const FEATURES = [
  {
    icon: Zap,
    title: 'Ultra-Fast Engine',
    desc: 'Load and preview 5,000+ RAW or JPEG photos instantly with smooth GPU hardware acceleration.',
  },
  {
    icon: Target,
    title: 'AI Face Detection',
    desc: 'Automatically detect faces, count people in group shots, and filter photos by faces instantly.',
  },
  {
    icon: Package,
    title: 'Standalone Website Generator',
    desc: 'Export a beautiful self-contained HTML selection website to send directly to your clients.',
  },
  {
    icon: FolderOutput,
    title: 'One-Click File Copy & Move',
    desc: 'Copy or move approved photos into separate folders automatically once your client finishes selection.',
  },
  {
    icon: Cloud,
    title: 'Neon Database Sync',
    desc: 'Your subscription and account details stay synchronized securely in the cloud with Neon PostgreSQL.',
  },
  {
    icon: ShieldCheck,
    title: 'Full Security Protection',
    desc: 'Encrypted authentication prevents unauthorized usage and guarantees your software security.',
  },
];

export default function Features() {
  return (
    <section className="features-section" id="features">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">ENGINEERED FOR SPEED</span>
          <h2 className="section-title">Built for High-Volume Photographers</h2>
          <p>Engineered to handle thousands of high-resolution images instantly without lagging.</p>
        </div>

        <div className="grid-3">
          {FEATURES.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="feature-card"
              >
                <div className="feature-icon-box">
                  <Icon size={26} />
                </div>
                <h3 className="feature-title">{feat.title}</h3>
                <p className="feature-desc">{feat.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
