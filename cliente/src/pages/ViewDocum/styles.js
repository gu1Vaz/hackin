import styled from 'styled-components';
export const Conteudo = styled.div`
    display: flex;
    flex-direction: column;
    width:100%;
    min-height:90vh;
    align-items:flex-start;
`;

export const Body = styled.div`
    display: flex;
    flex-direction: column;
    width:98%;
    .botaoAdd{
        display: flex;
        align-items:center;
        justify-content:center;
        color:#586069;
        text-decoration:none;
        padding:13px;
        border:1px #ced4da;
        border-style: dashed;
        width:70%;
    }
    .botaoAdd a:hover{
        color:#737373;
        text-decoration:none;
    }
`;
export const Topicos = styled.div`
    display: flex;
    flex-direction: column;
    justify-content:space-between;
    margin-left:5%;
    margin-top:2%;
    button,a{
        height:30px;
        margin-right:10px;
    }
`;