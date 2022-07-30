import React, { Component } from 'react';
import api from '../../services/api';
import { Conteudo,  Body} from './styles';
import { toast } from 'react-toastify';
import HeaderDocAndRepo from '../../components/HeaderDocAndRepo';
import Editor from '../../components/Editor';

export default class Topico extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isAdmin:false,
            token:'',
            id : -1
        };
        
    };
    
    async componentDidMount() {
        const token = localStorage.getItem('token');
        api.defaults.headers.Authorization = `Bearer ${token}`;
        const id = localStorage.getItem('id');
        this.setState({ token, id });

    }
    render() {
        const {isAdmin} = this.state;
        
        return (
            <>
                <Conteudo>
                    <HeaderDocAndRepo/>
                    <Body >
                        <h4 className="mb-3">Crie uma nova pagina</h4>
                    <Editor />
                            
                    </Body>
                    

                </Conteudo>
            </>
        );
    }
}

