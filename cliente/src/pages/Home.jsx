import { useEffect, useState } from "react";
import '../estilizacao/Home.css';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Button, TextField } from '@mui/material';
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

export default function Home() {

  const [usuarios, setUsuarios] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        const resposta = await fetch("http://localhost:3000/livros");
        const dados = await resposta.json();
        setUsuarios(dados);
      } catch {
        alert('Ocorreu um erro no app!');
      } finally {
        setLoading(false);
      }
    };
    buscarUsuario();
  }, [usuarios]);

  const removerLivro = async (id) => {
    try {
      await fetch('http://localhost:3000/livros/' + id, {
        method: "DELETE"
      })
    } catch {
      alert("Ocorreu um erro!")
    }
  }

  const exportarPDF = () => {
    const doc = new jsPDF();
    const tableData = usuarios.map((usuario) => [
      usuario.titulo,
      usuario.preco,
      usuario.autor,
      usuario.paginas,
      usuario.genero,
      usuario.idioma,
    ]);

    doc.text("Lista de Livros", 10, 10);
    doc.autoTable({
      head: [["Título do Livro", "Preço", "Autor", "Páginas", "Gênero", "Idioma"]],
      body: tableData,
    });

    doc.save('Lista de livros.pdf');
  };

  if (loading) {
    return (
      <div className="load">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className="botao-navegar">
        <Button
          variant="contained"
          className="Comeco"
          onClick={() => navigate('/registrar')}>
          Ir para Registro
        </Button>

        <Button variant="outlined" onClick={() => exportarPDF()}>
          Gerar PDF
        </Button>

        <TextField className="text-field"
          label="Pesquisar"
          variant="outlined"
          size="big"
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Título do Livro</th>
            <th>Preço</th>
            <th>Autor</th>
            <th>Quantidade de páginas</th>
            <th>Gênero</th>
            <th>Idioma</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length === 0 && (
            <tr>
              <td colSpan={"7"}>
                Nenhum livro encontrado.
              </td>
            </tr>
          )}
          {usuarios.map((usuario) => (
            <tr key={usuario.id} className={ (pesquisa.trim() && (usuario.titulo.toLowerCase().includes(pesquisa.toLowerCase())
             || usuario.preco.toString().includes(pesquisa)) ? "destaque" : "")}>
              <td>{usuario.titulo}</td>
              <td>{parseFloat(usuario.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
              <td>{usuario.autor}</td>
              <td>{usuario.paginas}</td>
              <td>{usuario.genero}</td>
              <td>{usuario.idioma}</td>
              <td>
              <button className="remover" onClick={() => removerLivro(usuario.id)}>
                  <DeleteIcon /> Remover
                </button>
                <Link to={'/alterar/' + usuario.id}>
                  <button className="alterar">
                    <EditIcon /> Alterar
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
