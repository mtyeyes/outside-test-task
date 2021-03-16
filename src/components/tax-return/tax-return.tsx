import React from 'react';
import './tax-return.scss';

import TaxReturnForm from './tax-return-form/tax-return-form';

const TaxReturn = () => {
  return (
    <section className="tax-return__container">
      <h1 className="tax-return__heading">Налоговый вычет</h1>
      <p className="tax-return__text">Используйте налоговый вычет чтобы погасить ипотеку досрочно. Размер налогового вычета составляет не более 13% от своего официального годового дохода.</p>
      <TaxReturnForm className="modal-tax-return-form" />
    </section>
  );
};

export default TaxReturn;
