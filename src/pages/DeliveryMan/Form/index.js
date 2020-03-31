import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { MdArrowBack, MdSave } from 'react-icons/md';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { signOut } from '~/store/modules/auth/actions';
import api from '~/services/api';
import history from '~/services/history';
import AvatarInput from './AvatarInput';

import {
  Container,
  HeaderPage,
  BackButton,
  SaveButton,
  ContentForm,
} from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string().required('O email é obrigatório'),
});

export default function StoreDeliveryMan() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [titleForm, setTitle] = useState();
  const [deliveryman, setDeliveryman] = useState();
  const [initialName, setInitialName] = useState();

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
          setTitle('Edição de entregadores');
          const response = await api.get(`deliveryman/${id}`);

          setDeliveryman(response.data.deliveryMan);
          setInitialName(response.data.deliveryMan.name);
        } else {
          setTitle('Cadastro de entregadores');
        }
      } catch (error) {
        setTitle('Cadastro de entregadores');
        trataError(error);
      }
    }
    loadDeliveryMan();
  }, [id, trataError]);

  async function handleSubmitAdd(data) {
    console.log(data);
    /*
    try {
      if (id) {
        const response = await api.put(`deliveryman/${id}`, {
          name,
          email,
          avatar_id,
        });

        if (response.status === 200) {
          toast.success('Entregador atualizado com sucesso!');
          history.push('/deliveryman/list');
        } else {
          toast.warn('Não foi possível atualizar o entregador!');
        }
      } else {
        const response = await api.post(`deliveryman`, {
          name,
          email,
          avatar_id,
        });

        if (response.status === 200) {
          toast.success('Entregador cadastrado com sucesso!');
          history.push('/deliveryman/list');
        } else {
          toast.warn('Não foi possível cadastrar o entregador!');
        }
      }
    } catch (error) {
      trataError(error);
    }
    */
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
              history.push('/deliveryman/list');
            }}
          />
          <SaveButton
            title="SALVAR"
            IconButton={MdSave}
            type="submit"
            form="deliveryman"
          />
        </div>
      </HeaderPage>
      <ContentForm>
        <Form
          initialData={deliveryman}
          schema={schema}
          id="deliveryman"
          onSubmit={handleSubmitAdd}
        >
          <div>
            <AvatarInput name="avatar_id" initialName={initialName} />
          </div>
          <label htmlFor="name">Nome</label>
          <Input
            name="name"
            placeholder="Digite o nome completo"
            onChange={e => setInitialName(e.target.value)}
          />
          <label htmlFor="email">Email</label>
          <Input
            name="email"
            type="email"
            placeholder="Digite seu endereço de e-mail"
          />
        </Form>
      </ContentForm>
    </Container>
  );
}
