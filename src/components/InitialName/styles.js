import styled from 'styled-components';

export const Container = styled.div`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  display: flex;
  margin-right: 5px;
  border-width: 2px;
  background: ${props => props.background};
  border-color: ${props => props.color};
  border-style: ${props => (props.size > 100 ? 'dashed' : 'none')};
`;

export const Name = styled.p`
  font-weight: 400;
  font-size: ${props => props.size / 2}px;
  color: ${props => props.color};
`;
