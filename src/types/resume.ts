export interface PersonalInfo {
  name: string;
  email: string;
  github?: string;
  linkedin?: string;
  summary: string;
}

export interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string[];
  techStack?: string;
}

export interface Project {
  name: string;
  liveUrl?: string;
  githubUrl?: string;
  description: string;
  purpose: string;
  techStack: {
    frontend?: string;
    backend?: string;
  };
}

export interface Education {
  institution: string;
  degree: string;
  duration: string;
  location?: string;
}

export interface ResumeData {
  personal: PersonalInfo;
  experience: Experience[];
  projects: Project[];
  education: Education[];
}