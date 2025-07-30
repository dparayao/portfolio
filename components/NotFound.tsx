import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const NotFound: React.FC = () => {
  return (
    <Container>
      <Title>404 - Not Found</Title>
      <Message>The page you're looking for doesn't exist.</Message>
      <Link href="/">
        <BackLink>← Back to Portfolio</BackLink>
      </Link>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  text-align: center;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #333;
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
`;

const BackLink = styled.a`
  color: #0066cc;
  text-decoration: none;
  font-size: 1.1rem;
  padding: 0.75rem 1.5rem;
  border: 2px solid #0066cc;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: #0066cc;
    color: white;
  }
`;

export default NotFound;