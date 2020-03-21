/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, useCallback } from 'react';
import { Input, Form } from '@rocketseat/unform';
// import { toast } from 'react-toastify';
import { MdAdd, MdSearch, MdMoreHoriz } from 'react-icons/md';
import { FaCircle } from 'react-icons/fa';

import api from '~/services/api';
import history from '~/services/history';
import Pagination from '~/components/Pagination';
import AddButton from '~/components/Button';
import InitialName from '~/components/InitialName';

import {
  Container,
  Content,
  Options,
  ContentTable,
  Table,
  Mensagem,
  Header,
  ID,
  Recipient,
  DeliveryMan,
  City,
  State,
  Status,
  Actions,
  TableRow,
  BtnAction,
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

  async function handleSearch({ productSearch }) {
    await setProduct(productSearch);
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
              <ID>
                <strong>ID</strong>
              </ID>
              <Recipient>
                <strong>Destinatário</strong>
              </Recipient>
              <DeliveryMan>
                <strong>Entregador</strong>
              </DeliveryMan>
              <City>
                <strong>Cidade</strong>
              </City>
              <State>
                <strong>Estado</strong>
              </State>
              <Status>
                <strong>Status</strong>
              </Status>
              <Actions>
                <strong>Ações</strong>
              </Actions>
            </Header>
            {deliverys.map(item => (
              <TableRow key={item.id}>
                <ID>
                  <TextTable>#{item.id}</TextTable>
                </ID>
                <Recipient>
                  <TextTable>{item.recipient.name}</TextTable>
                </Recipient>
                <DeliveryMan>
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
                </DeliveryMan>
                <City>
                  <TextTable>{item.recipient.city}</TextTable>
                </City>
                <State>
                  <TextTable>{item.recipient.state}</TextTable>
                </State>
                <Status>
                  <div className={`delivery_status ${item.status}`}>
                    <TextTable>
                      <FaCircle size={12} />
                    </TextTable>
                    <TextTable>{item.status}</TextTable>
                  </div>
                </Status>
                <Actions>
                  <BtnAction type="button">
                    <MdMoreHoriz size={22} color="#999999" />
                  </BtnAction>
                </Actions>
              </TableRow>
            ))}
          </Table>
        )}
      </ContentTable>
      <Pagination page={page} setPage={setPage} list={deliverys} />
    </Container>
  );
}
