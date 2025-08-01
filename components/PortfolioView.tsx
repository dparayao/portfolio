import React from 'react';
import styled from 'styled-components';
import ProjectItem from './ProjectItem';
import { ProjectsHashmap } from '../context/ProjectProvider';

interface PortfolioViewProps {
  projects: ProjectsHashmap;
}

const PortfolioView: React.FC<PortfolioViewProps> = ({ projects }) => {
  if (projects === undefined) {
    console.log("projects undefined");
    return (
        <div>Loading projects...</div>
    );
  }

  const projectEntries = Object.entries(projects);
  
  if (projectEntries.length === 0) {
    return (
        <EmptyState>No projects found</EmptyState>
    );
  }

  const listProjects = projectEntries.map(([slug, project], index) => (
    <ProjectItemWrapper key={slug}>
      <ProjectItem projectSlug={slug} projectObject={project} />
    </ProjectItemWrapper>
  ));

  return (
      <PortfolioContainer>
        <ProjectsGrid>{listProjects}</ProjectsGrid>
      </PortfolioContainer>
  );
};

// Styled Components
const PortfolioContainer = styled.div`
  min-height: 100vh;
  padding: 5%; /* Add padding for mobile spacing */
  
  @media (max-width: 480px) {
    padding: 2%; /* Reduce padding on mobile */
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  /* WEBKIT OPTIMIZATIONS: */
  @supports (-webkit-appearance: none) {
    /* Optimize for WebKit's grid performance */
    transform: translateZ(0);
    will-change: transform;
    contain: layout style;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    max-width: 100%;
    
    /* WebKit mobile optimization */
    @supports (-webkit-appearance: none) {
      gap: 0.5rem;
    }
  }
`;

const ProjectItemWrapper = styled.div`
  border: 1px solid rgb(0, 0, 0);
  overflow: hidden;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out, background-color 0.2s ease-in-out;
  width: 70%;
  margin: auto;
  background-color: #D9D9D9; 
  padding: 2%;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    background-color: #B0D1DF;
  }

  @media (max-width: 480px) {
    width: 95%; 
    margin: 0 auto 1rem auto; 
    padding: 2%;
    height: 60%;
  }
  
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem;
  color: #666;
  font-size: 1.2rem;

  @media (max-width: 480px) {
    padding: 2rem;
    font-size: 1rem;
  }
`;

export default PortfolioView;