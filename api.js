import express from 'express';

const app = express();
app.use(express.json());


let tarefas = [
    { id: 1, titulo: 'Escutar música', concluida: false },
    { id: 2, titulo: 'Comer batata frita', concluida: true },
    { id: 3, titulo: 'Dobrar roupas', concluida: false }
];

app.get('/', (req, res) => {
    res.send('API de Tarefas no ar');
});

app.get('/tarefas', (req, res) => {

    if (req.query.concluida === 'true') {
        const tarefasConcluidas = tarefas.filter(tarefa => tarefa.concluida === true);

        return res.json(tarefasConcluidas);
    }
    res.json(tarefas);
});

app.get('/tarefas/:id', (req, res) => {

    const id = Number(req.params.id);

    const tarefa = tarefas.find(tarefa => tarefa.id === id);

    if (!tarefa) {
        return res.status(404).json({ erro: 'Tarefa não encontrada' });
    }
    res.json(tarefa);
});

function autenticar(req, res, next) {

    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            erro: 'Não autorizado'
        });
    }
    next();
}

function validarTarefa(req, res, next) {

    if (!req.body.titulo) {
        return res.status(400).json({
            erro: 'O título é obrigatório'
        });
    }
    next();
}

function registrarLog(req, res, next) {
    console.log('Nova tarefa sendo criada:', req.body.titulo);
    next();
}

app.post('/tarefas',[autenticar, validarTarefa, registrarLog],(req, res) => {
    const novaTarefa = {
        id: tarefas.length + 1,
        titulo: req.body.titulo,
        concluida: false};

        tarefas.push(novaTarefa);

        res.status(201).json(novaTarefa);
    }
);


app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});