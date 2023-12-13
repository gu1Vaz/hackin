import React, { Component } from 'react';
import api from '../../../services/api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import {SiHackaday} from 'react-icons/si'
import {Hack} from './styles';

export default class MeusHacks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hacks:[],
            loading:true
        };
       
    };
    
    async componentDidMount() {
        const token = localStorage.getItem('token');
        api.defaults.headers.Authorization = `Bearer ${token}`;
        try {
            const hacks = await api.get(`/verMeusHacks/`);
            this.setState({ hacks: hacks.data });

        } catch (error) {
            toast.error('Recarregue a pagina pls');
        }
        this.setState({ loading: false});

    }
    formatarDesc(desc){
        if(desc.length>130){
           return desc.substring(0,130)+"...";
        }else{
            return desc;
        }
    }
    render() {
        const {hacks,loading} = this.state;
        return (
            <>
            <div>
                {loading &&
                <div className="d-flex flex-row justify-content-center w-100">
                    <div className=" spinner-grow" role="status">
                                        
                    </div>
                </div>
                   
                }
                
               {hacks.map(hack => (
                            <Hack>
                                <div>
                                     <SiHackaday />
                                     <strong>{hack.nome}</strong>
                                </div>
                                <div className="card h-75 p-3 ml-5 mr-1">
                                     <Link className="rainbow-text" to={"/verDocum/"+hack.documentacao_id} >{hack.nomeCriador}/{hack.nome}</Link>
                                     <span>{this.formatarDesc(hack.desc)}</span>
                                     <span className="fontMin" >Criado em {hack.updated_at}</span>
                                </div>
                            </Hack>
                            
                        ))}
            </div>
            
            </>
        );
    }
}

