/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, useCallback } from 'react';
import { Input, Form } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { MdAdd, MdSearch } from 'react-icons/md';
import { FaCircle } from 'react-icons/fa';
import { confirmAlert } from 'react-confirm-alert';

import api from '~/services/api';
import history from '~/services/history';
import Pagination from '~/components/Pagination';
import AddButton from '~/components/Button';
import InitialName from '~/components/InitialName';
import Actions from '~/components/MenuActions';

import {
  Container,
  Content,
  Options,
  ContentTable,
  Table,
  Mensagem,
  Header,
  DivID,
  DivRecipient,
  DivDeliveryMan,
  DivCity,
  DivState,
  DivStatus,
  DivActions,
  TableRow,
  TextTable,
} from './styles';

export default function ListDelivery() {
  const [deliverys, setDeliverys] = useState([]);
  const [product = '', setProduct] = useState();
  const [page = 1, setPage] = useState();
  const [loading = 0, setLoading] = useState();

  const loadDeliveries = useCallback(() => {
    async function load() {
      try {
        setLoading(1);
        const response = await api.get('deliveries', {
          params: {
            product,
            page,
          },
        });

        setDeliverys(
          response.data.deliverys.map(delivery => {
            let status = '';
            if (delivery.end_date !== null) {
              status = 'ENTREGUE';
            } else if (delivery.canceled_at !== null) {
              status = 'CANCELADA';
            } else if (delivery.start_date !== null) {
              status = 'RETIRADA';
            } else {
              status = 'PENDENTE';
            }
            delivery = {
              ...delivery,
              status,
            };
            return delivery;
          })
        );
        setLoading(0);
      } catch (err) {
        setDeliverys([]);
        setLoading(0);
      }
    }
    load();
  }, [page, product]);

  useEffect(() => {
    loadDeliveries();
  }, [page, product, loadDeliveries]);

  function handleSearch({ productSearch }) {
    setProduct(productSearch);
  }

  async function handleDelete(deliveryDelete) {
    try {
      const response = await api.delete(`deliveries/${deliveryDelete.id}`);
      if (response.status !== 200) {
        toast.warn('Não foi possível excluir a encomenda!');
      } else {
        toast.success('Encomenda excluida com sucesso!');
        loadDeliveries();
      }
    } catch (error) {
      console.error(error);
      console.tron.log(error);
      toast.error('Erro para excluir a encomenda.');
    }
  }

  function confirmDelete(deliveryDelete) {
    confirmAlert({
      title: 'Exclusão',
      message: 'Deseja excluir a encomenda?',
      buttons: [
        {
          label: 'Apagar',
          onClick: () => {
            handleDelete(deliveryDelete);
          },
        },
        {
          label: 'Cancelar',
          onClick: () => toast.warn('Exclusão Cancelada!'),
        },
      ],
    });
  }

  return (
    <Container>
      <Content>
        <h1>Gerenciando encomendas</h1>
        <Options>
          <Form onSubmit={handleSearch}>
            <span>
              <MdSearch size={22} color="#999999" />
            </span>
            <Input name="productSearch" placeholder="Buscar encomendas" />
          </Form>
          <AddButton
            title="CADASTRAR"
            loading={loading}
            IconButton={MdAdd}
            type="button"
            onClick={() => {
              history.push('/delivery/store');
            }}
          />
        </Options>
      </Content>
      <ContentTable>
        {loading ? (
          <Mensagem>
            <h1>Carregando Encomendas...</h1>
          </Mensagem>
        ) : deliverys.length <= 0 ? (
          <Mensagem>
            <h1>Não foi encontrado nenhuma encomenda</h1>
          </Mensagem>
        ) : (
          <Table>
            <Header>
              <DivID>
                <strong>ID</strong>
              </DivID>
              <DivRecipient>
                <strong>Destinatário</strong>
              </DivRecipient>
              <DivDeliveryMan>
                <strong>Entregador</strong>
              </DivDeliveryMan>
              <DivCity>
                <strong>Cidade</strong>
              </DivCity>
              <DivState>
                <strong>Estado</strong>
              </DivState>
              <DivStatus>
                <strong>Status</strong>
              </DivStatus>
              <DivActions>
                <strong>Ações</strong>
              </DivActions>
            </Header>
            {deliverys.map(item => (
              <TableRow key={item.id}>
                <DivID>
                  <TextTable>#{item.id}</TextTable>
                </DivID>
                <DivRecipient>
                  <TextTable>{item.recipient.name}</TextTable>
                </DivRecipient>
                <DivDeliveryMan>
                  <div className="delivery_deliveryman">
                    {item.deliveryman.avatar ? (
                      <img
                        src={item.deliveryman.avatar.url}
                        alt={item.deliveryman.name}
                      />
                    ) : (
                      <InitialName name={item.deliveryman.name} size={35} />
                    )}
                    <TextTable>{item.deliveryman.name}</TextTable>
                  </div>
                </DivDeliveryMan>
                <DivCity>
                  <TextTable>{item.recipient.city}</TextTable>
                </DivCity>
                <DivState>
                  <TextTable>{item.recipient.state}</TextTable>
                </DivState>
                <DivStatus>
                  <div className={`delivery_status ${item.status}`}>
                    <TextTable>
                      <FaCircle size={12} />
                    </TextTable>
                    <TextTable>{item.status}</TextTable>
                  </div>
                </DivStatus>
                <Actions
                  Show={() => history.push('/delivery/store')}
                  Edit={() => history.push('/delivery/store')}
                  Delete={() => confirmDelete(item)}
                />
              </TableRow>
            ))}
          </Table>
        )}
      </ContentTable>
      <Pagination page={page} setPage={setPage} list={deliverys} />
    </Container>
  );
}
