import React from 'react';
import { motion } from 'framer-motion';
import { Download, Monitor, ShieldCheck } from 'lucide-react';

export default function DownloadBanner() {
  return (
    <section className="download-section" id="download">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="download-banner"
        >
          <h2 className="download-title">Ready to Speed Up Your Photo Selection?</h2>
          <p className="download-subtitle">
            Download Photo Selection Studio for Windows and start organizing your photography projects in seconds.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
            <a
              href="https://subhbandhanai.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
              style={{ background: '#ffffff', color: '#09090b', borderColor: '#ffffff' }}
            >
              <Download size={20} />
              <span>Download for Windows (Installer .exe)</span>
            </a>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap', fontSize: '0.85rem', color: '#a1a1aa' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Monitor size={16} /> Compatible with Windows 10 & 11 (64-bit)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} /> 100% Virus & Malware Free Verified
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
