import React, { useState } from 'react';
import styled from 'styled-components';
import { Project } from '../context/ProjectProvider';
import NotFound from './NotFound';
import ProjectImage from './ProjectImage';
import DocumentField from './DocumentField';

type ProjectViewProps = {
  projectSlug: string;
  project: Project;
};

const ProjectView: React.FC<ProjectViewProps> = ({ projectSlug, project }) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [showInspiration, setShowInspiration] = useState(false);
  const [inspirationMode, setInspirationMode] = useState<'design' | 'development'>('design');

  if (!project) {
    return <NotFound />
  }

  const {
    title,
    category,
    techStack,
    projectUrl,
    githubUrl,
    demoMedia,
    inspirationMedia,
    developmentProcess,
    designInspiration
  } = project;

  const hasDemo = demoMedia && demoMedia.length > 0;
  const hasInspiration = inspirationMedia && inspirationMedia.length > 0;

  const nextMedia = () => {
    if (hasDemo) {
      setCurrentMediaIndex((prevIndex) => 
        Math.min(demoMedia.length - 1, prevIndex + 1)
      );
    }
  };

  const prevMedia = () => {
    setCurrentMediaIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const toggleInspiration = (mode: 'design' | 'development') => {
    setInspirationMode(mode);
    setShowInspiration(true);
  };

  const closeInspiration = () => {
    setShowInspiration(false);
  };

  return (
    <>
        <MainBottomContainer>
      <MainContent>
        <ImageSection>
          {hasDemo ? (
            <MainImageContainer>
              <ProjectImage 
                src={demoMedia[currentMediaIndex].file.url}
                alt={demoMedia[currentMediaIndex].altText || title}
              />
              <ImageOverlay>
                <InspButton onClick={() => toggleInspiration('design')}>
                  insp + design
                </InspButton>
              </ImageOverlay>
              {demoMedia.length > 1 && (
                <>
                  <NavButton left onClick={prevMedia} disabled={currentMediaIndex === 0}>
                    ←
                  </NavButton>
                  <NavButton right onClick={nextMedia} disabled={currentMediaIndex === demoMedia.length - 1}>
                    →
                  </NavButton>
                </>
              )}
            </MainImageContainer>
          ) : (
            <NoImagePlaceholder>No demo available</NoImagePlaceholder>
          )}
        </ImageSection>

        <InfoSection>
          <InfoBox>
            <InfoText>click the elements to learn more about the project!</InfoText>
            
            <ButtonContainer>
              <InfoButton onClick={() => toggleInspiration('development')}>
                development<br />process
              </InfoButton>
              <InfoButton onClick={() => toggleInspiration('design')}>
                demo videos !
              </InfoButton>
            </ButtonContainer>
        
          </InfoBox>
        </InfoSection>
      </MainContent>

      <BottomInfo>
        <ProjectTitle>{title.toUpperCase()}</ProjectTitle>
        <TechStackText>Tech stack: {techStack}</TechStackText>
      </BottomInfo>
    </MainBottomContainer>

      {/* Inspiration Overlay */}
      {showInspiration && (
        <OverlayContainer>
          <OverlayContent>
            <OverlayHeader>
              <HeaderLeft>Now playing: Attention - New Jeans</HeaderLeft>
              <HeaderRight>
                <HomeButton href="/">Home</HomeButton>
              </HeaderRight>
            </OverlayHeader>
            
            <OverlayMain>
              {/* Left Side - Images */}
              <OverlayImages>
                {inspirationMode === 'design' && hasInspiration ? (
                  inspirationMedia.slice(0, 3).map((media, index) => (
                    <OverlayImage key={media.id}>
                      <img src={media.file.url} alt={media.altText || title} />
                    </OverlayImage>
                  ))
                ) : hasDemo ? (
                  demoMedia.slice(0, 3).map((media, index) => (
                    <OverlayImage key={media.id}>
                      <img src={media.file.url} alt={media.altText || title} />
                    </OverlayImage>
                  ))
                ) : (
                  <OverlayImage>
                    <div>No images available</div>
                  </OverlayImage>
                )}
              </OverlayImages>

              {/* Right Side - Text Content */}
              <OverlayTextArea>
                {inspirationMode === 'design' && designInspiration?.document ? (
                  <DocumentField document={designInspiration.document} />
                ) : inspirationMode === 'development' && developmentProcess?.document ? (
                  <DocumentField document={developmentProcess.document} />
                ) : (
                  <div>No content available for {inspirationMode}</div>
                )}
              </OverlayTextArea>
            </OverlayMain>

            <BackButton onClick={closeInspiration}>
              BACK
            </BackButton>
          </OverlayContent>
        </OverlayContainer>
      )}
    </>
  );
};

