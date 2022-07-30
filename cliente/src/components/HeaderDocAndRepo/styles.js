import styled from 'styled-components';
export const Head = styled.div`
    display: flex;
    flex-direction: column;
    width:100%;
    min-height:17.5vh !important;
    justify-content: space-between;
    background:#FAFBFC !important;
    padding:20px 20px 0 40px !important;
    
`;
export const Nome = styled.div`
    display: flex;
    flex-direction: row;
    width:100%;
    align-items:center;
    img{
        width:18px;
        height:18px;
    }
    h5{
        margin-left:5px !important;

    }
    
`;
export const Opcoes = styled.div`
    display: flex;
    flex-direction: row;
    width:100%;
    justify-content: flex-start;
    padding:0 0 0 1px;
    a{
        display: flex;
        flex-direction: row;
        min-width:100px;
        min-height:40px;
        justify-content: center;
        align-items:center;
        border-bottom:2px solid #737373;
        color:#24202E;
        margin-left:45px;
        svg{
            margin-right:4px;
            color:#24202E;
            font-size:22px;
        }
    }
    a:hover{
        color:#737373;
        text-decoration:none;
    }
    
`;