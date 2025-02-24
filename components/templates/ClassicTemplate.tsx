import { format } from "date-fns";
import { PersonalInfo, WorkExperience, Education, Skill, Certification } from "@/lib/store/resume";

interface TemplateProps {
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  certifications: Certification[];
}

export function ClassicTemplate({
  personalInfo,
  workExperience,
  education,
  skills,
  certifications,
}: TemplateProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    try {
      return format(new Date(dateString + "-01"), "MMMM yyyy");
    } catch {
      return dateString;
    }
  };

  return (
    <div className="bg-white w-full h-full p-12 print:p-6 print:text-[11pt] print:leading-tight">
      {/* Header Section */}
      <div className="text-center border-b-2 pb-4 mb-6 print:pb-3 print:mb-4">
        <h1 className="text-3xl font-serif mb-2 print:text-2xl print:mb-1">
          {personalInfo.fullName || "Your Name"}
        </h1>
        <p className="text-lg text-gray-600 mb-4 print:text-base print:mb-3">
          {personalInfo.professionalTitle || "Professional Title"}
        </p>
        
        {/* Contact Information in 2 columns */}
        <div className="grid grid-cols-2 gap-2 text-sm max-w-[600px] mx-auto print:text-xs print:max-w-[500px]">
          <div className="text-right pr-4 border-r">
            <p>{personalInfo.email || "email@example.com"}</p>
            <p>{personalInfo.phone || "(123) 456-7890"}</p>
          </div>
          <div className="text-left pl-4">
            <p>{personalInfo.location || "City, Country"}</p>
            {personalInfo.website && <p>{personalInfo.website}</p>}
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      {personalInfo.summary && (
        <div className="mb-6 print:mb-4">
          <h2 className="text-lg font-serif border-b mb-3 print:text-base print:mb-2">Professional Summary</h2>
          <p className="text-gray-600 text-sm leading-relaxed print:text-xs">
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience Section */}
      <div className="mb-6 print:mb-4">
        <h2 className="text-lg font-serif border-b mb-3 print:text-base print:mb-2">Professional Experience</h2>
        {workExperience.length === 0 ? (
          <p className="text-gray-600 print:text-xs">Your work experience will appear here...</p>
        ) : (
          <div className="space-y-4 print:space-y-3">
            {workExperience.map((experience) => (
              <div key={experience.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold print:text-sm">{experience.position}</h3>
                  <span className="text-sm text-gray-600 print:text-xs">
                    {formatDate(experience.startDate)} – {experience.current ? 'Present' : formatDate(experience.endDate || '')}
                  </span>
                </div>
                <div className="flex justify-between items-baseline mb-2 print:mb-1">
                  <p className="text-gray-700 print:text-xs">{experience.company}</p>
                  <p className="text-sm text-gray-600 print:text-xs">{experience.location}</p>
                </div>
                <div className="text-sm text-gray-600 pl-4 border-l-2 border-gray-200 print:text-xs print:pl-3">
                  {experience.description.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-1 print:mb-0.5">{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Education Section */}
      <div className="mb-6 print:mb-4">
        <h2 className="text-lg font-serif border-b mb-3 print:text-base print:mb-2">Education</h2>
        {education.length === 0 ? (
          <p className="text-gray-600 print:text-xs">Your education details will appear here...</p>
        ) : (
          <div className="space-y-4 print:space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold print:text-sm">
                    {edu.degree}{edu.field && `, ${edu.field}`}
                  </h3>
                  <span className="text-sm text-gray-600 print:text-xs">
                    {formatDate(edu.startDate)} – {edu.current ? 'Present' : formatDate(edu.endDate || '')}
                  </span>
                </div>
                <div className="flex justify-between items-baseline mb-2 print:mb-1">
                  <p className="text-gray-700 print:text-xs">{edu.school}</p>
                  <p className="text-sm text-gray-600 print:text-xs">{edu.location}</p>
                </div>
                {edu.description && (
                  <p className="text-sm text-gray-600 pl-4 border-l-2 border-gray-200 print:text-xs print:pl-3">
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Certifications Section */}
      {certifications.length > 0 && (
        <div className="mb-6 print:mb-4">
          <h2 className="text-lg font-serif border-b mb-3 print:text-base print:mb-2">Licenses & Certifications</h2>
          <div className="space-y-4 print:space-y-3">
            {certifications.map((cert) => (
              <div key={cert.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold print:text-sm">{cert.name}</h3>
                  <span className="text-sm text-gray-600 print:text-xs">
                    {cert.current ? formatDate(cert.issueDate) : 
                     cert.expirationDate ? `${formatDate(cert.issueDate)} - ${formatDate(cert.expirationDate)}` : 
                     formatDate(cert.issueDate)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline mb-2 print:mb-1">
                  <p className="text-gray-700 print:text-xs">{cert.organization}</p>
                </div>
                {(cert.credentialId || cert.credentialUrl) && (
                  <div className="text-sm text-gray-600 pl-4 border-l-2 border-gray-200 print:text-xs print:pl-3">
                    {cert.credentialId && (
                      <p className="mb-1 print:mb-0.5">Credential ID: {cert.credentialId}</p>
                    )}
                    {cert.credentialUrl && (
                      <a 
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 print:text-gray-600"
                      >
                        View Credential
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills Section */}
      <div>
        <h2 className="text-lg font-serif border-b mb-3 print:text-base print:mb-2">Skills</h2>
        {skills.length === 0 ? (
          <p className="text-gray-600 print:text-xs">Your skills will appear here...</p>
        ) : (
          <div className="pl-4 print:pl-3">
            <div className="grid grid-cols-2 gap-x-8 gap-y-1">
              {skills.map((skill) => (
                <div key={skill.id} className="text-gray-800 print:text-xs">
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 