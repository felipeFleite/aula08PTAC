import { useState } from "react";
import{ useNavigate } from "react-router-dom"

export default function Registrar() {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [date, setDate] = useState('');
  const [autor, setAutor] = useState('');
  const [qPaginas, setQPaginas] = useState('');
  const [genero, setGenero] = useState('');
  const [idioma, setIdioma] = useState('');

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
        
        <input type="date" name='' id="" value={date} onChange={(event) => setDate(event.target.value)}/>
      
        <input type="number" name='' id="" value={preco} onChange={(event) => setPreco(event.target.value)}/>

        <input type="text" name='' id="" value={autor} onChange={(event) => setAutor(event.target.value)}/>

        <input type="number" name='' id="" value={qPaginas} onChange={(event) => setQPaginas(event.target.value)}/>

        <input type="text" name='' id="" value={genero} onChange={(event) => setGenero(event.target.value)}/>

        <input type="text" name='' id="" value={idioma} onChange={(event) => setIdioma(event.target.value)}/>
        <button>Registrar</button>
      
      </form>
    </main>
  );
}
