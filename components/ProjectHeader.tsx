import React from 'react';
import styled from 'styled-components';
import PortfolioHeader from './PortfolioHeader';

interface ProjectHeaderProps {
  projectTitle?: string;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({ projectTitle }) => {
  const nowPlayingText = projectTitle 
    ? `Now viewing: ${projectTitle}` 
    : "Now viewing: Project Details";

  return (
    <Container>
      <PortfolioHeader 
        nowPlaying={nowPlayingText}
        showNavigation={false}
      />
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 2rem;
`;

export default ProjectHeader;