import React, { Component } from 'react';
import api from '../../../services/api';
import { toast } from 'react-toastify';
import {BsArrowLeft} from 'react-icons/bs'
import {Grupos,Hacks} from './styles';

export default class AllHacks extends Component {
    constructor(props) {
        super(props);
        this.verGrupo = this.verGrupo.bind(this);
        this.voltarGrupos = this.voltarGrupos.bind(this);
        this.state = {
            hacks:[],
            grupos:[],
            linguagens:[],
            nomeGrupo:"",
            loading:true
        };
       
    };
    
    async componentDidMount() {

        try {
            const grupos = await api.get(`/verGruposHack/`);         
            this.setState({ grupos: grupos.data });
            const linguagens = await api.get(`/verLinguagensHack/`);         
            this.setState({ linguagens: linguagens.data });

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
    voltarGrupos(){
        this.setState({ loading: true});
        document.getElementById("divGrupos").style.display= "flex";
        document.getElementById("divHacks").style.display= "none";
        this.setState({ loading: false});
    }
    async verGrupo(grupo_id,grupo_nome){
        this.setState({ loading: true});
        document.getElementById("divGrupos").style.display= "none";

        const hacks = await api.get(`/verHacksByIdGrupo/`+grupo_id);  
        this.setState({ hacks: hacks.data });
        this.setState({ nomeGrupo: grupo_nome});

        document.getElementById("divHacks").style.display= "inline";
        this.setState({ loading: false});
        
    }
    render() {
        const {grupos,nomeGrupo,loading,hacks,linguagens} = this.state;
       
        return (
            <>
            <div >
                {loading &&
                <div className="d-flex flex-row justify-content-center w-100">
                    <div className=" spinner-grow" role="status">
                                        
                    </div>
                </div>
                }
                <Grupos id="divGrupos" className="pt-4 pl-1">
                    
                    {grupos.map(grupo=>(
                        <div onClick={()=>this.verGrupo(grupo.id,grupo.nome)} className="border p-5"><span >{grupo.nome}</span></div>
                    ))}
                </Grupos>
                <Hacks id="divHacks" style={{display:"none"}} className="pt-4 pl-1">
                   <a onClick={this.voltarGrupos}><BsArrowLeft/><strong>Voltar</strong></a>
                   <h5 className="mb-4">{nomeGrupo}</h5>
                   <ul className="list-group list-group-flush  ">
                       
                        {hacks.length > 0 && hacks.map(hack=>(
                           <li className="list-group-item">
                               <p>
                                <strong>{hack.nome}</strong>
                                <span className="ml-1 mr-1"> by </span>
                                <span>{hack.nomeCriador}</span>
                               </p>
                               <p>
                                 <span className="ml-2 mr-2">{this.formatarDesc(hack.desc)} </span>
                               </p>
                               <p>
                                 <span className="ml-2 mr-2">{linguagens[hack.linguagem_hack_id].nome} </span>
                               </p>
                               <p>
                               <span className="fontMin ml-5" >{hack.updated_at}</span>
                               </p>
                           </li>
                        ))}
                        {hacks.length <= 0 && 
                            <h5>Esse grupo ainda não possui documentações de hacks</h5>
                           }
                    </ul>
                </Hacks>
               
            </div>
            
            </>
        );
    }
}

