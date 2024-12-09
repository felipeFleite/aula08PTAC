import { useState } from "react";
import{ useNavigate } from "react-router-dom"

export default function Registrar() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const navigation = useNavigate()
  
  const registrarDados = async (event) => {
    event.preventDefault(); 

    try {
      const resposta = await fetch('http://localhost:3000/usuarios', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: nome,
          email: email
        })
      });
      if(resposta.ok){
        navigation('/')
      }
    } catch (error) {
      alert('Ocorreu erro na aplicação');
    }
  };

  return (
    <main>
      <form onSubmit={registrarDados}>
      
        <input type="text" name='' id="" value={nome} onChange={(event) => setNome(event.target.value)}/>
        
        <input type="email" name='' id="" value={email} onChange={(event) => setEmail(event.target.value)}/>
      
        <button>Registrar</button>
      
      </form>
    </main>
  );
}
