import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0px auto;
`;

export const Content = styled.div`
  max-width: 1200px;
  margin: 20px;

  form {
    input {
      width: 237px;
      height: 36px;
      background: #ffffff;
      border: 1px solid #dddddd;
      box-sizing: border-box;
      border-radius: 4px;
      padding-left: 40px;
      ::placeholder {
        font-size: 14px;
        line-height: 16px;
        color: #999999;
      }
    }

    span {
      position: absolute;
      margin-left: 10px;
      margin-top: 8px;
    }
  }
`;

export const Options = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ContentTable = styled.div`
  background: #fff;
  border-radius: 4px;
  width: auto;
  max-width: 1200px;
  padding: 25px;
  margin: 20px;
`;

export const Table = styled.table`
  width: 100%;
  max-width: 1200px;
  tr {
    padding: 15px 0;
  }
  th {
    text-align: left;
    strong {
      font-size: 16px;
      line-height: 19px;
      color: #444444;
    }
  }
  tr:hover {
    border-bottom: 1px solid #eeeeee;
  }
  td {
    border-bottom: 1px solid #eeeeee;
    padding: 15px 0;
    text-align: left;

    p {
      font-size: 16px;
      line-height: 20px;
      color: #666666;
    }

    .delivery_status {
      border-radius: 15px;
      width: min-content;
      padding: 4px 6px 2px 6px;
      font-weight: bold;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      p:first-child {
        margin-right: 4px;
      }
    }

    .PENDENTE {
      background-color: #f0f0df;
      p {
        font-size: 14px;
        color: #c1bc35;
      }
    }

    .ENTREGUE {
      background-color: #dff0df;
      p {
        font-size: 14px;
        color: #2ca42b;
      }
    }

    .CANCELADA {
      background-color: #fab0b0;
      p {
        font-size: 14px;
        color: #de3b3b;
      }
    }

    .RETIRADA {
      background-color: #bad2ff;
      p {
        font-size: 14px;
        color: #4d85ee;
      }
    }

    .delivery_deliveryman {
      border-radius: 15px;
      width: min-content;
      padding: 4px 6px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        border: 1px solid rgba(255, 255, 255, 0.3);
        background: #eee;
        margin-right: 5px;
      }
    }

    .deliveryman_init {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      border: 1px solid rgba(255, 255, 255, 0.3);
      align-items: center;
      p {
        color: ${Math.floor(Math.random() * 16777215).toString(16)};
        font-size: 20px;
      }
    }
  }
  tr:last-child td {
    border-bottom: 0px;
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 0;
  h1 {
    font-size: 24px;
    line-height: 20px;
    color: #666666;
  }
`;
