import React from 'react';
import { Helmet } from 'react-helmet';

const About = () => {
  return (
    <div>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Protest+Strike&display=swap" rel="stylesheet" />
      </Helmet>
      <div>
        <h1 style={{ fontFamily: 'monospace', color: 'lightblue' }}>About The Medical Assistance App</h1>
    
        <h2 style={{ fontFamily: 'Protest Strike, sans-serif', color: '#28a745' }}>Who We Are</h2>
        <p>
          The Medical Assistance App is a platform dedicated to providing comprehensive support for individuals seeking medical assistance and guidance.
        </p>
        <p>
          Whether you're in need of immediate medical advice, managing a chronic condition, or simply looking for health resources, our app is here to assist you every step of the way.
        </p>
        <p>
          With features such as real-time consultations, medication reminders, and health education materials, the Medical Assistance App aims to empower users to prioritize their health and well-being.
        </p>
      </div>
    </div>
  );
};

export default About;