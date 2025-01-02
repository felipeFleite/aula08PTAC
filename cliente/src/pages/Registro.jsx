import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Registrar() {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [date, setDate] = useState('');
  const [autor, setAutor] = useState('');
  const [qPaginas, setQPaginas] = useState('');
  const [genero, setGenero] = useState('');
  const [idioma, setIdioma] = useState('');

  const navigation = useNavigate();

  const registrarDados = async (event) => {
    event.preventDefault();

    try {
      const resposta = await fetch('http://localhost:3000/livros', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          preco,
          data: date,
          autor,
          quantidadePaginas: qPaginas,
          genero,
          idioma
        })
      });

      if (resposta.ok) {
        alert('Livro registrado com sucesso!');
        navigation('/');
      } else {
        alert('Erro ao registrar o livro. Verifique os campos.');
      }
    } catch (error) {
      console.error('Erro ao registrar os dados:', error);
      alert('Ocorreu um erro. Tente novamente mais tarde.');
    }
  };

  return (
    <main>
      <form onSubmit={registrarDados}>
        <input type="text" id="nome" value={nome} onChange={(event) => setNome(event.target.value)} required />

        <input type="date" id="date" value={date} onChange={(event) => setDate(event.target.value)} required />

        <input type="number" id="preco" value={preco} onChange={(event) => setPreco(event.target.value)} required />

        <input type="text" id="autor" value={autor} onChange={(event) => setAutor(event.target.value)} required />

        <input type="number" id="qPaginas" value={qPaginas} onChange={(event) => setQPaginas(event.target.value)} required />

        <input type="text" id="genero" value={genero} onChange={(event) => setGenero(event.target.value)} required />

        <input type="text" id="idioma" value={idioma} onChange={(event) => setIdioma(event.target.value)} required />

        <button type="submit">Registrar</button>
      </form>
    </main>
  );
}
