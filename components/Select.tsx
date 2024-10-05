import React, { useEffect, useState } from "react";
import styled from "styled-components";

const StyledLabel = styled.label`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #4a4a4a;
`;

const StyledDropdownWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledSearchInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  outline: none;

  &:focus {
    border-color: #3b82f6;
  }
`;

const StyledSelectOptions = styled.ul`
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  background-color: white;
  position: absolute;
  width: 100%;
  z-index: 1;
  list-style-type: none;
  padding-left: 0;
`;

const StyledOption = styled.li<{ isSelected: boolean }>`
  padding: 0.75rem;
  background-color: ${(props) => (props.isSelected ? "#3b82f6" : "white")};
  color: ${(props) => (props.isSelected ? "white" : "#000")};
  cursor: pointer;

  &:hover {
    background-color: #1e40af;
    color: white;
  }
`;

type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  id?: string;
  disabled?: boolean;
};

const StyledSelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const SelectWithSearch: React.FC<SelectProps> = ({
  label,
  options,
  onChange,
  id,
  disabled,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleOptionClick = (value: string) => {
    setSelectedOption(value);
    onChange(value);
    setIsOpen(false);
  };

  const clearSelection = () => {
    setSelectedOption("");
    onChange("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      clearSelection();
    }
  };

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (isOpen && (e.key === "Backspace" || e.key === "Delete")) {
        clearSelection();
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);

    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [isOpen]);

  return (
    <StyledSelectWrapper>
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
      <StyledDropdownWrapper>
        <StyledSearchInput
          id={id}
          value={
            selectedOption
              ? options.find((opt) => opt.value === selectedOption)?.label || ""
              : searchTerm
          }
          onClick={() => setIsOpen(!isOpen)}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          disabled={disabled}
          onKeyDown={handleKeyDown}
        />
        {isOpen && !disabled && (
          <StyledSelectOptions>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <StyledOption
                  key={option.value}
                  isSelected={selectedOption === option.value}
                  onClick={() => handleOptionClick(option.value)}
                >
                  {option.label}
                </StyledOption>
              ))
            ) : (
              <StyledOption isSelected={false}>No options found</StyledOption>
            )}
          </StyledSelectOptions>
        )}
      </StyledDropdownWrapper>
    </StyledSelectWrapper>
  );
};

export default SelectWithSearch;
