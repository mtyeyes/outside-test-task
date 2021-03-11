import React from 'react';
import './home.scss';

import ButtonWithBackground from '../../components/button/button-with-background/button-with-background';

const Home = () => {
  return (
    <section className="modal-toggler__wrapper">
      <ButtonWithBackground className="modal-toggler__btn" background="blank">Налоговый вычет</ButtonWithBackground>
    </section>
  );
};

export default Home;
