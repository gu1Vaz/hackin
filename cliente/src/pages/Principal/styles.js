import styled from 'styled-components';
export const Conteudo = styled.div`
    display: flex;
    flex-direction: row;
    width:100%;
    height:90vh;
`;

export const Menu = styled.div`
    display: flex;
    flex-direction: column;
    align-items:center;
    min-width:330px;
    hr{
        width:100%;
        height:1px;
    }
`;
export const Codes = styled.div`
    display: flex;
    background-color:#f1f2f3;
    flex-direction: column;
    width:70%;
`;
export const HeaderCodes = styled.div`
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    align-items:flex-end;
    height:9%;
    margin:3px;
    .selecionado{
        border-bottom:2px solid #586069;
    }
    div{
        display:flex;
        flex-direction:row;
        justify-content:flex-end;
        strong{
            min-width:85px;
            display:flex;
            flex-direction:row;
            justify-content:center;
            align-items: center;
            min-height:32px;
            cursor: pointer;
            width:12%;
            color:#586069;
        }
        svg{
            margin:0 0 0 5px;
            font-size: 17px;
        }
    }
`;
export const BodyCodes = styled.div`
    display: flex;
    flex-direction: column;
    height:96%;
    padding-left:5%;
`;
export const Notificacoes = styled.div`
    display: flex;
    background-color:#f1f2f3;
    flex-direction: column;
    width:30%;
`;
export const Documentacoes = styled.div`
    display: flex;
    flex-direction: column;
    .bg-opaco{
        background-color:#f1f2f3;
    }
`;
export const Repositorios = styled.div`
    display: flex;
    flex-direction: column;
    .bg-opaco{
        background-color:#f1f2f3;
    }
`;
export const Cla = styled.div`
    display: flex;
    flex-direction: column;
    .bg-opaco{
        background-color:#f1f2f3;
    }
`;

export const Conta = styled.div`
    display: flex;
    height:8%;
    flex-direction: row;
    align-items:flex-end;
    justify-content:flex-start;
    img{
        height:26px;
        padding:0;
        width:28px;
        margin-right:5px;
    }
    a{
        color:#DC3545;
    }
    strong{
        font-size:15px;
       
    }
`;
export const SecondaryComponent = styled.div`
    
`;
