import React from 'react';
import { Route, useHistory, useRouteMatch } from 'react-router-dom';
import './home.scss';

import ButtonWithBackground from '../../components/button/button-with-background/button-with-background';
import ModalWindow from '../../components/modal-window/modal-window';
import TaxReturn from '../../components/tax-return/tax-return';
import Icon from '../../components/icon/icon';

const Home = () => {
  const history = useHistory();

  const taxReturnLink = '/tax-return';

  return (
    <>
      <section className="modal-toggler__wrapper">
        <ButtonWithBackground component="link" to={taxReturnLink} className="modal-toggler__btn" background="blank">Налоговый вычет</ButtonWithBackground>
      </section>
      <Route
        path={taxReturnLink}
        children={({ match }) => {
          return (
            <ModalWindow closeModal={history.goBack} isOpen={Boolean(match)}>
              {console.log(match)}
              <TaxReturn />
            </ModalWindow>
          );
        }}
      />
    </>
  );
};

export default Home;
