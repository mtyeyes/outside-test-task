import React, { useRef, useEffect } from 'react';
import './modal-screenblock.scss';

import conditionalClassName from '../../utils/conditional-classname';

type Props = {
  isOpen: boolean,
  closeModal: () => void
}

type EventKeyup = {
  key: string,
}

const ModalScreenblock = ({ isOpen, closeModal }: Props) => {
  const screenblock = useRef<HTMLDivElement>(null);
  const screenblockClass = conditionalClassName({
    staticClassName: 'modal-screenblock',
    conditionalClassNames: {
      'modal-screenblock--show': isOpen
    }
  })

  const closeModalByClick = (e: React.MouseEvent<HTMLDivElement>) => { if (e.target === screenblock.current) { closeModal() } };
  const closeModalByEsc = (e: EventKeyup) => { if (e.key === 'Escape') { closeModal() } };

  useEffect(()=>{
    if(isOpen) {
      document.addEventListener('keyup', closeModalByEsc);
    }
    return () => {
      document.removeEventListener('keyup', closeModalByEsc);
    };
  }, [isOpen]);

  return <div className={screenblockClass} ref={screenblock} role="button" onClick={closeModalByClick} />
};

export default ModalScreenblock;
