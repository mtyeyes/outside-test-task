import React, { ReactNode } from 'react';
import './fieldset.scss';

type Props = {
  children: ReactNode;
  legend?: string;
};

const Fieldset = ({ legend, children }: Props) => {
  return (
    <fieldset className="fieldset">
      {legend !== undefined && <legend className="fieldset__legend">{legend}</legend>}
      {children}
    </fieldset>
  );
};

export default Fieldset;
