// TimelineSection.js
import React from "react";
import imgTemp from "../../assets/temp.jpg";

function TimelineSection() {
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    borderBottom: '1px solid #ccc',
    borderTop: '1px solid #ccc',
    padding: '10px 0',
  };

  const contentStyle = {
    flex: '100%', // Full width for content in the timeline
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
                <strong>Intelligent Assistant:</strong><br />
                The chatbot serves as an intelligent assistant, providing information, executing tasks, and facilitating communication.
              </p>
              <p style={paragraphStyle}>
                <strong>Automation:</strong><br />
                This feature adds a layer of automation to routine project activities.
              </p>
              <p style={paragraphStyle}>
                <strong>Natural Language Understanding:</strong><br />
                The chatbot understands and responds to natural language queries.
              </p>
              <p style={paragraphStyle}>
                <strong>Seamless Integration:</strong><br />
                The chatbot seamlessly integrates with other project components, ensuring a holistic project management experience by interacting with task management, timeline tracking, and other relevant features.
              </p>
            </div>
          </div>
        </li>
      </ul>
    </section>
  );
}

export default TimelineSection;
