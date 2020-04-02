import React, {useState,useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';//com isso não dará loading na tela , apenas abrirá a rota
import {FiPower,FiTrash2} from 'react-icons/fi';
import './style.css';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg'

export default function Profile(){
    const [incidents,setIncidents] = useState([]); //grava as respostas dentro dele
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
    const history = useHistory();
 
    // faz tipo um reload
    useEffect(() => {
        api.get('profile', {
            headers:{
                Authorization: ongId,
        }
            
        }).then(response => {
            setIncidents(response.data);
        })
    },[ongId]);

    //deletar um incident pelo icone da lixeira
    async function handleDeleteIncident(id){
        try {
            await api.delete(`incidents/${id}`,{
                headers:{
                    Authorization: ongId,}
            });
          //  para atualizar os itens deletados em tela
          setIncidents(incidents.filter(incident => incident.id != id));

          

        } catch (error) {
            alert('Erro ao deletar caso, tente novamente');
        }

    }

        //fazendo o logout pelo icone desligar
        function handleLogout(){
            //limpa todos os storages (seriam as sessoes, ids)
            localStorage.clear();
            history.push('/');
        }
    return(
     <div className="profile-container">
        <header>
            <img src={logoImg} alt="Be the Hero"/>
            <span>Bem vindo, a {ongName}</span>
            <Link to="/incidents/new" className="button">Cadastrar novo caso</Link>
            <button type="button" onClick={handleLogout}>
                <FiPower size={18} color="#e02041"></FiPower>
            </button>
        </header>
        <h1>Casos Cadastrados</h1>

        <ul>
            {incidents.map(incident => (
                <li key={incident.id}>
                <strong>Caso: </strong>
                <p>{incident.title}</p>

                <strong>Descrição</strong>
                <p>{incident.description}</p>

                <strong>Valor:</strong>
                <p> {Intl.NumberFormat('pt-BR',{style:'currency',currency: 'BRL'}).format(incident.value)}</p>
                <button type="button" onClick={()=> handleDeleteIncident(incident.id)}>
                    <FiTrash2 size={20} color="#a8a8b3"/>
                </button>
            </li>
            ))}
           
        </ul>
     </div>
    );
}