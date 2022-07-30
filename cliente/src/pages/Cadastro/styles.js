import styled from 'styled-components';
export const Caixa = styled.div`
    display: flex;
    flex-direction: row;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    min-height:90vh;
    margin: 30px;
`;
export const Form = styled.form`
    display: flex;
    flex: 1;
    min-width: 180px;
    flex-direction: column;
    h1{
        display:flex;
        flex-direction:row;
        justify-content:center;
    }
    input {
            width:100%;
            border: 1px solid #eee;
            padding 10px 15px;
            border-radius: 4px;
            font-size: 16px;
            margin: 5px 0;
        }

    button {
        margin: 5px 0 0;
        padding: 6px 16px;
        background: #666666;
        font-weight: bold;
        color: #fff;
        border: 0;
        border-radius: 100px;
        font-size: 16px;
    }
`;
export const Footer = styled.aside`
    background-color: #f5f8fa;
    color: #333;
    text-align: left;
    padding: 30px;
    font-size: 16px;
    a {
        
        color: #b3b3ff;
        text-decoration: none;
        a:hover {
            text-decoration: underline;
        }
    }
`;