import { format } from "date-fns";
import { PersonalInfo, WorkExperience, Education, Skill, Certification } from "@/lib/store/resume";
import { Mail, Phone, MapPin, Link, User, Briefcase, GraduationCap, Award } from "lucide-react";

interface TemplateProps {
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  certifications: Certification[];
}

export function ModernTemplate({
  personalInfo,
  workExperience,
  education,
  skills,
  certifications,
}: TemplateProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    try {
      return format(new Date(dateString + "-01"), "MMM yyyy");
    } catch {
      return dateString;
    }
  };

  const getSkillLevelWidth = (level?: string) => {
    switch (level?.toLowerCase()) {
      case 'beginner': return 'w-1/4';
      case 'intermediate': return 'w-2/4';
      case 'advanced': return 'w-3/4';
      case 'expert': return 'w-full';
      default: return 'w-full';
    }
  };

  return (
    <div className="bg-white w-full print:m-0 print:p-[12mm]">
      <div className="grid grid-cols-[300px_1fr] print:grid-cols-[220px_1fr] print:gap-8">
        {/* Sidebar */}
        <div className="bg-gray-50 p-8 print:bg-white print:p-0">
          {/* Profile Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight mb-1">
              {personalInfo.fullName || "Your Name"}
            </h1>
            <p className="text-blue-600 font-medium mb-4">
              {personalInfo.professionalTitle || "Professional Title"}
            </p>
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <span className="w-4 h-4 bg-blue-600/10 text-blue-600 flex items-center justify-center rounded-full">
                  <Mail className="w-3 h-3" />
                </span>
                <span>{personalInfo.email || "email@example.com"}</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="w-4 h-4 bg-blue-600/10 text-blue-600 flex items-center justify-center rounded-full">
                  <Phone className="w-3 h-3" />
                </span>
                <span>{personalInfo.phone || "(123) 456-7890"}</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="w-4 h-4 bg-blue-600/10 text-blue-600 flex items-center justify-center rounded-full">
                  <MapPin className="w-3 h-3" />
                </span>
                <span>{personalInfo.location || "City, Country"}</span>
              </p>
              {personalInfo.website && (
                <p className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-blue-600/10 text-blue-600 flex items-center justify-center rounded-full">
                    <Link className="w-3 h-3" />
                  </span>
                  <span>{personalInfo.website}</span>
                </p>
              )}
            </div>
          </div>

          {/* Skills Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-900">Skills</h2>
            {skills.length === 0 ? (
              <p className="text-gray-600 text-sm">Your skills will appear here...</p>
            ) : (
              <div className="space-y-3">
                {skills.map((skill) => (
                  <div key={skill.id} className="text-sm">
                    <span className="font-medium text-gray-900">{skill.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8 print:p-0">
          {/* Summary Section */}
          {personalInfo.summary && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-3 text-gray-900 flex items-center">
                <div className="w-8 h-8 bg-blue-600/10 text-blue-600 flex items-center justify-center rounded-full mr-2">
                  <User className="w-4 h-4" />
                </div>
                About Me
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {personalInfo.summary}
              </p>
            </div>
          )}

          {/* Experience Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-6 text-gray-900 flex items-center">
              <div className="w-8 h-8 bg-blue-600/10 text-blue-600 flex items-center justify-center rounded-full mr-2">
                <Briefcase className="w-4 h-4" />
              </div>
              Experience
            </h2>
            {workExperience.length === 0 ? (
              <p className="text-gray-600">Your work experience will appear here...</p>
            ) : (
              <div className="space-y-6">
                {workExperience.map((experience) => (
                  <div key={experience.id} className="relative pl-6 pb-6 last:pb-0">
                    <div className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-blue-600" />
                    <div className="absolute left-[2.5px] top-3 bottom-0 w-0.5 bg-gray-200 last:hidden" />
                    <div>
                      <div className="flex justify-between items-baseline mb-1 flex-wrap gap-2">
                        <h3 className="font-semibold text-gray-900">{experience.position}</h3>
                        <span className="text-sm text-gray-500 shrink-0">
                          {formatDate(experience.startDate)} – {experience.current ? 'Present' : formatDate(experience.endDate || '')}
                        </span>
                      </div>
                      <p className="text-blue-600 text-sm mb-2 break-words">{experience.company} • {experience.location}</p>
                      <div className="text-sm text-gray-600">
                        {experience.description.split('\n').map((paragraph, index) => (
                          <p key={index} className="mb-1">{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Certifications Section */}
          {certifications.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-6 text-gray-900 flex items-center">
                <div className="w-8 h-8 bg-blue-600/10 text-blue-600 flex items-center justify-center rounded-full mr-2">
                  <Award className="w-4 h-4" />
                </div>
                Licenses & Certifications
              </h2>
              <ol className="relative border-s border-gray-200 ms-2">
                {certifications.map((cert) => (
                  <li key={cert.id} className="mb-6 ms-6 last:mb-0">
                    <div className="absolute w-3 h-3 bg-blue-600 rounded-full -start-[6.5px] mt-2 border-2 border-white"></div>
                    <div>
                      <div className="grid grid-cols-[1fr_auto] gap-x-4 items-baseline print:gap-x-2">
                        <h3 className="font-semibold text-gray-900 break-words">{cert.name}</h3>
                        <time className="text-sm text-gray-500 whitespace-nowrap shrink-0">
                          {cert.current ? formatDate(cert.issueDate) : 
                           cert.expirationDate ? `${formatDate(cert.issueDate)} - ${formatDate(cert.expirationDate)}` : 
                           formatDate(cert.issueDate)}
                        </time>
                      </div>
                      <p className="text-blue-600 text-sm mb-2">{cert.organization}</p>
                      {(cert.credentialId || cert.credentialUrl) && (
                        <div className="text-sm text-gray-600">
                          {cert.credentialId && (
                            <p className="mb-1">Credential ID: {cert.credentialId}</p>
                          )}
                          {cert.credentialUrl && (
                            <a 
                              href={cert.credentialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                            >
                              View Credential
                              <Link className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Education Section */}
          <div>
            <h2 className="text-lg font-semibold mb-6 text-gray-900 flex items-center">
              <div className="w-8 h-8 bg-blue-600/10 text-blue-600 flex items-center justify-center rounded-full mr-2">
                <GraduationCap className="w-4 h-4" />
              </div>
              Education
            </h2>
            {education.length === 0 ? (
              <p className="text-gray-600">Your education details will appear here...</p>
            ) : (
              <div className="relative space-y-6">
                {/* Timeline line */}
                <div className="absolute left-[2.5px] top-2 bottom-0 w-0.5 bg-gray-200" />
                
                {education.map((edu, index) => (
                  <div key={edu.id} className="relative pl-6">
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-blue-600 z-10" />
                    
                    <div>
                      <div className="flex justify-between items-baseline mb-1 flex-wrap gap-2">
                        <h3 className="font-semibold text-gray-900">
                          {edu.degree}{edu.field && `, ${edu.field}`}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {formatDate(edu.startDate)} – {edu.current ? 'Present' : formatDate(edu.endDate || '')}
                        </span>
                      </div>
                      <p className="text-blue-600 text-sm mb-2 break-words">{edu.school} • {edu.location}</p>
                      {edu.description && (
                        <p className="text-sm text-gray-600">{edu.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
