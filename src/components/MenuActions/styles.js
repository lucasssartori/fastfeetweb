import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const BtnAction = styled.button`
  background: none;
  border: 0;
  position: relative;
`;

export const ActionsMenu = styled.div`
  position: absolute;
  width: 150px;
  left: calc(50% - 75px);
  top: calc(100% + 5px);
  background: #fff;
  border-radius: 5px;
  border: 1px solid #eeeeee;
  padding: 15px 5px;
  display: ${props => (props.visible ? 'block' : 'none')};
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 16px);
    top: -16px;
    width: 0;
    height: 0;
    border-left: 16px solid transparent;
    border-right: 16px solid transparent;
    border-bottom: 16px solid #eee;
  }
`;

export const ListActions = styled.div`
  width: 150px;
`;

export const ActionMenu = styled.button`
  background: none;
  border: 0;
  width: 115px;

  padding: 0 10px 10px 10px;
  margin: 0 10px 10px 10px;
  border-bottom: 1px solid #eeeeee;

  display: flex;
  align-items: center;

  p {
    margin-left: 5px;
    color: #999999;
    opacity: 1;
    font-weight: 500;
  }

  :last-child {
    border-bottom: 0;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;
