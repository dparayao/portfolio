import React, { useState, ReactNode, useContext } from 'react';

// Types for the portfolio
export type MediaItem = {
  id: string;
  title: string;
  type: 'image' | 'gif' | 'video';
  file: {
    url: string;
  };
  caption?: string;
  altText?: string;
};

export type Project = {
  id: string;
  title: string;
  slug: string;
  category: string;
  techStack: string;
  projectUrl?: string;
  githubUrl?: string;
  developmentProcess?: any; // Document field from Keystone
  designInspiration?: any; // Document field from Keystone
  demoMedia: MediaItem[];
  inspirationMedia: MediaItem[];
  createdAt: string;
};

export type ProjectsHashmap = {
  [slug: string]: Project;
};

interface ProjectsContextType {
  projects: ProjectsHashmap | null;
  setProjects: (projects: ProjectsHashmap) => void;
  currentProject: Project | null;
  setCurrentProject: (project: Project | null) => void;
}

const ProjectsContext = React.createContext<ProjectsContextType | undefined>(undefined);

interface ProjectsProviderProps {
  children: ReactNode;
}

export const ProjectsProvider: React.FC<ProjectsProviderProps> = ({ children }) => {
  const [projects, setProjects] = useState<ProjectsHashmap | null>(null);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  return (
    <ProjectsContext.Provider value={{ 
      projects, 
      setProjects, 
      currentProject, 
      setCurrentProject 
    }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error('useProjects only allowed within a ProjectsProvider component');
  }
  return context;
};