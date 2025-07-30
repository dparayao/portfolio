import React from 'react';
import styled from 'styled-components';

interface PrevButtonProps {
  prev: () => void;
  next: () => void;
  photoIndex: number;
  totalPhotos: number;
}

const PrevButton: React.FC<PrevButtonProps> = ({ prev, photoIndex }) => {
  const isDisabled = photoIndex === 1;

  return (
    <Button onClick={prev} disabled={isDisabled}>
      ←
    </Button>
  );
};

const Button = styled.button`
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

export default PrevButton;