import React, { useState, ChangeEvent } from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  flexible?: boolean;
  onChange: (e) => void;
}

const Radio = ({ children, defaultChecked, onChange, ...rest }: Props) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e.target.value);
    // setIsChecked(e.target.value === );
  };

  return (
    <label data-testid="label">
      <input type="radio" {...rest} checked={isChecked} onChange={handleChange} />
      <span />
      {children}
    </label>
  );
};

export default Radio;
