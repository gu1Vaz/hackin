import React, { Component } from 'react';
import {FaSearch,  FaSignOutAlt} from 'react-icons/fa';
import { Container} from './styles';
import { Navbar,NavDropdown} from 'react-bootstrap';
import {url} from '../../scripts/config'
import { Link } from 'react-router-dom';
export default class Header extends Component{
    logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('user');
        localStorage.removeItem('type');
        localStorage.removeItem('id');
        window.location.href = '/login';
    }
    render(){
        const id = localStorage.getItem('id');
        const user = localStorage.getItem('user');

        return (
            <Container>
            <Navbar  style={{background:"#24292E",height:"62px",padding:"0 36px 0 36px"}} >
                <Navbar.Brand><Link to="/" ><img className="icon" src={url+"imgs/icon.png"} alt=""></img></Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <div className=" w-25 barraBusca input-group-sm shadow-sm d-flex flex-row align-items-center">
                            <input name="busca" id="busca" type="text" className=" rounded-0 form-control card bg-white w-85 border-0"   placeholder="Digite aqui sua busca..." />
                            <div className="input-group-append">
                            <button type="submit" className="btn card bg-white  rounded-0 border-0  d-flex flex-row align-items-center justify-content-center"><FaSearch/></button>
                            </div>
                        </div>     
                </Navbar.Collapse>
                {id > 0 &&
                                <div>
                                    <strong>{user}</strong>
                                    <button type = "button" onClick={this.logout}>
                                        <FaSignOutAlt/>
                                    </button>
                                </div>
                            }

                <NavDropdown   alignRight={true} id="basic-nav-dropdown">
                        <NavDropdown.Item >Action</NavDropdown.Item>
                        <NavDropdown.Item>Another action</NavDropdown.Item>
                        <NavDropdown.Item >Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item >Separated link</NavDropdown.Item>
                    </NavDropdown>
            </Navbar>
                
            </Container>
        );
    }
}
