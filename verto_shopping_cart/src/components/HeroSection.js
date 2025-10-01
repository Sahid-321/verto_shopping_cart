import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-background">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Discover Premium 
              <span className="hero-highlight"> Tech Products</span>
            </h1>
            <p className="hero-description">
              Elevate your digital lifestyle with our curated collection of cutting-edge technology. 
              From wireless audio to smart accessories, find everything you need to stay connected and productive.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">50k+</span>
                <span className="stat-label">Happy Customers</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">99%</span>
                <span className="stat-label">Satisfaction Rate</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Support</span>
              </div>
            </div>
            <button className="hero-cta-button" onClick={scrollToProducts}>
              Shop Now
              <span className="cta-arrow">→</span>
            </button>
          </div>
          <div className="hero-visual">
            <div className="floating-card card-1">
              <div className="card-icon">🎧</div>
              <div className="card-text">Premium Audio</div>
            </div>
            <div className="floating-card card-2">
              <div className="card-icon">⚡</div>
              <div className="card-text">Fast Charging</div>
            </div>
            <div className="floating-card card-3">
              <div className="card-icon">📱</div>
              <div className="card-text">Smart Devices</div>
            </div>
            <div className="hero-circle-1"></div>
            <div className="hero-circle-2"></div>
            <div className="hero-circle-3"></div>
          </div>
        </div>
      </div>
      <div className="hero-wave">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z" fill="#f8fafc"/>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
