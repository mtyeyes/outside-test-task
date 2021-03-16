import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import './home.scss';

import ButtonWithBackground from '../../components/button/button-with-background/button-with-background';
import ModalWindow from '../../components/modal-window/modal-window';
import TaxReturn from '../../components/tax-return/tax-return';

const Home = () => {
  const history = useHistory();

  const modalTaxReturnLink = '/tax-return';

  return (
    <>
      <section className="modal-toggler__wrapper">
        <ButtonWithBackground component="link" to={modalTaxReturnLink} className="modal-toggler__btn" background="blank">Налоговый вычет</ButtonWithBackground>
      </section>
      <Route
        path={modalTaxReturnLink}
        children={({ match }) => {
          return (
            <ModalWindow closeModal={history.goBack} isOpen={Boolean(match)}>
              <TaxReturn />
            </ModalWindow>
          );
        }}
      />
    </>
  );
};

export default Home;
