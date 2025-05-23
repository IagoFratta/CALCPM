const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const DB_FILE = './db.json';

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// GET banco de dados
app.get('/api/db', (req, res) => {
if (fs.existsSync(DB_FILE)) {
const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
res.json(data);
} else {
res.status(404).json({});
}
});

// POST salvar banco
app.post('/api/db', (req, res) => {
fs.writeFileSync(DB_FILE, JSON.stringify(req.body, null, 2));
res.json({ status: 'ok' });
});

app.listen(3000, () => console.log('API rodando em http://localhost:3000'));