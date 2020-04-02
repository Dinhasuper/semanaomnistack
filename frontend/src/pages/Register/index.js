/* Por padrão cada página dessa deve ter essa estrutura
   importar o react normalmente
   e exportar uma função referente
*/
import React, {useState} from 'react';
import api from '../../services/api';

import './style.css';
import logoImg from '../../assets/logo.svg';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

export default function Register(){

 const [name,setName] = useState('');
 const [email,setEmail] = useState('');
 const [whatsapp,setWhattsApp] = useState('');
 const [city,setCidade] = useState('');
 const [uf,setUF] = useState('');

 const history = useHistory();

  async function handleRegister(e){
     e.preventDefault();
    
     const data = {
        name,
        email,
        whatsapp,
        city,
        uf
    };

  
    try {
      const response = await api.post('ongs',data);

      alert(`Seu ID de acesso: ${response.data.id}`);
      //volta para tela inicial logo após o cadastro
      history.push('/');
    } catch (error) {
      alert('Erro ao cadastrar Ong');
    }
  

   }

    return(
       <div className="register-container">
           <div className="content">
               <section>
                <img src={logoImg} alt="Be the Hero" />
                <h1>Cadastro</h1>
                <p>Faça o seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
               
                <Link className="back-link" to="/">
               <FiArrowLeft size={16} color="#e02041"></FiArrowLeft>
                Já tenho cadastro
            </Link>
               </section>
               <form onSubmit={handleRegister}>
                   <input placeholder="Nome da ONG"
                     value={name}
                     onChange={e => setName(e.target.value)}
                   />
                   <input type="email" placeholder="E-mail"
                     value={email}
                     onChange={e => setEmail(e.target.value)}
                   />
                   <input  placeholder="WhatsApp"
                     value={whatsapp}
                     onChange={e => setWhattsApp(e.target.value)}
                   />
                   <div className="input-group">

                    <input placeholder="Cidade"
                      value={city}
                      onChange={e => setCidade(e.target.value)}
                    />
                    <input placeholder="UF" style={{width:80}}
                      value={uf}
                      onChange={e => setUF(e.target.value)}
                    />
                   </div>
                   <button className="button" type="submit">Cadastrar</button>
                   
               </form>
           </div>
       </div>
    )
}