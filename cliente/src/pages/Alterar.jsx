import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";
import BookIcon from "@mui/icons-material/Book";
import "../estilizacao/Alterar.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Alterar() {
    const { id } = useParams();
    const [livro, setLivro] = useState({
        titulo: "",
        preco: "",
        autor: "",
        paginas: "",
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
                setNomeOriginal(dados.titulo);
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
            <div className="flecha">
                <ArrowBackIcon
                    onClick={() => navigate("/")}/>
                </div>
            <h1>
                <BookIcon className="icon" />
                Página Alterar: {nomeOriginal}
            </h1>

            <form onSubmit={changeserver}>
                <input
                    type="text"
                    id="titulo"
                    name="titulo"
                    value={livro.titulo}
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
                    id="paginas"
                    name="paginas"
                    value={livro.paginas}
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
