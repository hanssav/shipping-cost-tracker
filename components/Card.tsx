import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 12px;
`;

type CardProps = {
  title: string;
  children: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ title, children }) => (
  <CardContainer>
    <Title>{title}</Title>
    {children}
  </CardContainer>
);

export default Card;
