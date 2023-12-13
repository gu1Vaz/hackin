import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }
    textarea:focus, input:focus,button:focus, select:focus {
        box-shadow: 0 0 0 0 !important;
        outline: 0 !important;
    } 
    html, body, #root {
       height:100%;
    }
    body {
        background-color:white;
        -webkit-font-smoothing: antialised !important;
    }
    body, input, button, textarea {
        color: #000;
        font-size: 14px;
        font-family: 'Nunito', sans-serif;
    }
    span,strong{
        font-family:'Blinker', sans-serif;
    }
    h4,h3,h2,h1,h5,h6{
        color: #24202E;
        margin:0 !important;
        padding:0 !important;
        letter-spacing: 1px;
        
    }
    .icon{
        width:32px;
        height:32px;
    }
    .ilustracao{
        width:660px;
        height:392px;
    }
    .h-10{
        height:10% !important;
    }
    .w-10{
        width:10% !important;
    }
    .w-35{
        width:35% !important;
    }
    .w-90{
        width:90% !important;
    }
    .bg-claro{
        background:#00000008 !important;  
    }
    .rainbow-text {
        background-image: linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
   .min-vw-50{
        min-width:50vh !important;
      }
    .fontMin{
        font-size:12px;
    }
      
    
    
    
`;
