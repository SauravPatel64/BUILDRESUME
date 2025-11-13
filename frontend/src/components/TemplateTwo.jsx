"use client";
import React, { useEffect, useRef, useState } from "react";
import { LuExternalLink, LuGithub } from "react-icons/lu";
import { formatYearMonth } from "../utils/helper";

const sectionTitleClass = "text-sm font-bold uppercase tracking-wide mb-2 pb-1 border-b border-gray-300";

const TemplateTwo = ({ resumeData = {}, containerWidth = 0 }) => {
  const {
    profileInfo = {},
    contactInfo = {},
    education = [],
    languages = [],
    workExperience = [],
    projects = [],
    skills = [],
    certifications = [],
    interests = [],
  } = resumeData;

  const resumeRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(800);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (resumeRef.current && containerWidth > 0) {
      const actualWidth = resumeRef.current.offsetWidth;
      setBaseWidth(actualWidth);
      setScale(containerWidth / actualWidth);
    }
  }, [containerWidth]);

  return (
    <div
      ref={resumeRef}
      className="resume-section p-6 bg-white font-sans text-black mx-auto"
      style={{
        width: "8.5in",
        height: "11in",
        transform: containerWidth > 0 ? `scale(${scale})` : "scale(1)",
        transformOrigin: "top left",
        overflow: "hidden",
      }}
    >
      {/* Header Section */}
      <div className="text-center mb-3">
        <h1 className="text-3xl font-bold mb-1">{profileInfo.fullName || "Your Name"}</h1>
        <p className="text-sm text-gray-600 mb-2">{profileInfo.designation || "Your Title"}</p>
        <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-700">
          {contactInfo.phone && <span>📱 {contactInfo.phone}</span>}
          {contactInfo.email && (
            <a href={`mailto:${contactInfo.email}`} className="hover:underline text-blue-600">
              ✉️ {contactInfo.email}
            </a>
          )}
          {contactInfo.linkedin && (
            <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600">
              LinkedIn
            </a>
          )}
          {contactInfo.github && (
            <a href={contactInfo.github} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600">
              GitHub
            </a>
          )}
          {contactInfo.website && (
            <a href={contactInfo.website} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600">
              Portfolio
            </a>
          )}
        </div>
      </div>

      <hr className="border-gray-400 mb-3" />

      {/* Summary */}
      {profileInfo.summary && (
        <section className="mb-3">
          <h2 className={sectionTitleClass}>Professional Summary</h2>
          <p className="text-xs text-gray-800 leading-relaxed">{profileInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {workExperience?.length > 0 && (
        <section className="mb-3">
          <h2 className={sectionTitleClass}>Work Experience</h2>
          <div className="space-y-2">
            {workExperience.map((exp, idx) => (
              <div key={idx} className="border-l-2 border-blue-400 pl-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-sm text-gray-800">{exp.role}</h3>
                    <p className="text-xs text-gray-600">{exp.company}</p>
                  </div>
                  <span className="text-xs text-gray-600">
                    {formatYearMonth(exp.startDate) || "Start"} - {formatYearMonth(exp.endDate) || "End"}
                  </span>
                </div>
                {exp.location && <p className="text-xs text-gray-600">{exp.location}</p>}
                {exp.technologies && (
                  <p className="text-xs bg-gray-100 px-2 py-1 rounded mt-1 inline-block">{exp.technologies}</p>
                )}
                {exp.description && (
                  <ul className="text-xs text-gray-700 mt-1 space-y-0.5">
                    {exp.description.split("\n").map((line, i) => (
                      <li key={i} className="list-disc list-inside">{line}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects?.length > 0 && (
        <section className="mb-3">
          <h2 className={sectionTitleClass}>Projects</h2>
          <div className="space-y-2">
            {projects.map((proj, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-sm text-gray-800">{proj.title}</h3>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs hover:underline flex items-center gap-1">
                      <LuExternalLink size={12} /> Link
                    </a>
                  )}
                </div>
                {proj.technologies && <p className="text-xs bg-gray-100 px-2 py-1 rounded inline-block">{proj.technologies}</p>}
                <p className="text-xs text-gray-700 mt-1">{proj.description}</p>
                {(proj.github || proj.liveDemo) && (
                  <div className="flex gap-3 mt-1 text-xs">
                    {proj.github && (
                      <a href={proj.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                        <LuGithub size={12} /> Code
                      </a>
                    )}
                    {proj.liveDemo && (
                      <a href={proj.liveDemo} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                        <LuExternalLink size={12} /> Demo
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education?.length > 0 && (
        <section className="mb-3">
          <h2 className={sectionTitleClass}>Education</h2>
          {education.map((edu, idx) => (
            <div key={idx} className="mb-1.5">
              <div className="flex justify-between">
                <h3 className="font-bold text-sm text-gray-800">{edu.degree}</h3>
                <span className="text-xs text-gray-600">{formatYearMonth(edu.startDate)} - {formatYearMonth(edu.endDate)}</span>
              </div>
              <p className="text-xs text-gray-700">{edu.institution}</p>
              {edu.courses && <p className="text-xs text-gray-600">Courses: {edu.courses}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills?.length > 0 && (
        <section className="mb-3">
          <h2 className={sectionTitleClass}>Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <span key={idx} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications?.length > 0 && (
        <section className="mb-3">
          <h2 className={sectionTitleClass}>Certifications</h2>
          <ul className="text-xs text-gray-700 space-y-1">
            {certifications.map((cert, idx) => (
              <li key={idx} className="list-disc list-inside">
                {cert.title} — {cert.issuer} ({cert.year})
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Languages & Interests */}
      <div className="grid grid-cols-2 gap-4">
        {languages?.length > 0 && (
          <section>
            <h2 className={sectionTitleClass}>Languages</h2>
            <div className="flex flex-wrap gap-1">
              {languages.map((lang, idx) => (
                <span key={idx} className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                  {lang.name}
                </span>
              ))}
            </div>
          </section>
        )}
        {interests?.length > 0 && (
          <section>
            <h2 className={sectionTitleClass}>Interests</h2>
            <div className="flex flex-wrap gap-1">
              {interests.filter(Boolean).map((int, idx) => (
                <span key={idx} className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                  {int}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default TemplateTwo;

// ACCORDING TO  TEMPLATE  THE RESUME WILL LOOK LIKE THIS WHEN DOWNLOAD AS WELL AS WHEN PREVIEW