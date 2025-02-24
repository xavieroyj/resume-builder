import { format } from "date-fns";
import { PersonalInfo, WorkExperience, Education, Skill, Certification } from "@/lib/store/resume";

interface TemplateProps {
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  certifications: Certification[];
}

export function MinimalTemplate({
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
    <div className="bg-white w-full h-full p-12">
      {/* Header Section */}
      <div className="space-y-1 mb-6">
        <h1 className="text-4xl font-serif tracking-wide">
          {personalInfo.fullName || "Your Name"}
        </h1>
        <p className="text-lg uppercase tracking-widest text-gray-600 mt-2">
          {personalInfo.professionalTitle || "Professional Title"}
        </p>
      </div>

      {/* Contact Information */}
      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-8">
        <span>{personalInfo.email || "email@example.com"}</span>
        <span className="w-1 h-1 rounded-full bg-gray-400" />
        <span>{personalInfo.phone || "(123) 456-7890"}</span>
        {personalInfo.website && (
          <>
            <span className="w-1 h-1 rounded-full bg-gray-400" />
            <span>{personalInfo.website}</span>
          </>
        )}
        {personalInfo.location && (
          <>
            <span className="w-1 h-1 rounded-full bg-gray-400" />
            <span>{personalInfo.location}</span>
          </>
        )}
      </div>

      {/* Experience Section */}
      <div className="mb-6">
        <h2 className="text-lg font-medium uppercase tracking-wider mb-4">Experience</h2>
        {workExperience.length === 0 ? (
          <p className="text-gray-600">Your work experience will appear here...</p>
        ) : (
          <div className="space-y-4">
            {workExperience.map((experience) => (
              <div key={experience.id} className="grid grid-cols-[1fr_auto] gap-x-4">
                <div>
                  <h3 className="font-medium">{experience.position}</h3>
                  <p className="text-gray-600 italic">{experience.company}</p>
                  <div className="mt-1 text-sm text-gray-600">
                    {experience.description.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-0.5">{paragraph}</p>
                    ))}
                  </div>
                </div>
                <div className="text-sm text-right text-gray-600 whitespace-nowrap">
                  {formatDate(experience.startDate)} – {experience.current ? 'Present' : formatDate(experience.endDate || '')}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Education Section */}
      <div className="mb-6">
        <h2 className="text-lg font-medium uppercase tracking-wider mb-4">Education</h2>
        {education.length === 0 ? (
          <p className="text-gray-600">Your education details will appear here...</p>
        ) : (
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="grid grid-cols-[1fr_auto] gap-x-4">
                <div>
                  <h3 className="font-medium">
                    {edu.degree}{edu.field && `, ${edu.field}`}
                  </h3>
                  <p className="text-gray-600 italic">{edu.school}</p>
                  {edu.description && (
                    <p className="mt-1 text-sm text-gray-600">{edu.description}</p>
                  )}
                </div>
                <div className="text-sm text-right text-gray-600 whitespace-nowrap">
                  {formatDate(edu.startDate)} – {edu.current ? 'Present' : formatDate(edu.endDate || '')}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Certifications Section */}
      {certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-medium uppercase tracking-wider mb-4">Licenses & Certifications</h2>
          <div className="space-y-3">
            {certifications.map((cert) => (
              <div key={cert.id} className="grid grid-cols-[1fr_auto] gap-x-4">
                <div>
                  <h3 className="font-medium">{cert.name}</h3>
                  <p className="text-gray-600 italic">{cert.organization}</p>
                  {cert.credentialId && (
                    <p className="text-sm text-gray-600">Credential ID: {cert.credentialId}</p>
                  )}
                  {cert.credentialUrl && (
                    <a 
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      View Credential
                    </a>
                  )}
                </div>
                <div className="text-sm text-right text-gray-600 whitespace-nowrap">
                  {cert.current ? formatDate(cert.issueDate) : 
                   cert.expirationDate ? `${formatDate(cert.issueDate)} - ${formatDate(cert.expirationDate)}` : 
                   formatDate(cert.issueDate)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills Section */}
      <div>
        <h2 className="text-lg font-medium uppercase tracking-wider mb-4">Skills</h2>
        {skills.length === 0 ? (
          <p className="text-gray-600">Your skills will appear here...</p>
        ) : (
          <div className="grid grid-cols-3 gap-x-4 gap-y-1">
            {skills.map((skill) => (
              <div key={skill.id} className="text-gray-600">
                {skill.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
