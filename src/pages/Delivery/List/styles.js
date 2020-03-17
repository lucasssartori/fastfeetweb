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
    text-align: center;
    p {
      font-size: 16px;
      line-height: 20px;
      color: #666666;
    }
  }
  tr:last-child td {
    border-bottom: 0px;
  }
  .colLeft {
    text-align: left;
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
