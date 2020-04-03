/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';
import api from '~/services/api';
import history from '~/services/history';
import Pagination from '~/components/Pagination';
import Actions from '~/components/MenuActions';

import {
  Container,
  Content,
  ContentTable,
  Table,
  Mensagem,
  Header,
  DivDelivery,
  DivProblem,
  DivActions,
  TableRow,
  TextTable,
} from './styles';

export default function ListRecipient() {
  const [problems, setProblems] = useState([]);
  const [page = 1, setPage] = useState();
  const [loading = 0, setLoading] = useState();

  const dispatch = useDispatch();

  const trataError = useCallback(
    error => {
      if (error.response) {
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

  const loadProblems = useCallback(() => {
    async function load() {
      try {
        setLoading(1);
        const response = await api.get('/problems/deliveries', {
          params: {
            page,
          },
        });

        response.data.deliverysProblems.forEach(delivery => {
          setProblems(
            delivery.DeliveryProblems.map(problem => {
              return {
                delivery: delivery.id,
                descProblem: problem.description,
              };
            })
          );
        });

        setLoading(0);
      } catch (error) {
        setProblems([]);
        setLoading(0);
        trataError(error);
      }
    }
    load();
  }, [page, trataError]);

  useEffect(() => {
    loadProblems();
  }, [loadProblems]);

  return (
    <Container>
      <Content>
        <h1>Problemas na entrega</h1>
      </Content>
      <ContentTable>
        {loading ? (
          <Mensagem>
            <h1>Carregando Problemas na entrega...</h1>
          </Mensagem>
        ) : problems.length <= 0 ? (
          <Mensagem>
            <h1>Não foi encontrado nenhum problema</h1>
          </Mensagem>
        ) : (
          <Table>
            <Header>
              <DivDelivery>
                <strong>Encomenda</strong>
              </DivDelivery>
              <DivProblem>
                <strong>Nome</strong>
              </DivProblem>
              <DivActions>
                <strong>Ações</strong>
              </DivActions>
            </Header>
            {problems.map(item => (
              <TableRow key={item.delivery}>
                <DivDelivery>
                  <TextTable>#{item.delivery}</TextTable>
                </DivDelivery>
                <DivProblem>
                  <TextTable>{item.descProblem}</TextTable>
                </DivProblem>
                <DivActions>
                  <Actions Show={() => history.push(``)} Cancel={() => {}} />
                </DivActions>
              </TableRow>
            ))}
          </Table>
        )}
      </ContentTable>
      <Pagination page={page} setPage={setPage} list={problems} />
    </Container>
  );
}
