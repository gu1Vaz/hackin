import React,{Component} from 'react';
import api from '../../services/api'
import {Conteudo} from './styles'
import { toast } from 'react-toastify';
import {Button} from 'react-bootstrap';
import ListChats from '../../components/ListChats'
import Draggable from '../../components/Draggable' 

export default class meuPerfil extends Component{

    constructor(props){
        super(props);
        this.state = {
            dados: [],
            id: 0,
            image: null,
        };
        this.fileInput = React.createRef();
    }
    async componentDidMount(){
        const token = localStorage.getItem('token');
        api.defaults.headers.Authorization = `Bearer ${token}`;
        const id = localStorage.getItem('id');
        this.setState({ id });
        try{
            const dados = api.get(`/verMyUser/`);
            this.setState(dados);
        }catch(e){
            toast.error('Erro na comunicação com o servidor');
        }
    }
    handleImageChange = async e => {
        const image = e.target.files[0]
        await this.setState({ image });
        console.log(image)
    };
    selecionarImagem = e =>{
        this.fileInput.current.click();
     }
    handleSubmit = async e => {
        e.preventDefault();
        const data = new FormData();
        data.append("image",this.state.image,this.state.image.name);
        try{
            await api.put(`/user/`+this.state.id,data);

        }catch(e){
            toast.error('Erro na comunicação com o servidor');
        }
    }
    render(){
        return(
            <>
            <Conteudo>
                <Button onClick={this.selecionarImagem} type = "button" > </Button>
                <input accept="image/png, image/jpeg" style={{display:"none"}} ref={this.fileInput} name="image" type="file" onChange={this.handleImageChange}/>

                <Button onClick={this.handleSubmit} type = "button" >mandar </Button>
                <Draggable content={<ListChats/>}/>
            </Conteudo>

            </>
        )
    }
}