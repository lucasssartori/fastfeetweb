/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, useCallback } from 'react';
import { Input, Form } from '@rocketseat/unform';
// import { toast } from 'react-toastify';
import { MdAdd, MdSearch } from 'react-icons/md';
import { FaCircle } from 'react-icons/fa';
import { transparentize } from 'polished';

import api from '~/services/api';
import history from '~/services/history';
import Pagination from '~/components/Pagination';
import NewButton from '~/components/Button';

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
            const names = delivery.deliveryman.name.split(' ');

            let init = '';
            if (names.length > 1) {
              init = names[0].substring(0, 1) + names[1].substring(0, 1);
            } else {
              init = names[0].substring(0, 2);
            }

            const red = Math.floor(Math.random() * 256);
            const green = Math.floor(Math.random() * 256);
            const blue = Math.floor(Math.random() * 256);
            const colorStyle = `rgb(${red},${green},${blue})`;

            const backgorundStyle = transparentize(0.9, colorStyle);

            delivery = {
              ...delivery,
              status,
              init,
              colorStyle,
              backgorundStyle,
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
          <NewButton
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
                  <p>#{item.id}</p>
                </ID>
                <Recipient>
                  <p>{item.recipient.name}</p>
                </Recipient>
                <DeliveryMan>
                  <div className="delivery_deliveryman">
                    {item.deliveryman.avatar ? (
                      <img
                        src={item.deliveryman.avatar.url}
                        alt={item.deliveryman.name}
                      />
                    ) : (
                      <div style={{ backgroundColor: item.backgorundStyle }}>
                        <p style={{ color: item.colorStyle }}>{item.init}</p>
                      </div>
                    )}
                    <p>{item.deliveryman.name}</p>
                  </div>
                </DeliveryMan>
                <City>
                  <p>{item.recipient.city}</p>
                </City>
                <State>
                  <p>{item.recipient.state}</p>
                </State>
                <Status>
                  <div className={`delivery_status ${item.status}`}>
                    <p>
                      <FaCircle size={12} />
                    </p>
                    <p>{item.status}</p>
                  </div>
                </Status>
                <Actions>
                  <p>...</p>
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
