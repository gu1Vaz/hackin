import React, { Component } from 'react';
import api from '../../services/api';
import { Conteudo, Pastas, Botoes} from './styles';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { BsFileEarmark, BsFileEarmarkPlus} from 'react-icons/bs';
import {Dropdown,Button} from 'react-bootstrap'; 
import HeaderDocAndRepo from '../../components/HeaderDocAndRepo';

export default class ViewPasta extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hack :[],
            repositorio : [], 
            pasta : [],
            arquivos:[],
            inputFile:"",
            change:0,
            isAdmin:false
        };
        this.i = 0;
    };
    
    async componentDidMount() {
        const token = localStorage.getItem('token');
        api.defaults.headers.Authorization = `Bearer ${token}`;
        const id = localStorage.getItem('id');
        this.setState({ token, id });
        try {
            const hack = await api.get(`/verHack/`+this.props.match.params.hack_id);
            const pasta = await api.get(`/verPasta/`+this.props.match.params.id);
            const repositorio = await api.get(`/verRepo/`+pasta.data.repositorio_id);
            const arquivos = await api.get(`/verArquivos/`+this.props.match.params.id);
            
            this.setState({ hack: hack.data });
            this.setState({ repositorio: repositorio.data });
            this.setState({ pasta: pasta.data });
            this.setState({ arquivos: arquivos.data });

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
                const hack = await api.get(`/verHack/`+this.props.match.params.hack_id);
                const pasta = await api.get(`/verPasta/`+this.props.match.params.id);
                const repositorio = await api.get(`/verRepo/`+pasta.data.repositorio_id);
                const arquivos = await api.get(`/verArquivos/`+this.props.match.params.id);
                
                this.setState({ hack: hack.data });
                this.setState({ repositorio: repositorio.data });
                this.setState({ pasta: pasta.data });
                this.setState({ arquivos: arquivos.data });  
            } catch (error) {
                toast.error('Erro na comunicação do servidor');
            }
        }
    }
    
    handleInputChange = e => {
        this.setState({ [e.target.name] : e.target.value });
    };
    
    
    handleSubmit = async e => {
       
    }
    handleSubmitFile = async e => {
        const data = new FormData();
        data.append('nome', this.state.inputFile);
        data.append('pasta_id', this.state.pasta.id);
        data.append('repositorio_id', this.state.repositorio.id);
         try {
             await api.post(`/arquivo/`, data);
             toast.success(this.state.inputFile+' criado');
             this.setState({change: this.state.change + 1,pasta: [],hack: [], arquivos:[],repositorio:[],inputFile:''});
         } catch (error) {
             toast.error('Falha ao criar arquivo!');
          }
     }
    PastasAndArquivos(props){
        const arquivos = props.arquivos;
        if(Object.keys(arquivos).length){
            return arquivos.map(arquivo => (
                <li className="list-group-item">
                     <Link  to="/cadastrar" ><BsFileEarmark/> {arquivo.nome}</Link>
               </li>
            ))

        }else{
            return <li  className="list-group-item">
                  Esta pasta ainda esta vazia no momento
            </li>

        }
    }
    
    
    render() {
        const {pasta,arquivos,hack,isAdmin} = this.state;
        let BotoesRepo;
        if(isAdmin){
            BotoesRepo = <Botoes className="mt-2 ml-5">
                        <div>
                            
                        </div>
                        <div className="d-flex flex-row ">
                        <Dropdown alignRight={true} >
                                    <Dropdown.Toggle className="d-flex flex-row align-items-center btn btn-success " >
                                        <BsFileEarmarkPlus/>
                                        <strong className="ml-1 mr-1">Novo</strong>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="p-1 min-vw-50">
                                        <div className="d-flex flex-row align-items-center">
                                            <input className="form-control" type="text" onChange={this.handleInputChange} name="inputFile" value={this.state.inputFile}/>
                                            <Button type="submit" onClick={this.handleSubmitFile} className="btn-sm btn-success">Criar</Button>
                                        </div>
                                    </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </Botoes>
            }else{
                BotoesRepo = <div/>
            }
        return (
            <>

                <Conteudo>
                   <HeaderDocAndRepo/>
                    {BotoesRepo}
                    <Pastas className="mt-2 ml-5">
                    <ul className="list-group  w-100 ">
                        <li className="list-group-item bg-claro">
                        <span>{hack.nome} /</span><strong> {pasta.nome}</strong>
                        </li>
                        <this.PastasAndArquivos arquivos={arquivos}/>
                    
                    </ul>
                    </Pastas>

                </Conteudo>
            </>
        );
    }
}

