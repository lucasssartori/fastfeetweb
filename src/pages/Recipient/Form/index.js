import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { MdArrowBack, MdSave } from 'react-icons/md';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { signOut } from '~/store/modules/auth/actions';
import api from '~/services/api';
import history from '~/services/history';

import {
  Container,
  HeaderPage,
  BackButton,
  SaveButton,
  ContentForm,
  InputName,
  InputStreet,
  InputNumber,
  InputComplement,
  InputCity,
  InputState,
  InputZipcode,
  Form,
} from './styles';

export default function StoreDeliveryMan() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [titleForm, setTitle] = useState();
  const [recipient, setRecipient] = useState();

  const formRef = useRef(null);

  const trataError = useCallback(
    error => {
      if (error.response.status) {
        switch (error.response.status) {
          case 400:
            toast.error(error.response.data.error);
            break;
          case 401:
            toast.error(error.response.data.error);
            dispatch(signOut());
            break;
          default:
            toast.error('Erro inesperado do sistema');
        }
      } else {
        toast.error('Erro inesperado do sistema');
      }
    },
    [dispatch]
  );

  useEffect(() => {
    async function loadDeliveryMan() {
      try {
        if (id) {
          setTitle('Edição de destinatários');
          const response = await api.get(`recipients/${id}`);

          setRecipient(response.data.recipient);
        } else {
          setTitle('Cadastro de destinatários');
        }
      } catch (error) {
        setTitle('Cadastro de destinatários');
        trataError(error);
      }
    }
    loadDeliveryMan();
  }, [id, trataError]);

  async function handleSubmitAdd(data) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string().required('O email é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { name, email, avatar } = data;

      if (id) {
        const response = await api.put(`recipients/${id}`, {
          name,
          email,
          avatar_id: avatar,
        });

        if (response.status === 200) {
          toast.success('Destinatário atualizado com sucesso!');
          history.push('/recipient/list');
        } else {
          toast.warn('Não foi possível atualizar o destinatário!');
        }
      } else {
        const response = await api.post(`recipient`, {
          name,
          email,
          avatar_id: avatar,
        });

        if (response.status === 200) {
          toast.success('Destinatário cadastrado com sucesso!');
          history.push('/recipient/list');
        } else {
          toast.warn('Não foi possível cadastrar o destinatário!');
        }
      }
    } catch (errors) {
      const validationErrors = {};
      if (errors instanceof Yup.ValidationError) {
        errors.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      } else {
        trataError(errors);
      }
    }
  }

  return (
    <Container>
      <HeaderPage>
        <h1>{titleForm}</h1>
        <div>
          <BackButton
            title="VOLTAR"
            IconButton={MdArrowBack}
            type="button"
            onClick={() => {
              history.push('/recipient/list');
            }}
          />
          <SaveButton
            title="SALVAR"
            IconButton={MdSave}
            type="submit"
            form="recipient"
          />
        </div>
      </HeaderPage>
      <ContentForm>
        <Form
          initialData={recipient}
          ref={formRef}
          id="recipient"
          onSubmit={handleSubmitAdd}
        >
          <InputName
            label="Nome"
            name="name"
            placeholder="Digite o nome completo"
          />
          <InputStreet
            label="Rua"
            name="street"
            placeholder="Digite seu endereço"
          />
          <InputNumber label="Número" name="number" type="number" />
          <InputComplement label="Complemento" name="complement" />
          <InputCity label="Cidade" name="city" />
          <InputState label="Estado" name="state" />
          <InputZipcode label="CEP" name="zipcode" />
        </Form>
      </ContentForm>
    </Container>
  );
}
