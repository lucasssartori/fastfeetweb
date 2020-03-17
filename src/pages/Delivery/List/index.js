import React, { useEffect, useState, useCallback } from 'react';
import { Input, Form } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { MdAdd, MdSearch } from 'react-icons/md';

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
  Row,
} from './styles';

export default function ListDelivery() {
  const [deliverys, setDeliverys] = useState([]);
  const [product = '', setProduct] = useState();
  const [page = 1, setPage] = useState();
  const [loading = false, setLoading] = useState();

  const loadDeliveries = useCallback(() => {
    async function load() {
      try {
        setLoading(true);
        const response = await api.get('deliveries', {
          params: {
            product,
            page,
          },
        });

        setDeliverys(response.data.deliverys);
        setLoading(false);
      } catch (err) {
        setDeliverys([]);
        setLoading(false);
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
          <Row>
            <h1>Carregando Encomendas...</h1>
          </Row>
        ) : deliverys.length <= 0 ? (
          <Row>
            <h1>Não foi encontrado nenhuma encomenda</h1>
          </Row>
        ) : (
          <Table>
            <thead>
              <tr>
                <th className="colLeft">
                  <strong>ID</strong>
                </th>
                <th className="colLeft">
                  <strong>Destinatário</strong>
                </th>
                <th>
                  <strong>Entregador</strong>
                </th>
                <th>
                  <strong>Cidade</strong>
                </th>
                <th>
                  <strong>Estado</strong>
                </th>
                <th>
                  <strong>Status</strong>
                </th>
                <th>
                  <strong>Ações</strong>
                </th>
              </tr>
            </thead>
            <tbody>
              {deliverys.map(item => (
                <tr key={item.id}>
                  <td>
                    <p>#{item.id}</p>
                  </td>
                  <td>
                    <p>{item.recipient.name}</p>
                  </td>
                  <td>
                    <p>{item.deliveryman.name}</p>
                  </td>
                  <td>
                    <p>{item.recipient.city}</p>
                  </td>
                  <td>
                    <p>{item.recipient.state}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </ContentTable>
      <Pagination page={page} setPage={setPage} list={deliverys} />
    </Container>
  );
}
