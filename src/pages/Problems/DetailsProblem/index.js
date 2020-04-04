import React from 'react';
import PropTypes from 'prop-types';

import { Modal, ModalContent, TextModal } from './styles';

export default function DetailsProblem({ problem, close }) {
  return (
    <Modal onClick={close}>
      <ModalContent>
        <strong>VISUALIZAR PROBLEMA</strong>
        <TextModal>{problem.descProblem}</TextModal>
      </ModalContent>
    </Modal>
  );
}

DetailsProblem.propTypes = {
  problem: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
};
