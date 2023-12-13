import React from 'react';
import {Container,Input,InputError} from './styles'


var estInicial = {
       verfName:"" ,
       verfEmail: "",
       verfPassword: "",
   };

function reset(){
     estInicial.verfName = "";
     estInicial.verfEmail = "";
     estInicial.verfPassword = "";
}
const verfInput = e =>{
     var valor = e.target.value;
     var name = e.target.name;

     if(name ==="username"){
         if(valor ===""){
              estInicial.verfName = "Insira um nome";
              e.target.style.borderColor = "#ff3333";
         }else{
              estInicial.verfName = "";
              e.target.style.borderColor = "#99ff33";
         }
     }
     if(name === "email"){
       if(!valor.includes("@") || valor ===""){
              estInicial.verfEmail = "Email invalido,digite um email valido";
              e.target.style.borderColor = "#ff3333";
       }else{
              estInicial.verfEmail = "";
              e.target.style.borderColor = "#99ff33";
       }
     }
     if(name === "password"){
       if(valor.length<6 ){
              estInicial.verfPassword = "senha deve ter pelo menos 6 caracteres";
              e.target.style.borderColor = "#ff3333";
       }else{
              estInicial.verfPassword = ""; 
              e.target.style.borderColor = "#99ff33";
       }
     }
    
};


function gerarInput(nome,tipo,fundo,onChange,valor,errorValor,errorId){
   return(
       <>
       <Container>
              <Input id="divInput">
                 <input name={nome} type={tipo} placeholder={fundo} required
                         onChange={onChange} value={valor}  onInput={verfInput}/>
              </Input>
              <InputError id="divError">
             <span  >{errorValor}</span> 
              </InputError>
       </Container>
       </>
)};
export {estInicial};
export {gerarInput};
export {reset};
