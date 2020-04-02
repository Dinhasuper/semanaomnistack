import React, {useState} from 'react';

import api from '../../services/api';
import {Link, useHistory} from 'react-router-dom';//com isso não dará loading na tela , apenas abrirá a rota
import {FiLogIn} from 'react-icons/fi';
import './style.css';
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';



export default function Logon(){
  
  const [id,setId] = useState('');
  const history = useHistory('');

 async function handleLogin(e){
    e.preventDefault();//para evitar um redirect

    try {
      const response = await api.post('sessions', {id});

      //mantém disponivel na aplicação
      localStorage.setItem('ongId',id);
      localStorage.setItem('ongName',response.data.name);

     // console.log(response.data.name)
      history.push('/profile');//direciona para a rota profile
    } catch (error) {
      alert('Falha no login');
    }
  }

    return(
      <div className="logon-container">
        <section className="form">
            <img src={logoImg} alt="Be the Hero"/>
            <form onSubmit={handleLogin}>
            <h1>Faça o seu Logon</h1>
            <input placeholder="Sua ID"
            value={id}
            onChange={e=>setId(e.target.value)}
            />
            <button type="submit" className="button">Entrar</button>

            <Link className="back-link" to="/register">
               <FiLogIn size={16} color="#e02041"></FiLogIn>
               Não tenho cadastro
            </Link>
            
        </form>
        </section>
        <img src={heroesImg} alt="Heroes"/>
       
      </div>

    );
}