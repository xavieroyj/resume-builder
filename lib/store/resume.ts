import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PersonalInfo {
  fullName: string;
  professionalTitle: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  summary: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface Certification {
  id: string;
  name: string;
  organization: string;
  issueDate: string;
  expirationDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  current: boolean;
}

export type TemplateType = 'minimal' | 'classic' | 'modern';

interface ResumeState {
  selectedTemplate: TemplateType;
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  certifications: Certification[];
  updatePersonalInfo: (info: PersonalInfo) => void;
  setTemplate: (template: TemplateType) => void;
  addWorkExperience: (experience: Omit<WorkExperience, "id">) => void;
  updateWorkExperience: (id: string, experience: Partial<WorkExperience>) => void;
  removeWorkExperience: (id: string) => void;
  addEducation: (education: Omit<Education, "id">) => void;
  updateEducation: (id: string, education: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addSkill: (skill: Omit<Skill, "id">) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  addCertification: (certification: Omit<Certification, "id">) => void;
  updateCertification: (id: string, certification: Partial<Certification>) => void;
  removeCertification: (id: string) => void;
}

const initialState: Omit<ResumeState, keyof Pick<ResumeState, 
  | "updatePersonalInfo" 
  | "setTemplate"
  | "addWorkExperience" 
  | "updateWorkExperience" 
  | "removeWorkExperience"
  | "addEducation"
  | "updateEducation"
  | "removeEducation"
  | "addSkill"
  | "updateSkill"
  | "removeSkill"
  | "addCertification"
  | "updateCertification"
  | "removeCertification"
>> = {
  selectedTemplate: 'minimal',
  personalInfo: {
    fullName: "",
    professionalTitle: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    summary: "",
  },
  workExperience: [],
  education: [],
  skills: [],
  certifications: [],
};

export const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
      ...initialState,
      updatePersonalInfo: (info) => set({ personalInfo: info }),
      setTemplate: (template) => set({ selectedTemplate: template }),
      addWorkExperience: (experience) =>
        set((state) => ({
          workExperience: [
            ...state.workExperience,
            { ...experience, id: crypto.randomUUID() },
          ],
        })),
      updateWorkExperience: (id, experience) =>
        set((state) => ({
          workExperience: state.workExperience.map((exp) =>
            exp.id === id ? { ...exp, ...experience } : exp
          ),
        })),
      removeWorkExperience: (id) =>
        set((state) => ({
          workExperience: state.workExperience.filter((exp) => exp.id !== id),
        })),
      addEducation: (education) =>
        set((state) => ({
          education: [
            ...state.education,
            { ...education, id: crypto.randomUUID() },
          ],
        })),
      updateEducation: (id, education) =>
        set((state) => ({
          education: state.education.map((edu) =>
            edu.id === id ? { ...edu, ...education } : edu
          ),
        })),
      removeEducation: (id) =>
        set((state) => ({
          education: state.education.filter((edu) => edu.id !== id),
        })),
      addSkill: (skill) =>
        set((state) => ({
          skills: [...state.skills, { ...skill, id: crypto.randomUUID() }],
        })),
      updateSkill: (id, skill) =>
        set((state) => ({
          skills: state.skills.map((s) =>
            s.id === id ? { ...s, ...skill } : s
          ),
        })),
      removeSkill: (id) =>
        set((state) => ({
          skills: state.skills.filter((s) => s.id !== id),
        })),
      addCertification: (certification) =>
        set((state) => ({
          certifications: [
            ...state.certifications,
            { ...certification, id: crypto.randomUUID() },
          ],
        })),
      updateCertification: (id, certification) =>
        set((state) => ({
          certifications: state.certifications.map((cert) =>
            cert.id === id ? { ...cert, ...certification } : cert
          ),
        })),
      removeCertification: (id) =>
        set((state) => ({
          certifications: state.certifications.filter((cert) => cert.id !== id),
        })),
    }),
    {
      name: 'resume-storage',
    }
  )
); 