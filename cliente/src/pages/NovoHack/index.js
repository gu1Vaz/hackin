import React, { Component } from 'react';
import api from '../../services/api';
import { Conteudo, Info, DadosRepo} from './styles';
import { toast } from 'react-toastify';
import { Button, InputGroup, FormControl,Form} from 'react-bootstrap'; 
import { BsQuestionCircle } from 'react-icons/bs';
import $ from "jquery"

export default class NovoHack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            repoNome: '',
            repoDesc: '',
            id:'',
            loading:false,
            tipoInput:"",
            grupoInput:"",
            linguagemInput:"",
            grupos:[],
            linguagens:[]       
        };
        this.i = 0;
    };
    
    async componentDidMount() {
        const token = localStorage.getItem('token');
        api.defaults.headers.Authorization = `Bearer ${token}`;
        const id = localStorage.getItem('id');
        this.setState({ id });
        try {
            const grupos = await api.get(`/verGruposHack/`);
            const linguagens = await api.get(`/verLinguagensHack/`);
            this.setState({ grupos: grupos.data });
            this.setState({ linguagens: linguagens.data });

        } catch (error) {
            toast.error('Erro na comunicação do servidor');

          }
        $(function () {
            $('[data-toggle="popover"]').popover();
            $('.pop').popover().click(function() {
              setTimeout(function() {
                $('.pop').popover('hide');
              }, 1500);
            
            });
          });
    }
    
    handleInputChange = e => {
        this.setState({ [e.target.name] : e.target.value });
    };
    
    
    handleSubmit = async e => {
        e.preventDefault();
        this.setState({ loading: true });
        const data = new FormData();
        data.append('nome', this.state.repoNome);
        data.append('desc',this.state.repoDesc);
        data.append('tipo',this.state.tipoInput);
        data.append('grupo',this.state.grupoInput);
        data.append('linguagem',this.state.linguagemInput);
        let id;
        try {
            await api.post(`/hack/`, data).then(response => {
                id = response.data.repositorio_id;
            })
            this.setState({ change: this.state.change + 1, content: '' });
            toast.success('Hack Criado');
            this.props.history.push('/verRepo/'+id);
        } catch (error) {
            error.response.data.forEach(element => {
                toast.error(element.message);
            });
        }
        this.setState({ loading: false });
            
    }
    
    
    render() {
        const {loading,grupos,linguagens}=this.state;
        return (
            <>

                <Conteudo>
                 <Info>
                 <h4>Criar um novo hack </h4>
                 <span>Um hack contem a documentação e um repositorio para guardar codigos e arquivos usados no hack desenvolvido.</span>
                 </Info>
                 <hr/>
                 <DadosRepo>
                     <strong>Nome do hack</strong>
                     <InputGroup className="mb-3">
                        <FormControl
                        onChange={this.handleInputChange}
                        placeholder=""
                        value={this.state.repoNome}
                        name="repoNome"
                        />
                    </InputGroup>
                    <strong>Descrição do hack</strong>
                     <InputGroup className="mb-3">
                        <FormControl
                        as="textarea" 
                        rows={3}
                        onChange={this.handleInputChange}
                        placeholder=""
                        value={this.state.repoDesc}
                        name="repoDesc"
                        />
                    </InputGroup>
                    <div className="d-flex flex-row align-items-center">
                        <strong>Começe a documentação do seu hack como: </strong>
                        <BsQuestionCircle type="button" className="ml-1 btn p-0 m-0" data-container="body" data-toggle="popover" data-placement="right" data-content="[Padrão]: Já vira com um conjunto de tópicos para facilitar a sua documentação,sendo possivel remover ou editar ainda qualquer tópico [Customizada]: Vira com a documentação vazia, tendo que criar todos os tópicos que ache nescessario para documentar o hack"/>
                    </div>
                    <InputGroup className="d-flex flex-column mb-3 mt-2">
                        <Form.Check
                            type="radio"
                            label="Padrão"
                            value="padrao"
                            onChange={this.handleInputChange}
                            name="tipoInput"
                            id="padrao"
                            />
                        <Form.Check
                        type="radio"
                        value="customizada"
                        onChange={this.handleInputChange}
                        label="Customizada"
                        name="tipoInput"
                        id="custom"
                        />
                    </InputGroup>
                    <div className="d-flex flex-row align-items-center">
                        <strong>Em qual grupo o hack feito se encaixa? </strong>
                    </div>
                    <select className="form-control rounded-0  bg-white border-top-0 border-left-0 border-right-0  mt-1" onChange={this.handleInputChange} name="grupoInput"  >
                          <option  value=""></option>
                          {grupos.map(grupo => (
                                 <option  value={grupo.id}>{grupo.nome}</option>
                           ))} 
                    </select>
                    <div className="d-flex flex-row align-items-center mt-4">
                        <strong>Qual a linguagem utilizada em maior parte no hack? </strong>
                    </div>
                    <select className="form-control rounded-0  bg-white border-top-0 border-left-0 border-right-0  mt-1" onChange={this.handleInputChange} name="linguagemInput"  >
                          <option  value=""></option>
                          {linguagens.map(linguagem => (
                                 <option  value={linguagem.id}>{linguagem.nome}</option>
                           ))} 
                    </select>
                    
                    <Button onClick={this.handleSubmit} className="btn btn-danger w-25 mt-4 mb-2">{loading ? <span className="spinner-grow spinner-grow-sm text-light" role="status" aria-hidden="true"></span> : 'Criar Repositorio'}</Button>

                 </DadosRepo>
                  
                </Conteudo>
            </>
        );
    }
}

