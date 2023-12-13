import styled from 'styled-components';
export const DivListChat = styled.div`
    display: flex;
    flex-direction: column;
    min-width:100%;
    height:100%;
    padding: 15px;
    //background:white;
    //border: 1px solid rgba(0,0,0,.125);
    border-radius: .25rem;
    .divNickname{
        max-height:32px;
        width:35%;
    }
    div{
        input,select{
            background:transparent;
        }
    }
    ul{
        li{
            cursor:pointer;
            background:transparent;
            strong{
                font-size:12px !important;
                margin-left:1%;
            }
        }
        li:hover{
          background-image: linear-gradient(to left,#FF416C,#FF4B2B);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          border-bottom:1px solid #ff8080;
        }
        
    }
    button{
        background-image: linear-gradient(to left,#FF416C,#FF4B2B);
        border:none;
    }
`;
export const Botoes = styled.div`
    display: flex;
    flex-direction: row;
    align-items:flex-end;
    svg{
        color:#24292E;
    }
    
`;
export const Nav = styled.div`
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    min-width:400px !important;
    max-height:32px !important;
    div{
        align-items:center;
    }
    div h6{
        display: flex;
        flex-direction: row;
        align-items:center;
        margin:0 10px 0 0;
        color:#FF416C;
    }
    div input{
        background:transparent;
    }
    div button{
        margin-left:10px;
        background-image: linear-gradient(to left,#FF416C,#FF4B2B);
        border:none;
    }
    div svg{
        margin-left:4px;
        cursor:pointer;
    }
`;