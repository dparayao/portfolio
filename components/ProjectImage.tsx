import React from 'react';
import styled from 'styled-components';

interface ProjectImageProps {
  src: string;
  alt: string;
  caption?: string;
}

const ProjectImage: React.FC<ProjectImageProps> = ({ src, alt, caption }) => {
  return (
    <ImageContainer>
      <Image src={src} alt={alt} />
      {caption && <Caption>{caption}</Caption>}
    </ImageContainer>
  );
};

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
`;

const Image = styled.img`
  max-width: 60%;
  max-height: 60vh;
  object-fit: contain;
  border-radius: 4px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const Caption = styled.p`
  margin-top: 1rem;
  font-style: italic;
  color: #666;
  text-align: center;
`;

export default ProjectImage;