import React from 'react';
import styled from 'styled-components';

interface NextButtonProps {
  prev: () => void;
  next: () => void;
  photoIndex: number;
  totalPhotos: number;
}

const NextButton: React.FC<NextButtonProps> = ({ next, photoIndex, totalPhotos }) => {
  const isDisabled = photoIndex === totalPhotos;

  return (
    <NextButtonStyled onClick={next} disabled={isDisabled}>
      →
    </NextButtonStyled>
  );
};

const NextButtonStyled = styled.button`
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background: rgba(0, 0, 0, 0.7);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

export default NextButton;