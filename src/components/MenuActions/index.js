import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  MdMoreHoriz,
  MdEdit,
  MdDeleteForever,
  MdVisibility,
} from 'react-icons/md';

import {
  Container,
  ActionsMenu,
  ListActions,
  ActionMenu,
  BtnAction,
} from './styles';

export default function MenuActions({ Show, Edit, Delete }) {
  const [visible, setVisible] = useState(false);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  function handleShow() {
    setVisible(!visible);
    Show();
  }

  function handleEdit() {
    setVisible(!visible);
    Edit();
  }

  function handleDelete() {
    setVisible(!visible);
    Delete();
  }

  return (
    <Container
      onBlur={() => setVisible(false)}
      onMouseLeave={() => setVisible(false)}
    >
      <BtnAction type="button" onClick={handleToggleVisible}>
        <MdMoreHoriz size={18} color="#999999" />
      </BtnAction>

      <ActionsMenu visible={visible}>
        <ListActions>
          {Show && (
            <ActionMenu onClick={handleShow}>
              <MdVisibility size={18} color="#8E5BE8" />
              <p>Visualizar</p>
            </ActionMenu>
          )}
          {Edit && (
            <ActionMenu onClick={handleEdit}>
              <MdEdit size={18} color="#4D85EE" />
              <p>Editar</p>
            </ActionMenu>
          )}
          {Delete && (
            <ActionMenu onClick={handleDelete}>
              <MdDeleteForever size={18} color="#DE3B3B" />
              <p>Excluir</p>
            </ActionMenu>
          )}
        </ListActions>
      </ActionsMenu>
    </Container>
  );
}

MenuActions.propTypes = {
  Show: PropTypes.func,
  Edit: PropTypes.func,
  Delete: PropTypes.func,
};

MenuActions.defaultProps = {
  Show: null,
  Edit: null,
  Delete: null,
};
