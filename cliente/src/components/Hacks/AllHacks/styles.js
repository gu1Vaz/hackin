import styled from 'styled-components';
export const Grupos = styled.div`
    display: flex;
    flex-direction: row;
    flex-flow: row wrap;
    div{
        cursor: pointer;
    }
    width:100%;
`;
export const Hacks = styled.div`
    display: flex;
    flex-direction: row;
    width:100%;
    a{
        display:flex;
        flex-direction:row;
        align-items:center;
        margin-bottom:15px;
        cursor: pointer;
        strong{
            font-size:18px;
            color: #585069;
        }

        svg{
            font-size:22px;
            color: #585069;
        }
    }
    ul{
        li{
            p{
                margin:0;
                strong{
                    font-size:18px;
                }
            }
            display:flex;
            flex-direction:row;
            justify-content:space-between;
        }
    }
`;