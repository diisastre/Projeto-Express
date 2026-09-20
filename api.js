import express from 'express';

const app = express();

let tarefas = [
    { id: 1, titulo: 'Escutar música', concluida: false },
    { id: 2, titulo: 'Comer batata frita', concluida: true },
    { id: 3, titulo: 'Dobrar roupas', concluida: false }
];

app.get('/', (req, res) => {
    res.send('API de Tarefas no ar');
});

app.get('/tarefas', (req, res) => {
    res.json(tarefas);
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});