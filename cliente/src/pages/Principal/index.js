import React, { Component } from 'react';
import {FaSearch, FaPlus } from 'react-icons/fa';
import {BsChatSquareFill} from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { Conteudo, Menu, Codes,HeaderCodes,BodyCodes, Notificacoes, Conta, Repositorios, Cla, SecondaryComponent} from './styles';
import NovosHacks from '../../components/Hacks/NovosHacks'
import MeusHacks from '../../components/Hacks/MeusHacks'
import AllHacks from '../../components/Hacks/AllHacks'
import ListChats from '../../components/ListChats'
import Draggable from '../../components/Draggable' 
import {moveDivFarEnd}from '../../scripts/jqueryFunctions'
import {setSize, setBackground, setMultiCss}from '../../scripts/jqueryStylingComponents'

export default class Principal extends Component {
 constructor(props) {
     super(props);
     this.buttonCssReset = this.buttonCssReset.bind(this);
     this.trocaComponente = this.trocaComponente.bind(this);
     this.voltarChat = this.voltarChat.bind(this);
     this.openChat = this.openChat.bind(this);
     this.state = {
         componenteSelecionado: <NovosHacks/>,
         chat: null,
         code: '',
         id:-1,
         user:'',
         inChat:false,
         minimizedChat:false
     };
     this.buttonNovos = React.createRef();
     this.buttonAll = React.createRef();
     this.buttonMeus = React.createRef();
 };   
 handleInputChange = e => {
    this.setState({ content: e.target.value });
 };

 async componentDidMount() {
        const id = localStorage.getItem('id');
        const user = localStorage.getItem('user');
        this.setState({id,user});
    }
 buttonCssReset(){
    this.buttonNovos.current.classList.remove('selecionado');
    this.buttonAll.current.classList.remove('selecionado');
    this.buttonMeus.current.classList.remove('selecionado');
 }
 trocaComponente(compn){
    this.buttonCssReset();
    this.state.inChat && !this.state.minimizedChat &&
                    this.setState({minimizedChat:true})
                    moveDivFarEnd("chat","right","bottom");
                    setBackground("chat","white");
                    setSize("chat",715,285);
                    setMultiCss("chat",["border","position"],["1px solid rgba(0,0,0,.125)","absolute"]);
    switch (compn) {
        case 0:
            this.setState({componenteSelecionado:<NovosHacks/>});
            this.buttonNovos.current.classList.add('selecionado');
            break;
        case 1:
            this.setState({componenteSelecionado:<AllHacks/>});
            this.buttonAll.current.classList.add('selecionado');
            break;
        case 2:
            this.setState({componenteSelecionado:<MeusHacks/>});
            this.buttonMeus.current.classList.add('selecionado');
            break;
        default:
    }
 }
 openChat(){
    this.buttonCssReset()
    this.setState({inChat:true,
                   chat:<Draggable id="chat" content={<ListChats/>} minimizable={true} lockable={true} style={{width:"742px",height:"40vh",position:"absolute"}}/>,
                   componenteSelecionado:null});
 }
 voltarChat(){
    this.buttonCssReset()
    this.setState({componenteSelecionado:null,minimizedChat:false});
    setBackground("chat","transparent");
    setSize("chat",680,315);
    setMultiCss("chat",["border","position","transform"],["none","relative",'translate(' + 0 +', ' + 0 + ')']);
 }
 render() {
    const { id,user,componenteSelecionado,chat,inChat} = this.state;
    return (
        <>
        <Conteudo>
            <Menu className=" h-100 bg-white border  p-4">
                <Conta className="w-100">
                {id > 0 &&
                        <div>
                            <img  className="img-thumbnail rounded-circle" alt="" src=""></img>
                            <strong>{user}</strong>
                        </div>
                    }
                {id ==null &&
                    <div className="d-flex flex-row justify-content-between w-100">
                        <div>
                        <img  className="" alt="" src="imgs/guest.png"></img>
                        <strong >Guest</strong>
                        </div>
                        <div>
                            <Link   to="/cadastrar" >Cadastrar</Link>
                            <strong className="ml-2 mr-2">/</strong>
                            <Link   to="/login" >Login</Link>
                        </div>
                    </div>
                }
                </Conta>
                <hr/>
                <Repositorios className="w-100 mt-1 mb-3">
                    <div className="w-100 d-flex flex-row justify-content-between">
                        <strong>Hacks</strong>
                        <Link to="/novoHack"
                                className=" d-flex flex-row justify-content-center align-items-center btn btn-sm btn-danger"
                        >Novo <FaPlus className="pl-1"/></Link>
                    </div>
                    <div className="bg-opaco w-100  border rounded input-group-sm d-flex flex-row align-items-center mt-2">
                            <input name="buscaHack" id="buscaHack" type="text" className="bg-opaco rounded-0 form-control card  w-85 border-0"   placeholder="Busque um hack..." />
                            <div class="input-group-append">
                            <button type="submit" className="bg-opaco btn card   rounded-0 border-0  d-flex flex-row align-items-center justify-content-center"><FaSearch/></button>
                            </div>
                        </div>     
                
                </Repositorios>
                <hr/>
                <Cla className="w-100 mt-1 mb-3">
                    <div className="w-100 d-flex flex-row justify-content-between">
                            <strong>Clã</strong>
                    </div>
                    <div className="bg-opaco w-100  border rounded input-group-sm d-flex flex-row align-items-center mt-2">
                                <input name="buscaCla" id="buscaCla" type="text" className="bg-opaco rounded-0 form-control card  w-85 border-0"   placeholder="Busque um clã..." />
                                <div class="input-group-append">
                                <button type="submit" className="bg-opaco btn card   rounded-0 border-0  d-flex flex-row align-items-center justify-content-center"><FaSearch/></button>
                                </div>
                    </div>  
                </Cla>
                <hr/>
            </Menu>
            <Codes className=" h-100 ">
                    <HeaderCodes>
                        <div className="ml-3">
                           
                        </div>
                        <div>
                            <strong className="border-right mr-2"  onClick={inChat?this.voltarChat:this.openChat} > Chats <BsChatSquareFill/></strong>
                            <strong  ref={this.buttonNovos} className="selecionado ml-2" onClick={()=>this.trocaComponente(0)} > Novos</strong>
                            <strong  ref={this.buttonAll} onClick={()=>this.trocaComponente(1)} >All Hacks</strong>
                            <strong  ref={this.buttonMeus}  onClick={()=>this.trocaComponente(2)} >Meus Hacks</strong>
                        </div>
                    </HeaderCodes>
                    <SecondaryComponent>
                        
                    </SecondaryComponent>
                    <BodyCodes className="overflow-auto">
                        {componenteSelecionado}
                        {chat}
                    </BodyCodes>
            </Codes>
            <Notificacoes className=" h-100 ">
            </Notificacoes>
        </Conteudo>
     </>
    );
 }
}

