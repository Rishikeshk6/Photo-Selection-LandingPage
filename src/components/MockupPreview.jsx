import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Image as ImageIcon, Folder, Crown, Sparkles, Filter } from 'lucide-react';

const INITIAL_PHOTOS = [
  { id: 'IMG_001', name: 'Ceremony - Entry', selected: true },
  { id: 'IMG_002', name: 'Ritual - VarMala', selected: false },
  { id: 'IMG_003', name: 'Phera - Seven Steps', selected: true },
  { id: 'IMG_004', name: 'Couple Portrait', selected: false },
  { id: 'IMG_005', name: 'Family Group Shot', selected: true },
  { id: 'IMG_006', name: 'Bride Close-up', selected: true },
  { id: 'IMG_007', name: 'Groom Entry Dance', selected: false },
  { id: 'IMG_008', name: 'Stage Decoration', selected: false },
];

export default function MockupPreview() {
  const [activeProject, setActiveProject] = useState('wedding');
  const [photos, setPhotos] = useState(INITIAL_PHOTOS);
  const [filterSelected, setFilterSelected] = useState(false);

  const toggleSelect = (id) => {
    setPhotos(prev =>
      prev.map(p => (p.id === id ? { ...p, selected: !p.selected } : p))
    );
  };

  const selectedCount = photos.filter(p => p.selected).length;
  const displayedPhotos = filterSelected ? photos.filter(p => p.selected) : photos;

  return (
    <div className="mockup-wrapper">
      {/* Title bar */}
      <div className="mockup-header">
        <div className="mockup-dots">
          <div className="dot red"></div>
          <div className="dot yellow"></div>
          <div className="dot green"></div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, marginLeft: '8px' }}>
            Photo Selection Studio — Pro Dashboard (Interactive Demo)
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 800, background: '#09090b', color: '#fff', padding: '4px 10px', borderRadius: '20px' }}>
          <Crown size={12} style={{ color: '#f59e0b' }} /> PRO PLAN ACTIVE
        </div>
      </div>

      {/* Main app body */}
      <div className="mockup-body">
        {/* Left Sidebar */}
        <div className="mockup-sidebar">
          <div style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '12px', textTransform: 'uppercase' }}>
            PROJECTS
          </div>

          <div
            className={`mockup-project-btn ${activeProject === 'wedding' ? 'active' : ''}`}
            onClick={() => setActiveProject('wedding')}
          >
            <Folder size={16} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>Wedding — Rahul & Ananya</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>1,250 Photos</div>
            </div>
          </div>

          <div
            className={`mockup-project-btn ${activeProject === 'reception' ? 'active' : ''}`}
            onClick={() => setActiveProject('reception')}
          >
            <Folder size={16} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>Reception Night</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>840 Photos</div>
            </div>
          </div>

          <div
            className={`mockup-project-btn ${activeProject === 'prewedding' ? 'active' : ''}`}
            onClick={() => setActiveProject('prewedding')}
          >
            <Folder size={16} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>Pre-Wedding Shoot</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>420 Photos</div>
            </div>
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            💡 <strong style={{ color: 'var(--text-main)' }}>Tip:</strong> Click thumbnails to toggle selection state live!
          </div>
        </div>

        {/* Main Content Area */}
        <div className="mockup-main">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--text-main)', fontWeight: 800 }}>
                {activeProject === 'wedding' && 'Wedding — Rahul & Ananya'}
                {activeProject === 'reception' && 'Reception Night'}
                {activeProject === 'prewedding' && 'Pre-Wedding Shoot'}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                {photos.length} Photos Loaded • <span style={{ color: 'var(--text-main)', fontWeight: 700 }}>{selectedCount} Selected</span>
              </p>
            </div>

            <button
              type="button"
              className={`btn ${filterSelected ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '6px 14px', fontSize: '0.8rem' }}
              onClick={() => setFilterSelected(!filterSelected)}
            >
              <Filter size={14} />
              {filterSelected ? 'Showing Selected Only' : 'Show All Photos'}
            </button>
          </div>

          {/* Photo Grid */}
          <div className="photo-grid">
            <AnimatePresence mode="popLayout">
              {displayedPhotos.map((photo) => (
                <motion.div
                  key={photo.id}
                  layout
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`photo-card-item ${photo.selected ? 'selected' : ''}`}
                  onClick={() => toggleSelect(photo.id)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, color: photo.selected ? 'var(--text-main)' : 'var(--text-muted)' }}>
                      {photo.id}
                    </span>
                    {photo.selected ? (
                      <CheckCircle2 size={16} style={{ color: '#09090b' }} />
                    ) : (
                      <div style={{ width: 14, height: 14, border: '1.5px solid var(--border-strong)', borderRadius: '50%' }}></div>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40px', background: photo.selected ? '#e4e4e7' : '#fafafa', borderRadius: '4px', margin: '4px 0' }}>
                    <ImageIcon size={20} style={{ color: photo.selected ? '#09090b' : '#a1a1aa' }} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {photo.name}
                    </span>
                    {photo.selected && (
                      <span style={{ fontSize: '0.6rem', fontWeight: 900, background: '#09090b', color: '#fff', padding: '1px 5px', borderRadius: '4px' }}>
                        SELECTED
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
