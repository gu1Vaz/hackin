import React, { Component } from 'react';
import api from '../../services/api';
import { Conteudo,  Pastas, Botoes} from './styles';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { BsFileEarmark,BsFileEarmarkPlus} from 'react-icons/bs';
import { HiDownload} from 'react-icons/hi';
import { FaFolder, FaAngleDown,FaFolderPlus} from 'react-icons/fa';
import { Dropdown,Button} from 'react-bootstrap'; 
import HeaderDocAndRepo from '../../components/HeaderDocAndRepo';

export default class ViewRepo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hack:[],
            repositorio : [], 
            pastas : [],
            arquivos:[],
            inputFile:"",
            inputFolder:"",
            idPai:-1,
            change: 0,
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
        const hack = await api.get(`/verHack/`+this.props.match.params.id);
        const repositorio = await api.get(`/verRepo/`+hack.data.repositorio_id);        
        const pastas = await api.get(`/verPastas/`+hack.data.repositorio_id);

        let idPai =pastas.data[0].id;
        delete pastas.data[0];
        
        const arquivos = await api.get(`/verArquivos/`+idPai);

        this.setState({ hack: hack.data });
        this.setState({ repositorio: repositorio.data });
        this.setState({  pastas: pastas.data });
        this.setState({  arquivos: arquivos.data });
        this.setState({  idPai: idPai });
            
        if(hack.data.admin_id == id){
            this.setState({isAdmin:true})
        }      
    } catch (error) {
        toast.error('Erro na comunicação com o servidor');
    }
 };
  async componentDidUpdate(_, prevState) {
    if (prevState.change !== this.state.change) {
        try {
            const hack = await api.get(`/verHack/`+this.props.match.params.id);   
            const repositorio = await api.get(`/verRepo/`+hack.data.repositorio_id);
            const pastas = await api.get(`/verPastas/`+hack.data.repositorio_id);

            var idPai =pastas.data[0].id;
            delete pastas.data[0];

            const arquivos = await api.get(`/verArquivos/`+idPai);

            this.setState({ hack: hack.data });
            this.setState({ repositorio: repositorio.data });
            this.setState({  pastas: pastas.data });
            this.setState({  arquivos: arquivos.data });
            this.setState({  idPai: idPai });
        } catch (error) {
            toast.error('Erro na comunicação do servidor');
        }
    }
  };
    
  handleInputChange = e => {
    this.setState({ [e.target.name] : e.target.value });
  };
  handleSubmitFile = async e => {
    const data = new FormData();
    data.append('nome', this.state.inputFile);
    data.append('pasta_id', this.state.idPai);
    data.append('repositorio_id', this.state.repositorio.id);
     try {
         await api.post(`/arquivo/`, data);
         toast.success(this.state.inputFile+' criado');
         this.setState({change: this.state.change + 1,pastas: [], arquivos:[],repositorio:[],inputFile:''});
     } catch (error) {
         toast.error('Falha ao criar arquivo!');
      }
  };
  handleSubmitFolder = async e => {
    const data = new FormData();
    data.append('nome', this.state.inputFolder);
    data.append('repositorio_id', this.state.repositorio.id);
    try {
        await api.post(`/pasta/`, data);
        toast.success(this.state.inputFolder+' criado');
        this.setState({change: this.state.change + 1,pastas: [], arquivos:[],repositorio:[],inputFolder:'',inputFile:''});
    } catch (error) {
        toast.error('Falha ao criar pasta!');
     }
  };
  PastasAndArquivos(props){
    const hack = props.hack;
    const pastas = props.pastas;
    const arquivos = props.arquivos;
    if(Object.keys(pastas).length || Object.keys(arquivos).length){
        return [pastas.map(pasta => (
                            
            <li className="list-group-item">
                <Link  to={"/verPasta/"+pasta.id+"/"+hack.id} ><FaFolder/> {pasta.nome}</Link>
            </li>
        )),arquivos.map(arquivo => (
            <li className="list-group-item">
                 <Link  to="/cadastrar" ><BsFileEarmark/> {arquivo.nome}</Link>
            </li>
        ))]

    }else{
        return <li  className="list-group-item">
              Este repositorio ainda esta vazio no momento
        </li>

    }
  };
  render() {
    const {hack,pastas,arquivos,isAdmin} = this.state;
    let BotoesRepo;
    if(isAdmin){
     BotoesRepo = <Botoes className="mt-2 ml-5">
         <div></div>
         <div className="d-flex flex-row ">
             <Dropdown alignRight={true} >
                     <Dropdown.Toggle className="d-flex flex-row align-items-center btn btn-success mr-2" >
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
             <Dropdown alignRight={true} >
                     <Dropdown.Toggle className="d-flex flex-row align-items-center btn btn-success " >
                         <FaFolderPlus/>
                         <strong className="ml-1 mr-1">Novo</strong>
                     </Dropdown.Toggle>
                     <Dropdown.Menu className="p-1 min-vw-50">
                         <div className="d-flex flex-row align-items-center">
                              <input className="form-control" type="text" onChange={this.handleInputChange} name="inputFolder" value={this.state.inputFolder}/>
                              <Button type="submit" onClick={this.handleSubmitFolder}className="btn-sm btn-success">Criar</Button>
                         </div>
                     </Dropdown.Menu>
             </Dropdown>            
         </div>
     </Botoes>
     }else{
         BotoesRepo = <Botoes className="mt-2 ml-5">
             <div></div>
             <div>
              <Dropdown className="d-flex flex-row align-items-center btn btn-success">
                    <HiDownload/>
                    <strong className="ml-1 mr-1">Codigo</strong>
                    <FaAngleDown/>
              </Dropdown>
              </div>
        </Botoes>
      }
        return (
            <>
                <Conteudo>
                    <HeaderDocAndRepo/>
                    {BotoesRepo}
                    <Pastas className="mt-2 ml-5">
                    <ul className="list-group  w-100">
                        <li className="list-group-item bg-claro" >
                            <strong >{hack.nome}</strong>
                        </li>
                        <this.PastasAndArquivos hack={hack} pastas={pastas} arquivos={arquivos}/>
                     </ul>
                            
                    </Pastas>
                    

                </Conteudo>
            </>
        );
    };
}

