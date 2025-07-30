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
`;

const ImageContentContainer = styled.div`
   display: grid;
   grid-template-columns: 35% 65%;
   margin: 2%;
`;

const ImageContainer = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
  cursor: pointer;
  margin-left: 2%;
  margin-right: 10%;
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
  flex-direction: column;
  grid-template-rows: 60%;
  border: 1px solid rgb(0, 0, 0);
  background:rgb(240, 240, 240);
`;

const ProjectTitle = styled.h3`
  font-size: 2.5rem;
  margin: 2rem 0 0.5rem 0;
  color: #333;
  cursor: pointer;
  
  &:hover {
    color: #0066cc;
  }
`;

const TechStack = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
  flex: 1;
`;

export default ProjectItem;