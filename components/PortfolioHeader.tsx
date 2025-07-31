import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

interface PortfolioHeaderProps {
  nowPlaying?: string;
  showNavigation?: boolean;
}

const PortfolioHeader: React.FC<PortfolioHeaderProps> = ({ 
  nowPlaying = "Now playing: Creative Portfolio Showcase",
  showNavigation = true 
}) => {
  return (
    <HeaderContainer>
      <HeaderLeft>{nowPlaying}</HeaderLeft>
      <HeaderRight>
        {showNavigation ? (
          <Navigation>
            <NavButton href="/">Home</NavButton>
            <NavButton href="/about">About</NavButton>
            <NavButton href="/contact">Contact</NavButton>
          </Navigation>
        ) : (
          <NavButton href="/">Home</NavButton>
        )}
      </HeaderRight>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #d0d8e0;
  padding: 0.5rem 1rem;
  border-bottom: 2px solid #999;
  font-family: 'Courier New', monospace;
`;

const HeaderLeft = styled.div`
  font-size: 0.9rem;
  color: #333;
`;

const HeaderRight = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Navigation = styled.nav`
  display: flex;
  gap: 0.5rem;
`;

const NavButton = styled.a`
  background: #c0c8d0;
  border: 2px outset #c0c8d0;
  padding: 0.25rem 0.75rem;
  text-decoration: none;
  color: #333;
  font-size: 0.8rem;
  cursor: pointer;
  font-family: 'Courier New', monospace;
  
  &:hover {
    background: #b0b8c0;
  }
  
  &:active {
    border-style: inset;
  }
`;

export default PortfolioHeader;