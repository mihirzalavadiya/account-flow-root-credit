import React from 'react';

interface ButtonProps {
  type: 'back' | 'continue';
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ type, text, onClick, disabled }) => {
  const className = type === 'back' ? 'btn-back' : 'btn-continue';

  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
