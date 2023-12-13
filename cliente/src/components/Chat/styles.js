import styled from 'styled-components';
export const DivChat = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    width:100%;
    height:100%;
    min-height:10vh;
    border:1px solid grey;
    border-top:none !important;
    hr {
        border: 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        height:1px;
        margin:8px 0 0 0;
        padding:0;
        width:40%;
      }
      
`;
export const DivMessages = styled.div`
    padding: 0 0 0 1%;
    width: 80%;
    flex-flow: row wrap;
`;
export const DivUsers = styled.div`
    display: flex;
    flex-direction: column;
    width:20%;
    align-items:center;
    strong{
        display:flex;
        flex-direction:row;
        padding-left:7px;
        width:94%;
        border-bottom:1px solid rgba(0,0,0,.1);
       
    }
`;

export const Nav = styled.div`
    display: flex;
    flex-direction: row;
    justify-content:center;
    align-items:center;
    height:11%;
    h5{
        //background-image: linear-gradient(to left, #de6161,#2657eb);
        background-image: linear-gradient(to left,#FF416C,#FF4B2B);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    svg{
        margin-left:5px;
        cursor:pointer;
        font-size:18px;
    }
`;
export const Body = styled.div`
    display: flex;
    flex-direction: row;
    height:80%;
    hr {
        border: 0;
        border-left: 1px solid rgba(0, 0, 0, 0.1);
        height:100%;
        width:1px;
      }
`;
export const Footer = styled.div`
    display: flex;
    flex-direction: row;
    align-items:flex-end;
    padding-left:2%;
    height:13%;
    input{
        border-bottom:1px solid grey !important;
        border-radius:0px !important;
    }
    svg{
        font-size:20px;
    }
`;
export const Message = styled.div`
    display:flex;
    flex-direction:row;
`;
export const Text = styled.div`
   margin-left:7px;
`;
export const By = styled.div`
    border-right:1px solid grey;
    padding-right:5px;
`;

export const TextAdmin= styled.div`
    font-family:'Blinker', sans-serif;
    //background-image: linear-gradient(to left, #de6161,#2657eb);
    background-image: linear-gradient(to left,#FF416C,#FF4B2B);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;
export const TextUser= styled.div`
    font-family:'Blinker', sans-serif;
    color: #24202E;
`;