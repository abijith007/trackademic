import React from "react";


const TeamSection = ({ teamMembers }) => {
  const teamSectionStyle = {
    marginBottom: "12px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Center the section horizontally
  };

  return (
    <section style={teamSectionStyle}>
      <h2 className="text-3xl font-bold mb-6">Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md flex items-center">
            {index % 2 === 0 && (
              <div className="w-20 h-20 mr-4 rounded-full overflow-hidden">
                <img
                  src={member.avatar}
                  alt={`${member.name}'s avatar`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div>
              <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
            {index % 2 !== 0 && (
              <div className="w-20 h-20 ml-4 rounded-full overflow-hidden">
                <img
                  src={member.avatar}
                  alt={`${member.name}'s avatar`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
