import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import DownloadBanner from './components/DownloadBanner';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

export default function App() {
  const [authModal, setAuthModal] = useState({ open: false, mode: 'signin' });

  const handleOpenAuth = (mode = 'signin') => {
    setAuthModal({ open: true, mode });
  };

  const handleCloseAuth = () => {
    setAuthModal(prev => ({ ...prev, open: false }));
  };

  return (
    <div className="landing-page-app">
      <Navbar onOpenAuth={handleOpenAuth} />
      <main>
        <Hero onOpenAuth={handleOpenAuth} />
        <Features />
        <HowItWorks />
        <Pricing onOpenAuth={handleOpenAuth} />
        <DownloadBanner />
      </main>
      <Footer />

      <AuthModal
        isOpen={authModal.open}
        mode={authModal.mode}
        onClose={handleCloseAuth}
      />
    </div>
  );
}
