import React from 'react';
import './FeaturesSection.css';

const FeaturesSection = () => {
  const features = [
    {
      icon: '🚚',
      title: 'Free Shipping',
      description: 'Free delivery on orders over $50. Get your tech gear delivered right to your door.'
    },
    {
      icon: '🔒',
      title: 'Secure Payment',
      description: 'Your payment information is encrypted and secure with industry-standard protection.'
    },
    {
      icon: '↩️',
      title: '30-Day Returns',
      description: 'Not satisfied? Return any item within 30 days for a full refund, no questions asked.'
    },
    {
      icon: '🎧',
      title: '24/7 Support',
      description: 'Our expert team is available around the clock to help with any questions or issues.'
    }
  ];

  return (
    <section className="features-section">
      <div className="features-container">
        <div className="features-header">
          <h2 className="features-title">Why Choose Verto Shopping?</h2>
          <p className="features-subtitle">
            We're committed to providing the best shopping experience with premium products and exceptional service.
          </p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
