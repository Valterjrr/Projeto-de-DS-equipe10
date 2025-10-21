/**
 * TypeScript types for CV Generator API
 * Auto-generated from app/schemas/cv.py
 */

// Request Types
export interface CVRequest {
  full_name: string;
  desired_role: string;
  email?: string | null;
  phone?: string | null;
  professional_experience: string;
  education: string;
  skills: string;
  target_job_description?: string | null;
}

// Response Types
export interface LearningResource {
  title: string;
  url: string;
  type: string; // e.g., "course", "tutorial", "documentation"
  platform: string; // e.g., "Coursera", "Udemy", "YouTube"
  description: string;
}

export interface SkillAnalysis {
  skill_name: string;
  required_by_job: boolean;
  user_has_skill: boolean;
  proficiency_level?: string | null; // e.g., "basic", "intermediate", "advanced"
  gap_description?: string | null;
}

export interface SkillStatus {
  name: string;
  has_skill: boolean;
}

export interface JobCompatibilityAnalysis {
  compatibility_score: number; // 0-100
  skills: SkillStatus[];
  improvement_suggestions: string[];
  learning_resources: LearningResource[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  email?: string | null;
  phone?: string | null;
}

export interface ExperienceEntry {
  title: string;
  company: string;
  period: string;
  achievements: string[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  period: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface GeneratedCV {
  personal_info: PersonalInfo;
  professional_summary: string;
  experience_entries: ExperienceEntry[];
  education_entries: EducationEntry[];
  skills: string[];
  achievements?: string[] | null;
  certifications?: string[] | null;
  languages?: Language[] | null;
}

export interface CVResponse {
  generated_cv: GeneratedCV;
  job_compatibility?: JobCompatibilityAnalysis | null;
}

// Example data for testing (optional)
export const exampleCVRequest: CVRequest = {
  full_name: "Maria Silva Santos",
  desired_role: "Desenvolvedora Full Stack",
  email: "mariasilva@email.com",
  phone: "11987654321",
  professional_experience: "Experiência como desenvolvedora...",
  education: "Formação acadêmica...",
  skills: "Habilidades técnicas e soft skills...",
  target_job_description: "Descrição da vaga desejada (opcional)",
};

export const exampleCVResponse: CVResponse = {
  generated_cv: {
    personal_info: {
      name: "Maria Silva",
      title: "Desenvolvedora Full Stack Senior",
      email: "maria@email.com",
      phone: "11987654321",
    },
    professional_summary: "Desenvolvedora Full Stack com 5 anos...",
    experience_entries: [
      {
        title: "Desenvolvedora Full Stack Senior",
        company: "TechBR",
        period: "2022 - Presente",
        achievements: [
          "Liderou equipe de 5 desenvolvedores...",
          "Implementou CI/CD pipeline...",
        ],
      },
    ],
    education_entries: [
      {
        degree: "Bacharel em Ciência da Computação",
        institution: "UFMG",
        period: "2017 - 2021",
      },
    ],
    skills: ["Python (Avançado)", "React (Intermediário)", "AWS (Básico)"],
  },
  job_compatibility: {
    compatibility_score: 85.5,
    skills: [
      { name: "Python", has_skill: true },
      { name: "React", has_skill: true },
      { name: "Kubernetes", has_skill: false },
    ],
    improvement_suggestions: [
      "Considere aprofundar seus conhecimentos em containers com Kubernetes",
      "Aprenda GraphQL para complementar suas habilidades em APIs",
    ],
    learning_resources: [
      {
        title: "Kubernetes for Developers",
        url: "https://example.com/course",
        type: "course",
        platform: "Udemy",
        description: "Curso completo de Kubernetes...",
      },
    ],
  },
};
