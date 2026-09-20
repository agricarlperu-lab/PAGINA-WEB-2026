import React from 'react';

interface EditableTextProps {
  value: string;
  onChange?: (newValue: string) => void;
  isEditingEnabled?: boolean;
  multiline?: boolean;
  className?: string;
  placeholder?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  className = '',
  placeholder = '',
  as: Component = 'span',
}) => {
  return <Component className={className}>{value || placeholder}</Component>;
};
