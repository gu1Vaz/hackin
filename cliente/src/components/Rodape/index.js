import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container} from './styles';
import {url} from '../../scripts/config.js'

export default class Rodape extends Component{
    render(){

        return (
            <Container>
            <img className="icon" src={url+"imgs/icon_dark.png"} alt=""></img>
            <span>© 2020  Hackin.inc</span>
            <Link>Termos</Link>
            <Link>Privacidade</Link>
            <Link>Segurança</Link>
            <Link>Status</Link>
            <Link>Ajuda</Link>
            <Link>FeedBack</Link>
            <Link>Contate Hackin</Link>
            <Link>Sobre</Link>
            
                
            </Container>
        );
    }
}
