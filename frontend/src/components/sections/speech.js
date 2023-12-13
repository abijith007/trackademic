// Speech.js
import React from 'react';
import imgTemp from "../../assets/abijith.jpg";

const Speech = () => {
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    borderBottom: '1px solid #ccc',
    borderTop: '1px solid #ccc',
    padding: '10px 0',
  };
  const imageStyle = {
    flex: '50%', // Half of the container width
    maxWidth: '100%', // Adjust this value based on your needs
    marginRight: '20px',
  };

  const contentStyle = {
    flex: '100%', // Full width for content in the timeline
    textAlign: 'justify',
  };

  const paragraphStyle = {
    marginBottom: '10px',
  };

  return (
    <section>
      <ul>
        <li>
          <div style={containerStyle}>
          <div style={imageStyle}>
              <img src={imgTemp} alt="Timeline" style={{ width: '100%', height: 'auto' }} />
            </div>
            <div style={contentStyle}>
              <p style={paragraphStyle}>
                <strong>Enhanced Accessibility:</strong><br />
                The speech feature enhances accessibility and provides a hands-free alternative for interacting with the system.
              </p>
              <p style={paragraphStyle}>
                <strong>Convenience to Workflow:</strong><br />
                This hands-free interaction adds convenience to users' workflows.
              </p>
              <p style={paragraphStyle}>
                <strong>Inclusivity:</strong><br />
                The speech feature enhances inclusivity by accommodating users with different needs, ensuring accessibility for individuals with mobility challenges or visual impairments.
              </p>
              <p style={paragraphStyle}>
                <strong>Seamless Integration:</strong><br />
                The speech feature seamlessly integrates with other project components, such as task management or issue tracking, contributing to seamless documentation of insights and action items.
              </p>
            </div>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default Speech;
