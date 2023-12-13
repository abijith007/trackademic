// Timeline.js
import React from 'react';
import imgTemp from "../../assets/temp.jpg";

const Timeline = () => {
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    borderBottom: '1px solid #ccc', // Add a border at the bottom
    borderTop: '1px solid #ccc', // Add a border at the top
    padding: '10px 0', // Add some padding for better spacing
  };

  const imageStyle = {
    flex: '50%', // Half of the container width
    maxWidth: '100%', // Adjust this value based on your needs
    marginRight: '20px',
  };

  const contentStyle = {
    flex: '50%', // Half of the container width
    textAlign: 'justify', // Justify the text
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
                <strong>Visual Representation:</strong><br />
                The timeline feature provides a graphical representation of project activities, allowing for a quick and visual overview of the project.
              </p>
              <p style={paragraphStyle}>
                <strong>Project Phases and Milestones:</strong><br />
                The timeline showcases different project phases, task durations, and important milestones. This helps team members understand the overall structure and timeline of the project.
              </p>
              <p style={paragraphStyle}>
                <strong>Duration Indicators:</strong><br />
                Each task or project phase is displayed on the timeline with an indicator of its duration. This feature allows team members to quickly assess the time required for specific activities.
              </p>
              <p style={paragraphStyle}>
                <strong>Task Relationships:</strong><br />
                Dependencies between tasks are visually represented on the timeline. This aids in understanding the relationships between different tasks and helps identify critical paths in the project.
              </p>
            </div>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default Timeline;
