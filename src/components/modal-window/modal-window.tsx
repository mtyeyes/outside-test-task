import React, { ReactNode } from 'react';
import './modal-window.scss';

import conditionalClassName from '../../utils/conditional-classname';
import ModalScreenblock from '../modal-screenblock/modal-screenblock';
import IconButton from '../button/icon-button/icon-button';
import HiddenText from '../hidden-text/hidden-text';

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  children: ReactNode;
};

const ModalWindow = ({ isOpen, closeModal, children }: Props) => {
  const wrapperClassName = conditionalClassName({
    staticClassName: 'modal-window',
    conditionalClassNames: {
      'modal-window--open': isOpen,
    },
  });

  return (
    <>
      <ModalScreenblock isOpen={isOpen} closeModal={closeModal} />
      <div className={wrapperClassName}>
        {children}
        <IconButton iconId="close" className="modal-window__btn-close" onClick={closeModal}>
          <HiddenText>Закрыть окно</HiddenText>
        </IconButton>
      </div>
    </>
  );
};

export default ModalWindow;
