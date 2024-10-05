import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button<{ disabled?: boolean }>`
  background-color: ${(props) => (props.disabled ? '#ccc' : '#3b82f6')};
  color: white;
  padding: 0.85rem 2.5rem;
  border-radius: 2rem;
  border: none;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: ${(props) => (!props.disabled ? '#1e40af' : '#ccc')};
    transform: ${(props) => (!props.disabled ? 'scale(1.05)' : 'none')};
  }
`;

type ButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled }) => (
  <StyledButton onClick={onClick} disabled={disabled}>
    {label}
  </StyledButton>
);

export default Button;
