import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const ProjectBack: React.FC = () => {
  const router = useRouter();

  const handleBack = () => {
    router.push('/');
  };

  return (
    <BackButton onClick={handleBack}>
      ← Back to Portfolio
    </BackButton>
  );
};

const BackButton = styled.button`
  background: none;
  border: 1px solid #ddd;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f5f5f5;
    border-color: #bbb;
  }
`;

export default ProjectBack;