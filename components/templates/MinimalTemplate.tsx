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
    <div className="bg-white w-full h-full p-12 print:m-0 print:p-[12mm]" aria-label="Resume">
      {/* Header Section */}
      <header className="space-y-1 mb-6">
        <h1 className="text-4xl font-serif tracking-wide break-words">
          {personalInfo.fullName || "Your Name"}
        </h1>
        <p className="text-lg uppercase tracking-widest text-gray-600 mt-2 break-words">
          {personalInfo.professionalTitle || "Professional Title"}
        </p>
      </header>

      {/* Contact Information */}
      <section aria-label="Contact Information" className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-8">
        <span className="break-words">{personalInfo.email || "email@example.com"}</span>
        <span className="w-1 h-1 rounded-full bg-gray-400" aria-hidden="true" />
        <span className="break-words">{personalInfo.phone || "(123) 456-7890"}</span>
        {personalInfo.website && (
          <>
            <span className="w-1 h-1 rounded-full bg-gray-400" aria-hidden="true" />
            <span className="break-words">{personalInfo.website}</span>
          </>
        )}
        {personalInfo.location && (
          <>
            <span className="w-1 h-1 rounded-full bg-gray-400" aria-hidden="true" />
            <span className="break-words">{personalInfo.location}</span>
          </>
        )}
      </section>

      {/* Professional Summary */}
      {personalInfo.summary && (
        <section aria-label="Professional Summary" className="mb-6">
          <h2 className="text-lg font-medium uppercase tracking-wider mb-4">Professional Summary</h2>
          <p className="text-gray-600 leading-relaxed break-words">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Experience Section */}
      <section aria-label="Work Experience" className="mb-6">
        <h2 className="text-lg font-medium uppercase tracking-wider mb-4">Professional Experience</h2>
        {workExperience.length === 0 ? (
          <p className="text-gray-600">Your work experience will appear here...</p>
        ) : (
          <div className="space-y-4">
            {workExperience.map((experience) => (
              <article key={experience.id} className="grid grid-cols-[1fr_auto] gap-x-4 print:page-break-inside-avoid">
                <div>
                  <header>
                    <h3 className="font-medium break-words">{experience.position}</h3>
                    <p className="text-gray-600 italic break-words">{experience.company}{experience.location ? `, ${experience.location}` : ''}</p>
                  </header>
                  <div className="mt-1 text-sm text-gray-600">
                    {experience.description.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-0.5 break-words">{paragraph}</p>
                    ))}
                  </div>
                </div>
                <time className="text-sm text-right text-gray-600 whitespace-nowrap">
                  {formatDate(experience.startDate)} – {experience.current ? 'Present' : formatDate(experience.endDate || '')}
                </time>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Education Section */}
      <section aria-label="Education" className="mb-6">
        <h2 className="text-lg font-medium uppercase tracking-wider mb-4">Education</h2>
        {education.length === 0 ? (
          <p className="text-gray-600">Your education details will appear here...</p>
        ) : (
          <div className="space-y-3">
            {education.map((edu) => (
              <article key={edu.id} className="grid grid-cols-[1fr_auto] gap-x-4 print:page-break-inside-avoid">
                <div>
                  <header>
                    <h3 className="font-medium break-words">
                      {edu.degree}{edu.field && `, ${edu.field}`}
                    </h3>
                    <p className="text-gray-600 italic break-words">{edu.school}{edu.location ? `, ${edu.location}` : ''}</p>
                  </header>
                  {edu.description && (
                    <p className="mt-1 text-sm text-gray-600 break-words">{edu.description}</p>
                  )}
                </div>
                <time className="text-sm text-right text-gray-600 whitespace-nowrap">
                  {formatDate(edu.startDate)} – {edu.current ? 'Present' : formatDate(edu.endDate || '')}
                </time>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Certifications Section */}
      {certifications.length > 0 && (
        <section aria-label="Certifications" className="mb-6">
          <h2 className="text-lg font-medium uppercase tracking-wider mb-4">Licenses & Certifications</h2>
          <div className="space-y-3">
            {certifications.map((cert) => (
              <article key={cert.id} className="grid grid-cols-[1fr_auto] gap-x-4 print:page-break-inside-avoid">
                <div>
                  <header>
                    <h3 className="font-medium break-words">{cert.name}</h3>
                    <p className="text-gray-600 italic break-words">{cert.organization}</p>
                  </header>
                  {cert.credentialId && (
                    <p className="text-sm text-gray-600 break-words">Credential ID: {cert.credentialId}</p>
                  )}
                  {cert.credentialUrl && (
                    <a 
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800 break-words"
                    >
                      View Credential
                    </a>
                  )}
                </div>
                <time className="text-sm text-right text-gray-600 whitespace-nowrap">
                  {cert.current ? formatDate(cert.issueDate) : 
                   cert.expirationDate ? `${formatDate(cert.issueDate)} - ${formatDate(cert.expirationDate)}` : 
                   formatDate(cert.issueDate)}
                </time>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Skills Section */}
      <section aria-label="Skills">
        <h2 className="text-lg font-medium uppercase tracking-wider mb-4">Skills</h2>
        {skills.length === 0 ? (
          <p className="text-gray-600">Your skills will appear here...</p>
        ) : (
          <ul className="grid grid-cols-3 gap-x-4 gap-y-1 list-disc pl-5">
            {skills.map((skill) => (
              <li key={skill.id} className="text-gray-600 break-words">
                {skill.name}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
