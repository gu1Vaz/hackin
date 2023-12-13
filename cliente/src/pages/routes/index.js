import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import Login from '../Login';
import LoginAdmin from '../LoginAdmin';
import Cadastro from '../Cadastro';
import NovoHack from '../NovoHack';
import ViewRepo from '../ViewRepo';
import ViewPasta from '../ViewPasta';
import ViewDocum from '../ViewDocum';
import Principal from '../Principal';
import ViewPerfil from '../ViewPerfil'
import meuPerfil from '../meuPerfil'
import Topico from '../Topico';

export default function Routes() {
    return (
        <Switch>
            <Route path="/" isPrivateAndPublic exact component={Principal}/>
            <Route path="/verRepo/:id" isPrivateAndPublic component={ViewRepo} />
            <Route path="/verPasta/:id/:hack_id" isPrivateAndPublic component={ViewPasta} />
            <Route path="/verDocum/:id" isPrivateAndPublic component={ViewDocum} />
            <Route path="/verPerfil/:id" isPrivateAndPublic component={ViewPerfil} />


            <Route path="/login" component={Login} />
            <Route path="/cadastrar" component={Cadastro} />
            <Route path="/loginAdmin"  component={LoginAdmin} />

            <Route path="/novoHack" isPrivate component={NovoHack} />
            <Route path="/meuPerfil" isPrivate component={meuPerfil} />
            <Route path="/topico/:oqFazer/:id/:documentacao_id" isPrivate component={Topico} />
            
        </Switch>
    );
}