import React from 'react';
import styled from 'styled-components';

interface ProjectNavProps {
  prev: () => void;
  next: () => void;
  photoIndex: number;
  totalPhotos: number;
}

const ProjectNav: React.FC<ProjectNavProps> = ({ prev, next, photoIndex, totalPhotos }) => {
  if (totalPhotos <= 1) return null;

  return (
    <NavContainer>
      <NavButton onClick={prev} disabled={photoIndex === 1}>
        Previous
      </NavButton>
      <Counter>
        {photoIndex} of {totalPhotos}
      </Counter>
      <NavButton onClick={next} disabled={photoIndex === totalPhotos}>
        Next
      </NavButton>
    </NavContainer>
  );
};

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

const NavButton = styled.button`
  background: #0066cc;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover:not(:disabled) {
    background: #0052a3;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const Counter = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

export default ProjectNav;