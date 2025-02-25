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
    <div className="bg-white w-full h-full p-12 print:m-0 print:p-[12mm]" aria-label="Resume">
      {/* Header Section */}
      <header className="text-center border-b-2 pb-4 mb-6">
        <h1 className="text-3xl font-serif mb-2 break-words">
          {personalInfo.fullName || "Your Name"}
        </h1>
        <p className="text-lg text-gray-600 mb-4 break-words">
          {personalInfo.professionalTitle || "Professional Title"}
        </p>
        
        {/* Contact Information in 2 columns */}
        <div className="grid grid-cols-2 gap-2 text-sm max-w-[600px] mx-auto">
          <div className="text-right pr-4 border-r">
            <p className="break-words">{personalInfo.email || "email@example.com"}</p>
            <p className="break-words">{personalInfo.phone || "(123) 456-7890"}</p>
          </div>
          <div className="text-left pl-4">
            <p className="break-words">{personalInfo.location || "City, Country"}</p>
            {personalInfo.website && <p className="break-words">{personalInfo.website}</p>}
          </div>
        </div>
      </header>

      {/* Professional Summary */}
      {personalInfo.summary && (
        <section aria-label="Professional Summary">
          <div className="mb-6">
            <h2 className="text-lg font-serif border-b mb-3">Professional Summary</h2>
            <p className="text-gray-600 text-sm leading-relaxed break-words">
              {personalInfo.summary}
            </p>
          </div>
        </section>
      )}

      {/* Experience Section */}
      <section aria-label="Work Experience">
        <div className="mb-6">
          <h2 className="text-lg font-serif border-b mb-3">Professional Experience</h2>
          {workExperience.length === 0 ? (
            <p className="text-gray-600">Your work experience will appear here...</p>
          ) : (
            <div className="space-y-4">
              {workExperience.map((experience) => (
                <article key={experience.id} className="print:page-break-inside-avoid">
                  <header className="flex justify-between items-baseline mb-1 flex-wrap gap-2">
                    <h3 className="font-semibold break-words">{experience.position}</h3>
                    <time className="text-sm text-gray-600 whitespace-nowrap">
                      {formatDate(experience.startDate)} – {experience.current ? 'Present' : formatDate(experience.endDate || '')}
                    </time>
                  </header>
                  <div className="flex justify-between items-baseline mb-2 flex-wrap gap-2">
                    <p className="text-gray-700 break-words">{experience.company}</p>
                    <p className="text-sm text-gray-600 break-words">{experience.location}</p>
                  </div>
                  <div className="text-sm text-gray-600 pl-4 border-l-2 border-gray-200">
                    {experience.description.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-1 break-words">{paragraph}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Education Section */}
      <section aria-label="Education">
        <div className="mb-6">
          <h2 className="text-lg font-serif border-b mb-3">Education</h2>
          {education.length === 0 ? (
            <p className="text-gray-600">Your education details will appear here...</p>
          ) : (
            <div className="space-y-4">
              {education.map((edu) => (
                <article key={edu.id} className="print:page-break-inside-avoid">
                  <header className="flex justify-between items-baseline mb-1 flex-wrap gap-2">
                    <h3 className="font-semibold break-words">
                      {edu.degree}{edu.field && `, ${edu.field}`}
                    </h3>
                    <time className="text-sm text-gray-600 whitespace-nowrap">
                      {formatDate(edu.startDate)} – {edu.current ? 'Present' : formatDate(edu.endDate || '')}
                    </time>
                  </header>
                  <div className="flex justify-between items-baseline mb-2 flex-wrap gap-2">
                    <p className="text-gray-700 break-words">{edu.school}</p>
                    <p className="text-sm text-gray-600 break-words">{edu.location}</p>
                  </div>
                  {edu.description && (
                    <p className="text-sm text-gray-600 pl-4 border-l-2 border-gray-200 break-words">
                      {edu.description}
                    </p>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Certifications Section */}
      {certifications.length > 0 && (
        <section aria-label="Certifications">
          <div className="mb-6">
            <h2 className="text-lg font-serif border-b mb-3">Licenses & Certifications</h2>
            <div className="space-y-4">
              {certifications.map((cert) => (
                <article key={cert.id} className="print:page-break-inside-avoid">
                  <header className="flex justify-between items-baseline mb-1 flex-wrap gap-2">
                    <h3 className="font-semibold break-words">{cert.name}</h3>
                    <time className="text-sm text-gray-600 whitespace-nowrap">
                      {cert.current ? formatDate(cert.issueDate) : 
                       cert.expirationDate ? `${formatDate(cert.issueDate)} - ${formatDate(cert.expirationDate)}` : 
                       formatDate(cert.issueDate)}
                    </time>
                  </header>
                  <div className="flex justify-between items-baseline mb-2">
                    <p className="text-gray-700 break-words">{cert.organization}</p>
                  </div>
                  {(cert.credentialId || cert.credentialUrl) && (
                    <div className="text-sm text-gray-600 pl-4 border-l-2 border-gray-200">
                      {cert.credentialId && (
                        <p className="mb-1 break-words">Credential ID: {cert.credentialId}</p>
                      )}
                      {cert.credentialUrl && (
                        <a 
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 break-words"
                        >
                          View Credential
                        </a>
                      )}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills Section */}
      <section aria-label="Skills">
        <div>
          <h2 className="text-lg font-serif border-b mb-3">Skills</h2>
          {skills.length === 0 ? (
            <p className="text-gray-600">Your skills will appear here...</p>
          ) : (
            <ul className="pl-4 list-disc ml-4">
              <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                {skills.map((skill) => (
                  <li key={skill.id} className="text-gray-800 break-words">
                    {skill.name}
                  </li>
                ))}
              </div>
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
