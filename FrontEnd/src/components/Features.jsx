// src/components/Features.jsx
import React from 'react';
import FeatureItem from './FeatureItem';
import chatIcon from '../assets/icon-chat.webp';
import moneyIcon from '../assets/icon-money.webp';
import securityIcon from '../assets/icon-security.webp';

const Features = () => {
  return (
    <section className="features">
      <h2 className="sr-only">Features</h2>
      <FeatureItem
        imgSrc={chatIcon}
        title="You are our #1 priority"
        description="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
      />
      <FeatureItem
        imgSrc={moneyIcon}
        title="More savings means higher rates"
        description="The more you save with us, the higher your interest rate will be!"
      />
      <FeatureItem
        imgSrc={securityIcon}
        title="Security you can trust"
        description="We use top of the line encryption to make sure your data and money is always safe."
      />
    </section>
  );
};

export default Features;