// Styled Components
const MainBottomContainer = styled.div`
  display: grid;
  grid-template-rows: 90%;
`;

const MainContent = styled.div`
  background: #e8e8e8;
`;

const ImageSection = styled.div`
  position: relative;
`;

const MainImageContainer = styled.div`
  position: relative;
  border: 2px solid #666;
  overflow: hidden;
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const InspButton = styled.button`
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #666;
  padding: 0.5rem;
  font-size: 0.8rem;
  cursor: pointer;
  
  &:hover {
    background: rgba(255, 255, 255, 1);
  }
`;

const NavButton = styled.button<{ left?: boolean; right?: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.left ? 'left: 10px;' : ''}
  ${props => props.right ? 'right: 10px;' : ''}
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  cursor: pointer;
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const NoImagePlaceholder = styled.div`
  height: 200px;
  background: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #666;
  color: #666;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoBox = styled.div`
  background: #f5f5f5;
  border: 2px inset #f5f5f5;
  padding: 1rem;
  height: 100%;
`;

const InfoText = styled.p`
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  color: #333;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const InfoButton = styled.button`
  background: #b8c8d8;
  border: 2px outset #b8c8d8;
  padding: 0.75rem;
  font-size: 0.8rem;
  cursor: pointer;
  text-align: left;
  
  &:hover {
    background: #a8b8c8;
  }
`;

const BottomInfo = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: #e8e8e8;
  border: 3px inset #e8e8e8;
  padding: 1rem 1.5rem;
`;

const ProjectTitle = styled.h1`
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
  color: #333;
  font-weight: bold;
`;

const TechStackText = styled.p`
  margin: 0;
  color: #333;
  font-size: 0.9rem;
`;

// Overlay Styles (keep header for modal)
const OverlayContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OverlayContent = styled.div`
  width: 90%;
  max-width: 1000px;
  height: 80%;
  background: #f0f0f0;
  border: 3px outset #f0f0f0;
  display: flex;
  flex-direction: column;
`;

const OverlayHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #d0d8e0;
  padding: 0.5rem 1rem;
  border-bottom: 2px solid #999;
`;

const HeaderLeft = styled.div`
  font-size: 0.9rem;
  color: #333;
`;

const HeaderRight = styled.div``;

const HomeButton = styled.a`
  background: #c0c8d0;
  border: 2px outset #c0c8d0;
  padding: 0.25rem 0.75rem;
  text-decoration: none;
  color: #333;
  font-size: 0.8rem;
  cursor: pointer;
  
  &:hover {
    background: #b0b8c0;
  }
`;

const OverlayMain = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 300px 1fr;
  background-image: 
    linear-gradient(rgba(0,0,0,.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,.1) 1px, transparent 1px);
  background-size: 20px 20px;
`;

const OverlayImages = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: #d8d8d8;
  border-right: 2px solid #999;
`;

const OverlayImage = styled.div`
  border: 2px solid #666;
  background: white;
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
  
  div {
    padding: 2rem;
    text-align: center;
    color: #666;
  }
`;

const OverlayTextArea = styled.div`
  background: #e0f0ff;
  padding: 2rem;
  overflow-y: auto;
  font-size: 0.9rem;
  line-height: 1.6;
`;

const BackButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #c0c8d0;
  border: 2px outset #c0c8d0;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.8rem;
  
  &:hover {
    background: #b0b8c0;
  }
`;

export default ProjectView;