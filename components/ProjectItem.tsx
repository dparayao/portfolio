import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Project } from '../context/ProjectProvider';

interface ProjectItemProps {
  projectSlug: string;
  projectObject: Project;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ projectSlug, projectObject }) => {
  const { title, category, techStack, demoMedia, projectUrl, githubUrl } = projectObject;
  
  // Get the first demo media item as the cover image
  const coverImage = demoMedia && demoMedia.length > 0 ? demoMedia[0] : null;

  return (
    <ProjectCard>
        <ImageContentContainer>
            <Link href={`/project/${projectSlug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ImageContainer>
            {coverImage ? (
                <CoverImage 
                src={coverImage.file.url} 
                alt={coverImage.altText || title}
                />
            ) : (
                <PlaceholderImage>
                <span>No Image</span>
                </PlaceholderImage>
            )}
            <CategoryBadge>{category}</CategoryBadge>
            </ImageContainer>
            </Link>
        
        <ContentContainer>
            <Link href={`/project/${projectSlug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ProjectTitle>{title}</ProjectTitle>
            </Link>
            
            <TechStack>{techStack}</TechStack>
        </ContentContainer>
      </ImageContentContainer>
    </ProjectCard>
  );
};

// Styled Components
const ProjectCard = styled.div`
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const ImageContentContainer = styled.div`
  display: grid;
  grid-template-columns: 7fr 13fr;

  /* Mobile responsive layout */
  @media (max-width: 480px) {
    height: 100%;
  }
  
  /* Very small screens - stack vertically */
  @media (max-width: 350px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 100%;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
  cursor: pointer;
  margin-left: 2%;
  margin-right: 10%;

  @media (max-width: 480px) {
    height: 100%;
    margin-left: 1%;
    margin-right: 5%;
  }
  
  @media (max-width: 350px) {
    height: 100%;
    margin: 0;
    width: 100%;
  }
`;

const CoverImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const PlaceholderImage = styled.div`
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 1rem;
`;

const CategoryBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  text-transform: capitalize;
`;

const ContentContainer = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: grid;
  grid-template-rows: 50% 50%;
  border: 1px solid rgb(0, 0, 0);
  background: rgb(240, 240, 240);
  min-width: 0; 

  @media (max-width: 480px) {
    grid-template-rows: 55% 45%;
    padding: .5rem; 
    height: 60%;
}
`;

const ProjectTitle = styled.h3`
  font-size: 2.5rem;
  margin: 2rem 0 0.5rem 0;
  color: #333;
  cursor: pointer;
  line-height: 1.2;
  
  @media (max-width: 480px) {
    font-size: 1.4rem !important;
    margin: 1rem 0 0.25rem 0 !important;
    line-height: 1.1 !important;
  }
  
  @media (max-width: 350px) {
    font-size: 1.2rem !important;
    margin: 0.25rem 0 0.25rem 0 !important;
  }
  
  &:hover {
    color: #0066cc;
  }
`;


const TechStack = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
  flex: 1;
  word-wrap: break-word;
  overflow-wrap: break-word;
  line-height: 1.4;

  @media (max-width: 480px) {
    font-size: 0.75rem !important;
    margin: 0.25rem 0 0.5rem 0 !important;
    line-height: 1.3 !important;
  }
  
  @media (max-width: 350px) {
    font-size: 0.7rem !important;
    margin: 0.25rem 0 0.25rem 0 !important;
  }
`;


export default ProjectItem;