import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Registrar() {
  const [livro, setLivro] = useState({
    nome: "",
    preco: "",
    date: "",
    autor: "",
    qPaginas: "",
    genero: "",
    idioma: "",
  });

  const navigation = useNavigate();

  const attvalue = (event) => {
    const { id, value } = event.target;
    setLivro({
      ...livro,
      [id]: value,
    });
  };

  const registrarDados = async (event) => {
    event.preventDefault();

    try {
      const resposta = await fetch("http://localhost:3000/livros", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: livro.nome,
          preco: livro.preco,
          data: livro.date,
          autor: livro.autor,
          quantidadePaginas: livro.qPaginas,
          genero: livro.genero,
          idioma: livro.idioma,
        }),
      });

      if (resposta.ok) {
        alert('Livro registrado com sucesso!');
        navigation('/');
      } else {
        alert('Erro ao registrar o livro. Verifique os campos.');
      }
    } catch (error) {
      console.error('Erro ao registrar os dados:', error);
      alert('Ocorreu um erro.');
    }
  };

  return (
    <main>

    <h1>Registrar Livro</h1>

      <form onSubmit={registrarDados}>
        <input type="text" id="nome" value={livro.nome} onChange={attvalue} required />

        <input type="date" id="date" value={livro.date} onChange={attvalue} required />

        <input type="number" id="preco" value={livro.preco} onChange={attvalue} required />

        <input type="text" id="autor" value={livro.autor} onChange={attvalue} required />

        <input type="number" id="qPaginas" value={livro.qPaginas} onChange={attvalue} required />

        <input type="text" id="genero" value={livro.genero} onChange={attvalue} required />

        <input type="text" id="idioma" value={livro.idioma} onChange={attvalue} required />

        <button type="submit">Registrar</button>
      </form>
    </main>
  );
}
