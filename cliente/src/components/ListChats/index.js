import React, { Component } from "react";
import io from "socket.io-client";
import Chat from "../Chat";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import api from "../../services/apiMsg";
import { toast } from "react-toastify";
import { DivListChat, Botoes, Nav } from "./styles";
import { typyngInputListener } from "../../scripts/jqueryFunctions";
const servidor = "http://localhost:8090";

export default class ListChats extends Component {
  constructor(props) {
    super(props);
    this.toSala = this.toSala.bind(this);
    this.setNameInServer = this.setNameInServer.bind(this);
    this.setError = this.setError.bind(this);
    this.viewTroca = this.viewTroca.bind(this);
    this.state = {
      chat: null,
      name: localStorage.getItem("nickInChat"),
      room: "",
      max: 2,
      opcao: "join",
      inChat: false,
      isCreating: false,
      btnText: "Novo",
      list: [],
      change:false,
      loading: false,
      error: null,
    };
    this.socket = io(servidor);
  }
  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  async componentDidMount() {
    let nick = this.state.name;
    if (!nick) {
      let rand = parseInt(1 + Math.random() * (10000 - 1));
      nick = "guest_" + rand;
      localStorage.setItem("nickInChat", nick);
      this.setState({ name: nick });
    }
    this.socket.emit("connct", [nick], (error) => {
      if (error) {
        toast.error(error);
      }
    });
    this.setState({ loading: true });
    try {
      const list = await api.get("/getSalas/");
      this.setState({ list: list.data, loading: false });
    } catch (e) {
      toast.error("Não foi possivel carregar as salas");
    }
    this.socket.on("listData", (response) => {
      this.setState({list:response.rooms});   
    });
    typyngInputListener("inputName", this.setNameInServer, 1000);
  }
  async componentDidUpdate(_, prevState) {
      if (prevState.change !== this.state.change) {
        try{
          const list = await api.get("/getSalas/");
          console.log(list.data);
          this.setState({ list: list.data});
        }catch(e){
           toast.error("Não foi possivel carregar as salas");
        }
        typyngInputListener("inputName", this.setNameInServer, 1000);
      }
  };
  setNameInServer() {
    let inputName = document.getElementById("inputName");
    this.socket.emit("set_name", [this.state.name], (response) => {
      if (response[0] == "error") {
        toast.error(response[1]);
        inputName.style.borderColor = "#ff3333";
      } else {
        toast.success("Nickname alterado");
        inputName.style.borderColor = "#99ff33";
      }
    });
    localStorage.setItem("nickInChat", this.state.name);
  }
  setError (msg){
    this.setState({ error: msg });
    this.setState({ inChat: false, chat: <div />});
    this.state.change?this.setState({change:false}):this.setState({change:true});
  };
  toSala(sala) {
    this.setState({
      inChat: true,
      chat: (
        <Chat
          setError={this.setError}
          socket={this.socket}
          max={this.state.max}
          name={this.state.name}
          room={sala}
          opcao={this.state.opcao}
        />
      ),
    });
  }

  viewTroca() {
    this.state.isCreating
      ? this.setState({ isCreating: false, btnText: "Novo", opcao: "join" })
      : this.setState({ isCreating: true, btnText: "Chats", opcao: "create" });
  }
  componentWillUnmount(){
    this.socket.disconnect();
  }
  render() {
    const { chat, list, inChat, isCreating, btnText, loading } = this.state;
    let title, chats;
    isCreating? (title = <h6>Criar novo chat:</h6>): (title = <h6>Chats:</h6>);
    isCreating
      ? (chats = [
          <InputGroup className="mb-3 mt-3 ">
            <FormControl
              onChange={this.handleInputChange}
              value={this.state.max}
              name="max"
              as="select"
            >
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
            </FormControl>
            <FormControl
              onChange={this.handleInputChange}
              className="w-90"
              maxLength={22}
              placeholder="Nome do chat"
              value={this.state.room}
              name="room"
            />
          </InputGroup>,
          <Button size="sm" onClick={() => this.toSala(this.state.room)}>
            Criar
          </Button>,
        ])
      : (chats = (
          <ul class="list-group list-group-flush overflow-auto h-100">
            {list.map((sala) => (
              <li
                class="list-group-item"
                onClick={() => this.toSala(sala.nome)}
              >
                {sala.nome}
                <strong>
                  {sala.count}/{sala.max}
                </strong>
              </li>
            ))}
          </ul>
        ));
    return (
      <>
        {inChat ? (
          chat
        ) : (
          <DivListChat >
            <Nav>
              <div className="d-flex flex-row w-75">
                {title}
                <Button size="sm" onClick={this.viewTroca}>
                  {btnText}
                </Button>
                <InputGroup className="ml-3  divNickname">
                  <FormControl
                    onChange={this.handleInputChange}
                    placeholder="Nickname"
                    onSeeked={this.setName}
                    maxLength={24}
                    size="sm"
                    value={this.state.name}
                    name="name"
                    id="inputName"
                  />
                </InputGroup>
                {loading && (
                  <div className="spinner-border-sm text-danger " role="status"></div>
                )}
              </div>
              <Botoes>
          
              </Botoes>
            </Nav>
            {chats}
            {chat}
          </DivListChat>
        )}
      </>
    );
  }
}
