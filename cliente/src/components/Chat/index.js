import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { FormControl } from 'react-bootstrap';
import { BiSend,BiExit } from 'react-icons/bi';
import { DivChat, DivMessages, DivUsers, Nav, Body, Footer, Message, Text, By, TextAdmin, TextUser } from './styles';
import {scrollingChat} from '../../scripts/jqueryFunctions';

const Chat = (props) => {
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const room = props.room;
    setRoom(room);

    props.socket.emit(props.opcao, [room,props.max], (error) => {
      if (error) {
        setError(true);
        toast.error(error);
        props.setError(error);
      }
    });

  }, []);
  useEffect(() => {
    props.socket.on("message", (response) => {
      setMessages(messages => [...messages, { "user": response.user, "text": response.text }]);
      scrollingChat("DivMessages",1000);      
    });
    props.socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);
  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      props.socket.emit('sendMessage', message);
      setMessage("");
    }
  }
  const setUserColor = (user) => {
    if (user === "admin") {
      return <TextAdmin>{user}</TextAdmin>
    } else {
      return <TextUser><strong>{user}</strong></TextUser>
    }
  }
  const formatarMsg = (msg)=>{
    return msg.substring(0,90)+"\n"+msg.substring(90,-1);
}
  const setMessageColor = (user, msg) => {
    if (user === "admin") {
      return <TextAdmin>{msg}</TextAdmin>
    } else {
      if(msg.length>90){
        return <TextUser>{formatarMsg(msg)}</TextUser>
      }else{
        return <TextUser>{msg}</TextUser>
      }
    }
  }
  const sair = ()=>{
    props.socket.emit("leave", (error) => {
      if (error) {
        setError(true);
        toast.error(error);
        props.setError(error);
      }
    });
    toast.info(`Voce saiu de ${room} `);
    props.setError("saiu");
  }
  return (
    <>
      {!error &&
        <DivChat className="card">
          <Nav>
            <h5>[{room}]</h5>
            <BiExit onClick={sair} />
          </Nav>
         
          <Body>
            <DivMessages  id="DivMessages" className="overflow-auto ">
              {messages.map(message =>
                <Message>
                  <By>{setUserColor(message.user)}</By>
                  <Text>{setMessageColor(message.user, message.text)}</Text>
                </Message>
              )}
            </DivMessages>
            <hr />
            <DivUsers>
              {users.map(user => <strong>{user.name}</strong>)}
            </DivUsers>
          </Body>
          <Footer>
            <FormControl
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => { if (e.key === 'Enter') { sendMessage(e) } }}
              placeholder="..."
              className="w-75 border-0 "
              value={message}
              name="message"
            />
            <BiSend onClick={sendMessage} />
          </Footer>
        </DivChat>
      }
    </>
  );
};

export default Chat;