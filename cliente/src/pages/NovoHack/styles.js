import styled from 'styled-components';
export const Conteudo = styled.div`
    display: flex;
    flex-direction: column;
    width:100%;
    align-items:center;
    min-height:90vh;
    hr{
        width:50%;
        height:1px;
    }
`;
export const Info = styled.div`
    display: flex;
    margin-top:40px;
    flex-direction: column;
    width:50%;
    h4{
        margin-bottom:5px !important;
    }
    span{
        font-size: 14px;
    }
`;
export const DadosRepo = styled.div`
    display: flex;
    margin-top:20px;
    flex-direction: column;
    width:50%;
    
`;
export const DivOpcoes = styled.div`
    display: flex;
    flex-direction: column;
    background: #f1f2f3;
    height:30px;
    
`;
