import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { toast } from 'react-toastify';
import {gerarInput,estInicial, reset} from '../../components/Input/Input';
import { Content, Form, Footer,Caixa } from './styles';
export default class Cadastro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            loading: false,

        };
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        const data = new FormData();
        data.append('username', this.state.username);
        data.append('email', this.state.email);
        data.append('password', this.state.password);
        try {
            await api.post(`/registrar/`, data);
            toast.success('Usuário inserido com sucesso');
            this.setState({ loading: false });
            this.props.history.push('/login');
        } catch (error) {
            toast.error('Falha ao inserir usuário');
            this.setState({ loading: false });
        }
    };
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })

    }
    render() {
        const { loading } = this.state;
        return (
            <>                
<Content>
           <Caixa>
                    <Form  method="POST" onSubmit={this.handleSubmit}  >
                        <h1>Criar sua conta</h1>
                        {gerarInput("username","text","Nome",(e)=>this.handleChange(e),this.state.username,estInicial.verfName)}
                        {gerarInput("email","text","Email",(e)=>this.handleChange(e),this.state.email,estInicial.verfEmail)}
                        {gerarInput("password","password","Senha",(e)=>this.handleChange(e),this.state.password,estInicial.verfPassword)}
                        <button type="submit"> {loading ? 'Carregando...' : 'Cadastrar'}</button>
                    </Form>
                                
           </Caixa>                    
            <Footer>
                    Já cadastrou sua banda? <Link to="/login" onClick={reset()}>Faça o seu login agora</Link>
            </Footer>
</Content>

                
            </>
        );
    }
}
