import React, { ChangeEvent } from 'react';
import './text-input.scss';

type Props = {
  value: string,
  valueType: ValueType,
  onChange: (inputValue: string) => void,
  inputId: string,
  isDisabled?: boolean,
  isRequired?: boolean
  placeholderText?: string,
  children: string
}

type ValueType = 'text' | 'number';

const getPattern = (valueType: ValueType) => {
  switch(valueType) {
    case('text'): return '^[A-Za-zА-Яа-яЁё]+$';
    case('number'): return '[0-9]+';
  }
};

const TextInput = ({ value, valueType, placeholderText, inputId, onChange, isDisabled = false, isRequired = false, children }: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="text-input__wrapper">
      <label className="text-input__label" htmlFor={inputId}>
        {children}
      </label>
      <input
        className="text-input__input"
        type="text"
        name={`${inputId}-input`}
        id={inputId}
        placeholder={placeholderText}
        value={value}
        pattern={getPattern(valueType)}
        onChange={handleChange}
        disabled={isDisabled}
      />
      {isRequired && <p className="text-input__is-required-alert">Поле обязательно для заполнения</p>}
    </div>
  );
};

export default TextInput;
