import { useEffect, useState } from "react";
import { jsPDF } from "jspdf"
import "jspdf-autotable"
import { Button } from '@mui/material'
import { Link } from "react-router-dom";
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
    try{ 
      await fetch('http://localhost:3000/livros/' +id ,{
        method: "DELETE"
      })
  }catch{
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

    doc.text("Lista de Livros",10,10)
    doc.autoTable({
      head: [["Nome","E-mail"]],
      body: tableData,
    })

    doc.save('livros.pdf')
  }

  return (
    <>
    <Button variant="outlined" onClick={() => exportarPDF()}>Gerar PDF</Button>
    <table>
      <tr>
        <td>Nome</td>
        <td>E-mail</td>
      </tr>
      {usuarios.map((usuario) =>
        <tr key={usuario.id}>
          <td>{usuario.nome}</td>
          <td>{usuario.preco}</td>
          <td>{usuario.date}</td>
          <td>{usuario.autor}</td>
          <td>{usuario.qPaginas}</td>
          <td>{usuario.genero}</td>
          <td>{usuario.idioma}</td>
          <td><button onClick={() =>removerLivro(usuario.id)}>X</button></td>
          <td>
          <Link to={'/alterar/' + usuario.id}>
          <button>Alterar</button>
          </Link>
          </td>
        </tr>
      )}
    </table>
    </>
  );
}