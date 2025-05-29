const express = require('express');
const app = express();
const responsavelRoutes = require('./routes/responsavelRoutes');

app.use(express.json());
app.use('/responsaveis', responsavelRoutes);

app.listen(3000, () => {
  console.log('API rodando em http://localhost:3000');
});
