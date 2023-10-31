import React, { useState, ChangeEvent } from 'react';

type DefaultInput = React.InputHTMLAttributes<HTMLInputElement>;

export interface Props {
  name: DefaultInput['name'];
  defaultValue?: DefaultInput['value'];
  onChange: (e) => void;
  data: {
    label: string;
    value: DefaultInput['value'];
    el: React.ReactNode | string;
  }[];
}

const Radios = ({ name, defaultValue, onChange, data }: Props) => {
  const [selected, setSelected] = useState(defaultValue ?? data[0].value);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange(value);
    setSelected(value);
  };

  return (
    <fieldset data-testid="fieldset">
      {data.map(({ label, value, el }, index) => (
        <label key={index} data-testid="label">
          <input
            type="radio"
            aria-label={label}
            name={name}
            value={value}
            checked={value === selected}
            onChange={handleChange}
          />
          <span />
          {el}
        </label>
      ))}
    </fieldset>
  );
};

export default Radios;
