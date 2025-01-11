const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

let livros = []; // Substituí "usuarios" por "livros" para refletir o contexto correto

// Rota para registrar um novo livro
app.post('/livros', (req, res) => {
    const { titulo, preco, autor, paginas, genero, idioma } = req.body;

    if (!titulo || !preco || !autor || !paginas || !genero || !idioma) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    }

    const novoLivro = {
        id: livros.length + 1,
        titulo,
        preco,
        autor,
        paginas,
        genero,
        idioma
    };

    livros.push(novoLivro);

    res.status(201).json(novoLivro);
});

// Rota para obter todos os livros
app.get('/livros', (req, res) => {
    res.status(200).json(livros);
});

// Rota para obter um livro específico pelo ID
app.get('/livros/:id', (req, res) => {
    const { id } = req.params;
    const livro = livros.find(l => l.id === parseInt(id));

    if (!livro) {
        return res.status(404).json({ erro: 'Livro não encontrado' });
    }

    res.status(200).json(livro);
});

// Rota para atualizar informações de um livro
app.put('/livros/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, preco, autor, paginas, genero, idioma } = req.body;

    const livro = livros.find(l => l.id === parseInt(id));

    if (!livro) {
        return res.status(404).json({ erro: 'Livro não encontrado' });
    }

    // Atualiza apenas os campos enviados no corpo da requisição
    livro.titulo = titulo || livro.titulo;
    livro.preco = preco || livro.preco;
    livro.autor = autor || livro.autor;
    livro.paginas = paginas || livro.paginas;
    livro.genero = genero || livro.genero;
    livro.idioma = idioma || livro.idioma;

    res.status(200).json(livro);
});

// Rota para deletar um livro pelo ID
app.delete('/livros/:id', (req, res) => {
    const { id } = req.params;
    const index = livros.findIndex(l => l.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ erro: 'Livro não encontrado' });
    }

    livros.splice(index, 1);
    res.status(204).send();
});

// Inicializa o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
