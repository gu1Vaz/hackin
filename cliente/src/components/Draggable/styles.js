import styled from 'styled-components';
export const DivDraggable = styled.div`
   display:flex;
   flex-direction:column;
   justify-content: space-between;
   resize:both;
   overflow:auto;
`;
export const Botoes = styled.div`
   display:flex;
   flex-direction:row;
   justify-content: flex-end;
   svg{
      cursor:pointer
   }
`;

