import React from 'react';
import { motion } from 'framer-motion';
import { FolderPlus, Share2, FileCheck2 } from 'lucide-react';

const STEPS = [
  {
    step: '1',
    icon: FolderPlus,
    title: 'Create Project & Import',
    desc: 'Create your project and import event folders with thousands of images in seconds.',
  },
  {
    step: '2',
    icon: Share2,
    title: 'Client Selection & Proofing',
    desc: 'Select photos locally or export a single-file selection website for your clients to view on mobile or PC.',
  },
  {
    step: '3',
    icon: FileCheck2,
    title: 'Import & Organize',
    desc: 'Import the client\'s selection file (selection.json) back into the software to move or copy selected RAW files.',
  },
];

export default function HowItWorks() {
  return (
    <section className="features-section" id="how-it-works" style={{ background: 'var(--bg-surface)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">SIMPLE WORKFLOW</span>
          <h2 className="section-title">How Photo Selection Studio Works</h2>
          <p>3 easy steps to streamline your photography client delivery workflow.</p>
        </div>

        <div className="grid-3">
          {STEPS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="feature-card"
                style={{ textAlign: 'center' }}
              >
                <div
                  className="feature-icon-box"
                  style={{
                    margin: '0 auto 24px',
                    width: '60px',
                    height: '60px',
                    fontSize: '1.25rem',
                    fontWeight: 900,
                    background: '#09090b',
                    color: '#ffffff',
                  }}
                >
                  {item.step}
                </div>
                <h3 className="feature-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Icon size={20} /> {item.title}
                </h3>
                <p className="feature-desc" style={{ marginTop: '8px' }}>{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
