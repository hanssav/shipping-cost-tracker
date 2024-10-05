import React from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  margin-bottom: 16px;
`;

const InputField = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
`;

type InputProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
};

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  type = "text",
}) => (
  <InputContainer>
    <Label>{label}</Label>
    <InputField value={value} onChange={onChange} type={type} />
  </InputContainer>
);

export default Input;
