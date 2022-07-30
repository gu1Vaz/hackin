import React, {Component} from 'react'
import api from '../../services/api'

export default class ViewPerfil extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            dados : []
        }
    }
    async componentDidMount(){
        try{
            const dados = await api.get(`/verUser/`+this.props.match.params.id);
            this.setState(dados);
        }
        catch(e){

        }
    }
    render(){
        return(
            <>
           
            </>
        )
    }
}