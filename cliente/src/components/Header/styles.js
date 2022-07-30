import styled from 'styled-components';
export const Container = styled.div`
    display:flex;
    flex-direction: column;
    background: #fff;
    width:100%
    .barraBusca input,button{
        height: 31px;
    }
    .barraBusca input{
        border-bottom-left-radius: 4px !important;
        border-top-left-radius:4px !important;
    }
    .barraBusca button{
        border-bottom-right-radius: 4px !important;
        border-top-right-radius:4px !important;
        svg{
            font-size:12px;
        }
    }
    
    
`;

export const Logo = styled.div`
    display:flex;
    flex-direction: row;
    width:20%;
    min-widht:140px;
    height:100%;
    a{
        display:flex;
        flex-direction: row;
        align-items: center;
        img {
            height: 41px;
            width:41px;
           
        }
        span{
            font-family: 'Product Sans',Arial,sans-serif;
            font-size: 18px;
            padding-left: 3px;
            color: #996633;
            background-color: transparent;
        }
    }
`

export const Nav = styled.div`
        display:flex;
        width:100%;
        height:100%;
        flex-direction: row;
        align-items: center;
        min-height:68px;
        padding:0;
        .form-control:focus {
            background-color: #83572B;
            box-shadow: none;
          }
        .w-90{
            width:99% !important;
          }
        .marrom{
            border-color:#f1f2f3;
            ::placeholder {
                color: white;
                font-size:12px;
              }
            background-color: #f1f2f3;
            svg{
                color:#83572B;
                font-size:13px;
            }
        }
    
   
`;
export const Aside = styled.div`
        display:flex;
        justify-content: flex-end;
        align-items: center;
        min-width:700px;
        width:100%;
        
`;
export const LinksNav = styled.div`
    display: flex;
    flex-direction:row;
    justify-content:flex-end;
    align-items: center;
    margin:0 10px 0 10px;
    hr{
        width:1px;
        border-left:1px solid grey;
        margin:0 14px 0 14px;
        height:18px;
    }
    a{
        color: #83572B;
        margin:0 5px 0 5px;
        
    }
    a:hover{
        color: #83572B;  
        text-decoration:none; 
    }
`;
export const Profile = styled.div`
    display: flex;
    div {
        button {
            padding: 4px 6px;
            border: 0;
            font-size: 30px;
            color: #737373;
            background: transparent;
            border-radius: 5px;
        }
        
    }
`;