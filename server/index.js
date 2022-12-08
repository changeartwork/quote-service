const express = require('express');
const path = require('path');
const fileRoute = require('./routes/quotation');
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
const customCss = fs.readFileSync((process.cwd()+"/docs/swagger.css"), 'utf8');
require('./db/db');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(fileRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {customCss}));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(3030, () => {
  console.log('server started on port 3030');
});
