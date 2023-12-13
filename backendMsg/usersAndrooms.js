const users = [];
const rooms = [{count:0, max:10, nome:"brasil"},{count:0, max:10, nome:"eua"},{count:0, max:10, nome:"russia"}];

//Salas
const addRoom = ({id,room,max }) => {
  //dados
  if(!room || room.length>22) return { error: 'Nome da Sala > 22 ou em falta' };
  if(!max || max>7) return { error: 'Qtd de pessoas > 7 ou em falta' };

  const nameSala = room.trim().toLowerCase();

  const user = users.find((user) => user.id === id);
  const existingRoom = rooms.find(obj => obj.nome == nameSala );
  const index = users.findIndex((user) => user.id === id);

  //user
  if(!user) return {error:'Você não esta no servidor,recarregue a pagina'};
  if(user.room != null) return {error:'Já esta em uma sala'};
  //room
  if(existingRoom) return { error: 'Sala ja existe' };

  const sala = { count:1, max, nome:nameSala};

  rooms.push(sala);
  users[index].room = sala.nome;

  return { sala };
}
const inRoom = ({id,room }) => {
  //dados
  if(!room) return { error: 'Nome da Sala é requirido' };
  
  nameSala = room.trim().toLowerCase();

  const user = users.find((user) => user.id === id);
  const index = users.findIndex((user) => user.id === id);
  const existingRoom = rooms.find(obj => obj.nome == nameSala );
  const sala = rooms.find(obj => obj.nome == nameSala);
  const index2 = rooms.findIndex(obj => obj.nome == nameSala);

  //user
  if(!user) return {error:'Você não esta no servidor,recarregue a pagina'};
  if(user.room != null) return {error:'Já esta em uma sala'};
  //room
  if(!existingRoom) return { error: 'Sala nao existe' };
  if(sala.count == sala.max) return { error: 'Sala esta cheia' };

  
  rooms[index2].count+=1;
  users[index].room = room;

  return{user};
  
}
const leaveRoom = ({id }) => {
  const user = users.find((user) => user.id === id);
  const index = users.findIndex((user) => user.id === id);
  //user
  if(!user) return {error:'Você não esta no servidor,recarregue a pagina'};
  if(user.room == null) return {error:'Não esta em nenhuma sala'};
  
  const index2 = rooms.findIndex(obj => obj.nome == user.room);

  rooms[index2].count -= 1;
  if(rooms[index2].count === 0 && rooms[index2].max<10){rooms.splice(index2, 1)[0]}
  
  const sala = user.room;
  users[index].room = null;
  return {user,sala};
}
const getSalas = () => {
  //return [rooms,users];
  return rooms;
}

//Users
const addUser = ({ id, name }) => {
  //dados
  if(!name ) return { error: 'Nome > 24 ou em falta' };

  name = name.trim().toLowerCase();

  const existingUser = users.find((user) => user.name === name);

  //user
  if(existingUser) return { error: 'Nome em uso.' };

  const user = { id, name,room:null};

  users.push(user);
  
  return { user };
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) {
    const userRemoved = users.splice(index, 1)[0];
    if(userRemoved.room != null){
      const usersInSala = users.find(user => user.room == userRemoved.room);
      const index = rooms.findIndex((room) => room.nome === userRemoved.room); 
      if (!usersInSala && rooms[index].max<10) {
        rooms.pop(index,1);
      }else{
        rooms[index].count -=1;
      };
    }
    return userRemoved
  };
}
const setNameUser = ({ id, name }) => {
  //dados
  if(!name ) return { error: 'Não foi possivel definir esse nome' };

  name = name.trim().toLowerCase();

  const index = users.findIndex((user) => user.id === id);
  const nameIsUsed = users.find((user) => user.name === name);
  
  //user
  if(index === -1) return { error: 'Você não esta no servidor,recarregue a pagina' };
  if(users[index].room !== null) return { error: 'Não é possivel definir nome dentro de uma sala' };
  if(nameIsUsed) return { error: 'Nome em uso.' };

  users[index].name = name;
  return { success:"nome alterado" };
}
const getUser = (id) => users.find((user) => user.id === id);

const getUsers = () => { return users;}
const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = {removeUser, addUser,setNameUser,getUsersInRoom,getSalas,getUsers,addRoom,inRoom,getUser,leaveRoom};