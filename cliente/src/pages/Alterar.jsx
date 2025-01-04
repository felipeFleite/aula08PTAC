import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";
import BookIcon from "@mui/icons-material/Book";
import "../estilizacao/Alterar.css";

export default function Alterar() {
    const { id } = useParams();
    const [livro, setLivro] = useState({
        nome: "",
        preco: "",
        date: "",
        autor: "",
        qPaginas: "",
        genero: "",
        idioma: "",
    });
    const [nomeOriginal, setNomeOriginal] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const buscarLivro = async () => {
            try {
                const resposta = await fetch(`http://localhost:3000/livros/${id}`);
                const dados = await resposta.json();
                setLivro(dados);
                setNomeOriginal(dados.nome);
            } catch {
                alert("Erro ao buscar os dados do livro.");
                navigate("/");
            }
        };
        buscarLivro();
    }, [id, navigate]);

    const change = (e) => {
        const { name, value } = e.target;
        setLivro({ ...livro, [name]: value });
    };

    const changeserver = async (e) => {
        e.preventDefault();
        try {
            await fetch(`http://localhost:3000/livros/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(livro),
            });
            alert("Livro alterado com sucesso!");
            navigate("/");
        } catch {
            alert("Erro ao salvar as alterações.");
        }
    };

    return (
        <main>
            <h1>
                <BookIcon className="icon" />
                Página Alterar: {nomeOriginal}
            </h1>

            <form onSubmit={changeserver}>
                <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={livro.nome}
                    onChange={change}
                    required
                />

                <input
                    type="date"
                    id="date"
                    name="date"
                    value={livro.date}
                    onChange={change}
                    required
                />

                <input
                    type="number"
                    id="preco"
                    name="preco"
                    value={livro.preco}
                    onChange={change}
                    required
                />

                <input
                    type="text"
                    id="autor"
                    name="autor"
                    value={livro.autor}
                    onChange={change}
                    required
                />

                <input
                    type="number"
                    id="qPaginas"
                    name="qPaginas"
                    value={livro.qPaginas}
                    onChange={change}
                    required
                />

                <input
                    type="text"
                    id="genero"
                    name="genero"
                    value={livro.genero}
                    onChange={change}
                    required
                />

                <input
                    type="text" id="idioma" name="idioma" value={livro.idioma} onChange={change} required
                />

                <button type="submit">
                    <SaveIcon className="icon" />
                    Salvar Alterações
                </button>
            </form>
        </main>
    );
}
