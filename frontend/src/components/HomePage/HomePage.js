// HomePage.js
import React, { useState } from "react";
import Footer from "../common-components/Footer/Footer";
import NavBar from "../common-components/NavBar/NavBar";
import FeaturesSection from "../common-components/Features/features";
import TeamSection from "../common-components/Team/team";
import Timeline from "../sections/timeline";
import Reports from "../sections/reports";
import Speech from "../sections/speech";
import ChatbotSection from "../sections/chatbot";
import "./HomePage.css";
import Abijith from "../../assets/abijith.jpg";
import Shakshi from "../../assets/shakshi.PNG";

// Introduction for the "trackademic" project
const introductionText = `
Our mission is to develop an Enhanced Issue/Ticket Tracking System
  with specific goals, participants, software and hardware components, an architecture diagram,
  and an overview of the interaction between different components. The project is designed to
  enhance productivity, streamline workflows, improve communication, integrate speech-to-text
  capabilities for accessibility, implement automated notifications, and enable sentiment analysis.
`;

function HomePage() {
  const [selectedSection, setSelectedSection] = useState("timeline");

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  const featuresData = [
    {
      title: "Issue Tracking",
      description: "Issue tracking is a systematic process of monitoring, managing, and resolving problems or tasks within a project or organization. It involves documenting and keeping track of various issues, bugs, tasks, or enhancements that need attention. Each issue is typically assigned a unique identifier and may include details such as its status, priority, description, and the individuals responsible for resolving it. ",
    },
    {
      title: "Task Management",
      description: "Effortlessly manage tasks and track progress.",
    },
    {
      title: "Collaboration",
      description: "Work seamlessly with your team in real-time.",
    },
    {
      title: "Statistics",
      description: "Gain insights with powerful statistical tools.",
    },
    {
      title: "Speech to Text",
      description: "Convert spoken language into written text.",
    },
    {
      title: "Chatbot",
      description: "Enhance user interactions with an intelligent chatbot.",
    },
  ];

  const teamData = [
    {
      name: "Abijith Ramachandran",
      role: "Developer",
      avatar: Abijith,
    },
    {
      name: "Shakshi Parekh",
      role: "Developer",
      avatar: Shakshi,
    },
    // Add more team members as needed
  ];

  return (
    <>
      <NavBar />
      <div className="container mx-auto p-4">
       
        {/* Display the introduction text */}
        <div className="introduction-container">
          <h1 className="welcome-text">Welcome to trackademic</h1>
          <div className="introduction-text" dangerouslySetInnerHTML={{ __html: introductionText }}></div>
        </div>
              <h2 className="text-3xl font-semibold mb-8">Our Services</h2>

        <FeaturesSection features={featuresData} />

        {/* Display the section names with icons */}
        <div className="section-names-container">
          <button
            className={`section-name ${selectedSection === "timeline" ? "selected" : ""}`}
            onClick={() => handleSectionChange("timeline")}
          >
            📆 Timeline
          </button>
          <button
            className={`section-name ${selectedSection === "reports" ? "selected" : ""}`}
            onClick={() => handleSectionChange("reports")}
          >
            📊 Reports
          </button>
          <button
            className={`section-name ${selectedSection === "speech" ? "selected" : ""}`}
            onClick={() => handleSectionChange("speech")}
          >
            🎤 Speech
          </button>
          <button
            className={`section-name ${selectedSection === "chatbot" ? "selected" : ""}`}
            onClick={() => handleSectionChange("chatbot")}
          >
            🤖 Chatbot
          </button>
        </div>

        {/* Display the selected section with styles */}
        <div className="selected-section">
          {selectedSection === "timeline" && <Timeline />}
          {selectedSection === "reports" && <Reports />}
          {selectedSection === "speech" && <Speech />}
          {selectedSection === "chatbot" && <ChatbotSection />}
        </div>
      </div>
      <TeamSection teamMembers={teamData} />
      <Footer />
    </>
  );
}

export default HomePage;
