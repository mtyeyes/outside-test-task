import React, { ChangeEvent, ReactNode } from 'react';
//importing visually-hidden class
import '../../../index.scss';

import conditionalClassName from '../../../utils/conditional-classname';

export type Props = {
  type: 'checkbox' | 'radio'
  isChecked: boolean,
  onChange: (isToggled: boolean, inputId: string) => void,
  groupName: string,
  id: string,
  isDisabled?: boolean,
  children?: ReactNode,
  inputClassName?: string,
  labelClassName?: string,
  wrapperClassName?: string,
}

const ToggleableInput = ({ type, isChecked, onChange, groupName, id, isDisabled, children, inputClassName, labelClassName }: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked, id);
  };

  const inputClass = conditionalClassName({
    staticClassName: 'visually-hidden',
    conditionalClassNames: {
      [inputClassName || '']: inputClassName !== undefined
    }
  });

  return (
    <>
      <input
        className={inputClass}
        type={type}
        name={groupName}
        id={id}
        checked={isChecked}
        onChange={handleChange}
        disabled={isDisabled}
      />
      <label className={labelClassName} htmlFor={id}>
        {children}
      </label>
    </>
  );
};

export default ToggleableInput;
