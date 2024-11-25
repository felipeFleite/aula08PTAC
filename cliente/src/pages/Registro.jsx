import { useState } from "react";

export default function Registrar() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const registrarDados = async (event) => {
    event.preventDefault(); 

    try {
      await fetch('http://localhost:3000/usuarios', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: nome,
          email: email
        })
      });
    } catch (error) {
      alert('Ocorreu erro na aplicação');
    }
  };

  return (
    <main>
      <form onSubmit={registrarDados}>
      
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)}/>
        
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
      
        <button type="submit">Registrar</button>
      
      </form>
    </main>
  );
}
