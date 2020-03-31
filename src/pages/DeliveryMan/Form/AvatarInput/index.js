import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@rocketseat/unform';
import api from '~/services/api';
import InitialName from '~/components/InitialName';

import { Container, LabelAvatar, ImgAvatar } from './styles';

export default function AvatarInput({ initialName }) {
  const { defaultValue, registerField } = useField('avatar');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'avatar_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref, registerField]);

  useEffect(() => {
    if (defaultValue) {
      setPreview(defaultValue.url);
      setFile(defaultValue.id);
    }
  }, [defaultValue]);

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  return (
    <Container>
      <LabelAvatar htmlFor="avatar">
        {preview ? (
          <ImgAvatar src={preview} alt={initialName} />
        ) : (
          <InitialName name={initialName} size={150} />
        )}

        <input
          type="file"
          id="avatar"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </LabelAvatar>
    </Container>
  );
}

AvatarInput.propTypes = {
  initialName: PropTypes.string,
};

AvatarInput.defaultProps = {
  initialName: 'NA',
};
