import React from 'react';
import styled from 'styled-components';
import PortfolioHeader from './PortfolioHeader';
import ProjectBack from './ProjectBack';

const ProjectHeader: React.FC = () => {
  return (
    <Container>
      <PortfolioHeader />
      <BackContainer>
        <ProjectBack />
      </BackContainer>
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 2rem;
`;

const BackContainer = styled.div`
  padding: 1rem 2rem;
`;

export default ProjectHeader;