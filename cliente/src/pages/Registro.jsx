import { useState, useEffect } from "react";

export default function Registrar() {
  const [nome, setNome] = useState([])
  const [email, setEmail] = useState([])

    useEffect(() => {
      const registrarDados = async () => {
        event.preventDefault()
        try{
          await fetch('https://localhost:3000/usuarios'),{ 
          method : 'POST',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify({
            nome: nome,
            email: email
          })
        })
      } catch{
          alert('Ocorreu erro na aplicação')
      }
  }
}


  return (
    <main>
    <form onSubmit="registrarDados()">

      <input onchange="registrarDados()" type="text" value={nome}></input>
      <input onchange="registrarDados()" type="text" value={email}></input>
      <button></button>
    </form>
  </main>
  );