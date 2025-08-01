import React, { useState } from 'react';
import styled from 'styled-components';
import { Project } from '../context/ProjectProvider';
import NotFound from './NotFound';
import ProjectImage from './ProjectImage';
import DocumentField from './DocumentField';
import PortfolioHeader from './PortfolioHeader';

type ProjectViewProps = {
  projectSlug: string;
  project: Project;
};

const ProjectView: React.FC<ProjectViewProps> = ({ projectSlug, project }) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [showInspiration, setShowInspiration] = useState(false);
  const [inspirationMode, setInspirationMode] = useState<'design' | 'development' | 'demo'>('design');

  if (!project) {
    return <NotFound />
  }

  const {
    title,
    techStack,
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

  const toggleInspiration = (mode: 'design' | 'development' | 'demo') => {
    setInspirationMode(mode);
    setShowInspiration(true);
  };

  const closeInspiration = () => {
    setShowInspiration(false);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    // Close overlay when clicking the background
    if (e.target === e.currentTarget) {
      closeInspiration();
    }
  };

  const handleContentClick = (e: React.MouseEvent) => {
    // Prevent clicks inside content from closing the overlay
    e.stopPropagation();
  };

  return (
    <>
    <PortfolioHeader></PortfolioHeader>
    <MainBottomContainer>
      <MainContent>
  
        <OverlayHeader>
          <HeaderLeft></HeaderLeft>
          <HeaderRight>
            <BackHomeButton href="/">BACK</BackHomeButton>
          </HeaderRight>
        </OverlayHeader>

        <InfoSection>
          <LayeredContainer>
            {/* Background images with z-index 1 */}
            <ImageContainer>
              <SquareImage imageUrl={hasInspiration ? inspirationMedia[currentMediaIndex]?.file?.url : undefined} className="image1" />
              <SquareImage imageUrl={hasDemo ? demoMedia[currentMediaIndex]?.file?.url : undefined} className="image2" />
            </ImageContainer>
            
            {/* Button overlay with z-index 10 */}
            <ButtonContainer>
              <ControlButton className="insp-btn" onClick={() => toggleInspiration('design')}>insp + design</ControlButton>
              <HelpText className="desc-text">click the elements to learn more about the project!</HelpText>
              <ControlButton className="demo-btn" onClick={() => toggleInspiration('demo')}>demo videos !</ControlButton>
              <ControlButton className="develop-btn" onClick={() => toggleInspiration('development')}>development process</ControlButton>
            </ButtonContainer>
          </LayeredContainer>
        </InfoSection>
      </MainContent>

      <BottomInfo>
        <ProjectTitle>{title.toUpperCase()}</ProjectTitle>
        <TechStackText>Tech stack: {techStack}</TechStackText>
      </BottomInfo>
    </MainBottomContainer>

      {/* Inspiration Overlay */}
      {showInspiration && (
        <OverlayContainer onClick={handleOverlayClick}>
          <OverlayContent onClick={handleContentClick} mode={inspirationMode}>
            <OverlayMain mode={inspirationMode}>
              {(inspirationMode === 'design' || inspirationMode === 'demo') && (
                <OverlayImages>
                  {inspirationMode === 'design' && hasInspiration ? (
                    inspirationMedia.slice(0, 3).map((media, index) => (
                      <OverlayImage key={media.id}>
                        <img src={media.file.url} alt={media.altText || title} />
                      </OverlayImage>
                    ))
                  ) : inspirationMode === 'demo' && hasDemo ? (
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
              )}
              
              {(inspirationMode === 'design' || inspirationMode === 'development') && (
                <OverlayTextArea>
                  {inspirationMode === 'design' && designInspiration?.document ? (
                    <DocumentField document={designInspiration.document} />
                  ) : inspirationMode === 'development' && developmentProcess?.document ? (
                    <DocumentField document={developmentProcess.document} />
                  ) : (
                    <div>No content available for {inspirationMode}</div>
                  )}
                </OverlayTextArea>
              )}
            </OverlayMain>
          </OverlayContent>
        </OverlayContainer>
      )}
    </>
  );
};

// Styled Components
const MainBottomContainer = styled.div`
  display: grid;
  grid-template-rows: 80% 20%;
  width: 45%;
  margin: auto;
  margin-top: 3%;
  padding: 0% 2% 2% 2%;
  background:rgb(246, 246, 246);
  border: .3rem solid #73899D;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.49);

  /* Tablet adjustments */
  @media (max-width: 650px) {
    width: 80%;
    grid-template-rows: 60% 40%;
  }
`;

const MainContent = styled.div`
  padding-left: 4%;
  padding-right: 4%;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const LayeredContainer = styled.div`
  position: relative;
  width: 100%;
  height: 40vh;
`;

const ImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 115%;
  display: grid;
  grid-template-columns: 50% 50%;
  z-index: 1;
`;

const SquareImage = styled.div<{ imageUrl?: string }>`
  aspect-ratio: 1 / 1;
  background-color: #d0d0d0;
  background-image: url(${props => props.imageUrl || 'none'});
  background-size: cover;
  background-position: center;
  transition: all 0.3s ease;
  
  /* Loading state when no image */
  ${props => !props.imageUrl && `
    background-image: radial-gradient(circle, #999 2px, transparent 2px);
    &::after {
      content: "Loading...";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #666;
      font-size: 12px;
      font-weight: bold;
    }
  `}
  
  /* Image 1 - top left corner */
  &.image1 {
    width: 18vw;
    height: 18vw;
    align-self: start;
    justify-self: start;

    /* Tablet adjustments */
    @media (max-width: 650px) {
      width: 27vw;
      height: 20vw;
    }
  }
  
  /* Image 2 - bottom right corner */
  &.image2 {
    width: 18vw;
    height: 18vw;
    align-self: end;
    justify-self: end;

    /* Tablet adjustments */
    @media (max-width: 650px) {
      width: 28vw;
      height: 24vw;
    }
  }
  
  ${LayeredContainer}:has(.insp-btn:hover) &.image1 {
    transform: translateY(-1px);
    box-shadow: 0 0 15px 5px rgba(184, 225, 240, 0.7);
  }
  ${LayeredContainer}:has(.demo-btn:hover) &.image2 {
    transform: translateY(-1px);
    box-shadow: 0 0 15px 5px rgba(184, 225, 240, 0.7);
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 58%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  grid-template-areas: 
    "insp insp desc"
    "develop demo demo";
  grid-template-columns: minmax(90px, 1fr) minmax(90px, 1fr) minmax(70px, 1fr);
  grid-template-rows: auto auto;
  align-items: stretch;
  width: 100%;
  height: 115%;
  z-index: 10;

  /* Tablet adjustments */
  @media (max-width: 650px) {
    height: 120%;
  }
  
  /* Mobile adjustments */
  @media (max-width: 450px) {
  }
`;

const ControlButton = styled.button`
  background: #B0D1DF;
  cursor: pointer;
  font-size: clamp(.5rem, 2.5vw, 1.3rem);
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: left;
  padding: clamp(3%, 1vw, 5%);
  transition: all 0.2s ease;
  border: none;
  color: #3B3E42;
  min-height: 20px;
  
  &:hover {
    background: #A8CDDD;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
  
  &.insp-btn { 
    grid-area: insp; 
    height: clamp(30px, 40%, 80px); 
    width: clamp(100px, 50%, 200px); 
    margin: auto; 
  }
  &.develop-btn { 
    grid-area: develop; 
    width: clamp(115px, 16vw, 350px);
    height: clamp(50px, 8vh, 80px); 
    margin-top: auto; 
    text-align: left;
  }
  &.demo-btn { 
    grid-area: demo;  
    width: clamp(80px, 60%, 160px); 
    height: clamp(30px, 40%, 80px); 
    margin: auto;
  }
`;

const HelpText = styled.div`
  grid-area: desc;
  display: flex;
  font-size: .8rem;
  color: #3B3E42;
  text-align: right;
  font-style: italic;

  /* Tablet adjustments */
  @media (max-width: 650px) {
    font-size: .55rem;
  }

  /* Mobile adjustments */
  @media (max-width: 450px) {
    font-size: .45rem;
  }
`;

const BottomInfo = styled.div`
  display: grid;
  grid-template-rows: 60% 40%;

  /* Tablet adjustments */
  @media (max-width: 650px) {
    padding-top: 5%;
  }
`;

const ProjectTitle = styled.h1`
  font-size: 2rem;
  color: #3B3E42;
  font-weight: bold;
  text-shadow: -2px 1px rgb(171, 199, 232);

  /* Tablet adjustments */
  @media (max-width: 650px) {
    font-size: 1.8rem;
  }

  /* Mobile adjustments */
  @media (max-width: 450px) {
    font-size: 1.5rem;
  }
`;

const TechStackText = styled.p`
  color: #3B3E42;
  font-size: 0.9rem;

  @media (max-width: 650px) {
    font-size: .8rem;
    margin: 0;
  }

  @media (max-width: 650px) {
    font-size: .6rem;
    margin: 0;
  }
`;

// Overlay Styles
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
  cursor: pointer;
`;

const OverlayContent = styled.div<{ mode: string }>`
  width: ${props => 
    props.mode === 'demo' ? '80%' : 
    props.mode === 'development' ? '80%' : 
    '90%'};
  max-width: ${props => 
    props.mode === 'demo' ? '30%' : 
    props.mode === 'development' ? '800px' : 
    '1000px'};
  height: ${props => 
    props.mode === 'demo' ? '100%' : 
    props.mode === 'development' ? '70%' : 
    '80%'};
  display: flex;
  flex-direction: column;
  cursor: default;
`;

const OverlayHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1%;
  width: 105%;
`;

const HeaderLeft = styled.div`
  font-size: 0.9rem;
  color: #333;
`;

const HeaderRight = styled.div``;

const BackHomeButton = styled.a`
  padding: 0.25rem 0.75rem;
  text-decoration: none;
  color: #333;
  font-size: 0.8rem;
  cursor: pointer;
`;

const OverlayMain = styled.div<{ mode: string }>`
  flex: 1;
  display: grid;
  grid-template-columns: ${props => 
    props.mode === 'demo' ? '1fr' : 
    props.mode === 'development' ? '1fr' : 
    '300px 1fr'};
  height: 50%;
`;
const OverlayImages = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const OverlayImage = styled.div`
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

  /* Custom scrollbar styling to match the background */
  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: #c8dae8;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #8bb3cc;
    border-radius: 6px;
    border: 2px solid #c8dae8;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #7aa3bb;
  }

  /* Firefox scrollbar styling */
  scrollbar-width: thin;
  scrollbar-color: #8bb3cc #c8dae8;
`;

export default ProjectView;