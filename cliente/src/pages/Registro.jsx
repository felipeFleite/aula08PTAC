import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import '../estilizacao/Registrar.css';
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

  const navigate = useNavigate();

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
        alert("Livro registrado com sucesso!");
        navigate("/");
      } else {
        alert("Erro ao registrar o livro. Verifique os campos.");
      }
    } catch (error) {
      console.error("Erro ao registrar os dados:", error);
      alert("Ocorreu um erro.");
    }
  };

  return (
    <main>
      <div id="flecha">
        <ArrowBackIcon
          onClick={() => navigate("/")}
          style={{
            cursor: "pointer",
            fontSize: "30px",
            marginRight: "10px",
            color: "#1976d2",
          }}
        /></div>
        <h1>Registrar Livro</h1>

      <form onSubmit={registrarDados} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input type="text" id="nome" placeholder="Nome" value={livro.nome} onChange={attvalue} required />
        <input type="date" id="date" value={livro.date} onChange={attvalue} required />
        <input type="number" id="preco" placeholder="Preço" value={livro.preco} onChange={attvalue} required />
        <input type="text" id="autor" placeholder="Autor" value={livro.autor} onChange={attvalue} required />
        <input type="number" id="qPaginas" placeholder="Quantidade de Páginas" value={livro.qPaginas} onChange={attvalue} required />
        <input type="text" id="genero" placeholder="Gênero" value={livro.genero} onChange={attvalue} required />
        <input type="text" id="idioma" placeholder="Idioma" value={livro.idioma} onChange={attvalue} required />
        <button type="submit" style={{ padding: "10px", backgroundColor: "#1976d2", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Registrar
        </button>
      </form>
    </main>
  );
}
