import { useEffect, useState } from "react";
import '../estilizacao/Home.css'
import { jsPDF } from "jspdf"
import "jspdf-autotable"
import { Button } from '@mui/material'
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function Home() {

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        const resposta = await fetch("http://localhost:3000/livros");
        const dados = await resposta.json();
        setUsuarios(dados);
      } catch {
        alert('Ocorreu um erro no app!');
      }
    }
    buscarUsuario();
  }, [usuarios])

  const removerLivro = async (id) => {
    try {
      await fetch('http://localhost:3000/livros/' + id, {
        method: "DELETE"
      })
    } catch {
      alert("deu erro")
    }
  }

  const exportarPDF = () => {
    const doc = new jsPDF()
    const tableData = usuarios.map((usuario) => [
      usuario.nome,
      usuario.preco,
      usuario.date,
      usuario.autor,
      usuario.qPaginas,
      usuario.genero,
      usuario.idioma,
    ])

    doc.text("Lista de Livros", 10, 10)
    doc.autoTable({
      head: [["Nome", "Preço", "Data de lançamento", "Autor", "Páginas", "Gênero", "Idioma"]],
      body: tableData,
    })


    doc.save('livros.pdf')
  }

  return (
    <>
      <Button variant="outlined" onClick={() => exportarPDF()}>Gerar PDF</Button>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Data de lançamento</th>
            <th>Autor</th>
            <th>Quantidade de páginas</th>
            <th>Gênero</th>
            <th>Idioma</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.nome}</td>
              <td>{usuario.preco}</td>
              <td>{new Date(usuario.date).toLocaleDateString()}</td>
              <td>{usuario.autor}</td>
              <td>{usuario.qPaginas}</td>
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
