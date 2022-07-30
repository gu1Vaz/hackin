import React, { Component } from 'react';
import api from '../../services/api';
import { Conteudo, Body,Topicos} from './styles';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FaPlus} from 'react-icons/fa';
import { Markup } from 'interweave';
import {Button} from 'react-bootstrap'; 
import HeaderDocAndRepo from '../../components/HeaderDocAndRepo';
import {url} from '../../scripts/config'


export default class ViewDocum extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:-1,
            documentacao:[],
            topicos:[],
            change:0,
            isAdmin:false
            
        };
    };
    
    async componentDidMount() {
        const token = localStorage.getItem('token');
        api.defaults.headers.Authorization = `Bearer ${token}`;
        const id = localStorage.getItem('id');
        this.setState({ id });
        try {
            const hack = await api.get(`/verHack/`+this.props.match.params.id);
            const documentacao = await api.get(`/verDocum/`+hack.data.documentacao_id);

            const topicos = await api.get(`/verTopicos/`+hack.data.documentacao_id);
            this.setState({ hack: hack.data });
            this.setState({ documentacao: documentacao.data });
            this.setState({ topicos: topicos.data });

            if(hack.data.admin_id == id){
                this.setState({isAdmin:true})
            }  
            
        } catch (error) {
            toast.error('Erro na comunicação com o servidor');
        }

    }
    async componentDidUpdate(_, prevState) {
        if (prevState.change !== this.state.change) {
            try {
                const hack = await api.get(`/verHack/`+this.props.match.params.id);
                const documentacao = await api.get(`/verDocum/`+hack.data.documentacao_id);

                const topicos = await api.get(`/verTopicos/`+hack.data.documentacao_id);
                this.setState({ hack: hack.data });
                this.setState({ documentacao: documentacao.data });
                this.setState({ topicos: topicos.data });
            } catch (error) {
                toast.error('Erro na comunicação do servidor');
            }
        }
    }
    
    handleInputChange = e => {
        this.setState({ [e.target.name] : e.target.value });
    };
     async deletar(id,idDoc) {
            if(!window.confirm("Tem certeza?")){
                return false;
            }
            try {
               await api.delete('/topico/'+id);
               this.setState({change:this.change+1});
               toast.success('Topico deletado com sucesso');
           } catch (error) {
               console.log(error);
            }
     }
    render() {
        const {isAdmin,topicos,documentacao} = this.state;
        let TopicosDoc;
        if(Object.keys(topicos).length){
            TopicosDoc = <Topicos >
                       { topicos.map(topico => (
                           <div className="d-flex flex-column w-100">
                               <div className="d-flex flex-row w-100 justify-content-between">
                                    <Markup content={topico.texto} />
                                    {isAdmin &&
                                        <div>
                                            <Link to={"/topico/editar/"+topico.id+"/"+documentacao.id} className="btn btn-sm btn-secondary">Editar</Link>
                                            <Button  onClick={()=>this.deletar(topico.id,documentacao.id)} className="btn btn-sm btn-danger">Remover</Button>
                                        </div>
                                        
                                    }
                               </div>
                               {isAdmin &&
                                 <hr/>
                                 }

                               
                           </div>
                                     
                            ))
                            }
                    
                    </Topicos>  
        }else{
            TopicosDoc = <li className="w-100 d-flex flex-column align-items-center">
            <img className="ilustracao" src={url+"imgs/vazio_docum.png"} alt=""></img>
    </li>
        }
        return (
            <>

                <Conteudo>
                   <HeaderDocAndRepo/>
                    <Body >
                            {TopicosDoc}
                            {isAdmin &&
                                <Link to={"/topico/novo/-1/"+documentacao.id} className="botaoAdd btn mt-3 ml-5 mb-5 " > <FaPlus/> <span>Adicionar Novo Tópico</span></Link>
                            }
                            
                    </Body>

                </Conteudo>
            </>
        );
    }
}

