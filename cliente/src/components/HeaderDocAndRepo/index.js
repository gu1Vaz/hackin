import React, { Component } from 'react';
import api from '../../services/api';
import {  Head, Nome, Opcoes} from './styles';
import { toast } from 'react-toastify';
import {url} from '../../scripts/config'
import { Link } from 'react-router-dom';
import { BsCode, BsBook} from 'react-icons/bs';

export default class HeaderDocAndRepo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hack : [],
            user:[],

        };
       
    };
    
    async componentDidMount() {
        let url = window.location.pathname.includes("verDocum");
        if(url){
            document.getElementById("codigo").style.border = "none";
        }else{
            document.getElementById("wiki").style.border = "none";
        }
        
        try {
            const hack_id = window.location.href.substr(-1);
            const hack = await api.get(`/verHack/`+hack_id);
            this.setState({ hack: hack.data });

        } catch (error) {
            toast.error('Recarregue a pagina pls');
        }

    }
    render() {
        const {hack} = this.state;
        return (
            <>
            <Head className="card-header">
                        <Nome>
                            <img className="" src={url+"imgs/code.png"} alt=""></img>
                            
                            <h5 className="rainbow-text" >{hack.nome}</h5>
                        </Nome>
                        <Opcoes>
                            <Link id="wiki" to={"/verDocum/"+hack.documentacao_id} ><BsBook/>Wiki</Link>
                            <Link  id="codigo" to={"/verRepo/"+hack.repositorio_id} ><BsCode/>Codigo</Link>
                        </Opcoes>
            </Head>  
            </>
        );
    }
}

