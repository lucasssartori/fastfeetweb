import styled from 'styled-components';
import { Form as Unform } from '@unform/web';

import Button from '~/components/Button';
import Input from '~/components/SimpleInput';

export const Container = styled.div`
  width: 900px;
  margin: 20px auto;
`;

export const HeaderPage = styled.div`
  width: 900px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  div {
    display: flex;
    justify-content: space-between;
  }
`;

export const BackButton = styled(Button)`
  width: 112px;
  padding: 0 15px;
  margin-right: 16px;
  background: #cccccc;
`;

export const SaveButton = styled(Button)`
  width: 112px;
  padding: 0 15px;
`;

export const ContentForm = styled.div`
  width: 900px;
  border-radius: 6px;
  background-color: #fff;
  padding: 26px 30px;

  label {
    font-size: 14px;
    line-height: 19px;
    font-weight: bold;
  }

  input {
    border: 1px solid #dddddd;
    border-radius: 4px;
    width: 100%;
    height: 45px;
    margin-top: 9px;
    padding: 0 10px;
  }

  input {
    margin-bottom: 18px;
  }
`;

export const Form = styled(Unform)`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  flex: 1;
`;

export const InputName = styled(Input)`
  display: flex;
  width: 100%;
  max-width: 840px;
`;

export const InputStreet = styled(Input)`
  display: flex;
  width: 100%;
  max-width: 518px;
`;

export const InputNumber = styled(Input)`
  display: flex;
  width: 100%;
  max-width: 150px;
`;

export const InputComplement = styled(Input)`
  display: flex;
  width: 100%;
  max-width: 140px;
`;

export const InputCity = styled(Input)`
  display: flex;
  width: 100%;
  max-width: 140px;
`;
export const InputState = styled(Input)`
  display: flex;
  width: 100%;
  max-width: 140px;
`;
export const InputZipcode = styled(Input)`
  display: flex;
  width: 100%;
  max-width: 140px;
`;
