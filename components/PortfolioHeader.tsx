import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const PortfolioHeader: React.FC = () => {
  return (
    <HeaderContainer>
      <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <Title>Portfolio</Title>
      </Link>
      <Navigation>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/about">About</NavLink>
        <NavLink href="/contact">Contact</NavLink>
      </Navigation>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  border-bottom: 1px solid #e0e0e0;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin: 0;
  cursor: pointer;
`;

const Navigation = styled.nav`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.2s ease;
  
  &:hover {
    color: #0066cc;
  }
`;

export default PortfolioHeader;