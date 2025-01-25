const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

let livros = [];

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

app.get('/livros', (req, res) => {
    res.status(200).json(livros);
});

app.get('/livros/:id', (req, res) => {
    const { id } = req.params;
    const livro = livros.find(l => l.id === parseInt(id));

    if (!livro) {
        return res.status(404).json({ erro: 'Livro não encontrado' });
    }

    res.status(200).json(livro);
});

app.put('/livros/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, preco, autor, paginas, genero, idioma } = req.body;

    const livro = livros.find(l => l.id === parseInt(id));

    if (!livro) {
        return res.status(404).json({ erro: 'Livro não encontrado' });
    }

    livro.titulo = titulo || livro.titulo;
    livro.preco = preco || livro.preco;
    livro.autor = autor || livro.autor;
    livro.paginas = paginas || livro.paginas;
    livro.genero = genero || livro.genero;
    livro.idioma = idioma || livro.idioma;

    res.status(200).json(livro);
});

app.delete('/livros/:id', (req, res) => {
    const { id } = req.params;
    const index = livros.findIndex(l => l.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ erro: 'Livro não encontrado' });
    }

    livros.splice(index, 1);
    res.status(204).send();
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
