import React from 'react';
import { FaGithub, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaLinkedin } from 'react-icons/fa';

const About = () => {

   
  return (
    <div className="bg-[#f5f4f1] min-h-screen px-6 py-10 text-[#6f4e37]">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">About Me</h1>

        <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
        
          <div className="flex flex-col  md:flex-row-reverse md:justify-between items-center gap-6">
            <img
              src="https://i.ibb.co/5hc6LQ11/IMG-3052.jpgg" 
              alt="Sheikh Mohammad"
              className="w-40 h-40 rounded-full object-cover border-4 border-[#6f4e37]"
            />
            <div>
              <h2 className="text-2xl font-bold">Sheikh Mohammad</h2>
              <p className="text-sm mt-1">BSc in CSE | Full Stack Developer | Cybersecurity Enthusiast</p>
              <p className="mt-3"><FaMapMarkerAlt className="inline mr-2" />Jatrabari, Dhaka, Bangladesh</p>
              <p><FaPhoneAlt className="inline mr-2" />01851308413</p>
              <p><FaEnvelope className="inline mr-2" />sheikh551845@gmail.com</p>
              <p>
                <FaGithub className="inline mr-2" />
                <a href="https://github.com/Sheikh551845" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  github.com/Sheikh551845
                </a>
              </p>
            </div>
          </div>

    
          <section>
            <h2 className="text-2xl font-semibold mb-2">Career Objective</h2>
            <p>
              To work in a world-class professional environment where I can utilize and extend my skills, and be part of a team I can be proud of.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Education</h2>
            <ul className="list-disc list-inside">
              <li><strong>BSc in CSE</strong>, World University of Bangladesh, CGPA: 3.77 (Expected 2025)</li>
              <li><strong>HSC</strong>, Feni City College, GPA: 3.92</li>
              <li><strong>SSC</strong>, Bizbag N.K High School, GPA: 4.50</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2 text-sm">
              {[
                "JavaScript", "React", "Vue.js", "HTML5", "CSS3", "Tailwind",
                "MongoDB", "Firebase", "MySQL", "Linux", "C++", "Git", "REST API", "Cybersecurity"
              ].map(skill => (
                <span key={skill} className="bg-[#6f4e37]/10 px-3 py-1 rounded-full border border-[#6f4e37]/20">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Experience & Courses</h2>
            <ul className="list-disc list-inside">
              <li>Web Development - Programming Hero (Level 1)</li>
              <li>Cybersecurity - Arena Web Security</li>
              <li>Competitive Programming - DevSkill</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Social Involvement</h2>
            <ul className="list-disc list-inside">
              <li>General Member – WUB Student Society (2022-2024)</li>
              <li>Founding Member – Hilfulzul Social Helping Organization</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
