import styled from 'styled-components';

export const Container = styled.div`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  display: flex;
  margin-right: 5px;
`;

export const Name = styled.p`
  font-weight: 400;
  font-size: ${props => props.size / 2}px;
`;
