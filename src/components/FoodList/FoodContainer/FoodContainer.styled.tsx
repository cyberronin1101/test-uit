import styled from 'styled-components';

export const Food = styled.div`
  border-bottom: 1px solid #ddd;
  padding-bottom: 20px;
`

export const FoodHeader = styled.header`
  display: grid;
  grid-template-columns: auto auto auto auto 1fr;
  gap: 20px;
  padding: 20px 0;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: grid;
  font-size: 12px;
  grid-template-rows: auto;
  gap: 8px 0;
  align-content: end;
`;