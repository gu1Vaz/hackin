import React, { useCallback, useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import api from '../../services/api';
import Wysiwyg from "./Wisiwyg"
import{useParams, useHistory} from "react-router-dom"
import "./styles.css";

const Editor = () => {
  
  const { handleSubmit, control } = useForm({ mode: "onChange" });
  const {oqFazer,id,documentacao_id} = useParams();
  const [texto, setTexto] = useState(undefined);
  const [nome, setNome] = useState();
  const history = useHistory();
  useEffect(() => {
    if (id > -1) {
      async function loadTexto() {
        const response = await api.get(`verTopico/${id}`);
        setTexto(response.data.texto);
        setNome(response.data.nome);
      }
      loadTexto(id);
    }
  }, [id]);

  const onSubmit = useCallback(async ({ texto }) => {
    try {
      const nome = document.getElementById("nomin")
      if(oqFazer == "novo"){
        const data = new FormData();
        if(texto != undefined){
          data.append('texto', texto );
        }
        data.append('nome', nome.value );
        data.append('documentacao_id', documentacao_id);
        await api.post(`/topico/`,data);
        toast.success('Topico criado');
      }else{
        const data = new FormData();
        data.append('texto', texto );
        data.append('nome', nome.value );
        data.append('documentacao_id', documentacao_id);
        await api.put('/topico/'+id,data);
        toast.success('Topico editado');
      }
      history.push('/verDocum/'+documentacao_id);
      
    } catch (error) {
      error.response.data.forEach(element => {
        toast.error(element.message);
    });
      
    }
  }, []);
  return (
    <form method="POST" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-group input-group-sm mb-3">
         <input className="form-control rounded"  value={nome} onChange={(e)=>{setNome(e.target.value)}} name="nome" id="nomin" />
      </div>
      <div className="form-group">
        <Controller as={<Wysiwyg initial={texto} />} name="texto" control={control} />
      </div>
      <div className="d-flex flex-row justify-content-end w-100">
        <button  className="btn btn-sm btn-success mb-5" type="submit">
          <i className="fa fa-save"></i> Salvar alterações
        </button>
      </div>
    </form>
  );
};

export default Editor;