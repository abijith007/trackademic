// Report.js
import React from 'react';
import imgTemp from "../../assets/temp.jpg";

const Report = () => {
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    borderBottom: '1px solid #ccc',
    borderTop: '1px solid #ccc',
    padding: '10px 0',
  };

  const contentStyle = {
    flex: '100%', // Full width for content in the report
    textAlign: 'justify',
  };

  const paragraphStyle = {
    marginBottom: '10px',
  };
  const imageStyle = {
    flex: '50%', // Half of the container width
    maxWidth: '100%', // Adjust this value based on your needs
    marginRight: '20px',
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
                <strong>Tailored Reports:</strong><br />
                Reports are tailored to include specific metrics and data relevant to the "trackademic" project.
              </p>
              <p style={paragraphStyle}>
                <strong>Visual Representations:</strong><br />
                Visual representations, such as charts and graphs, illustrate project trends and key metrics, assisting in better decision-making.
              </p>
              <p style={paragraphStyle}>
                <strong>Key Performance Indicators (KPIs):</strong><br />
                KPIs related to project goals are prominently featured in reports, including metrics like progress rates and user engagement.
              </p>
              <p style={paragraphStyle}>
                <strong>Facilitates Collaboration:</strong><br />
                This feature facilitates collaboration and allows for transparent communication with stakeholders.
              </p>
            </div>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default Report;
