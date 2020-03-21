import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { transparentize } from 'polished';

import { Container, Name } from './styles';

export default function InitialName({ name, size }) {
  const [color, setColor] = useState();
  const [background, setBackground] = useState();
  const [initilName, setInitialName] = useState();

  useEffect(() => {
    const names = name.split(' ');

    if (names.length > 1) {
      setInitialName(names[0].substring(0, 1) + names[1].substring(0, 1));
    } else {
      setInitialName(names[0].substring(0, 2));
    }

    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const colorStyle = `rgb(${red},${green},${blue})`;
    const backgorundStyle = transparentize(0.9, colorStyle);

    setColor(colorStyle);
    setBackground(backgorundStyle);
  }, [name]);

  return (
    <Container size={size} style={{ background }}>
      <Name size={size} style={{ color }} className="initial">
        {initilName}
      </Name>
    </Container>
  );
}

InitialName.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};
