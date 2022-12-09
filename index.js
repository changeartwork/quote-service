const express = require('express');
const path = require('path');
const fileRoute = require('./routes/quotation');
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
const customCss = fs.readFileSync((process.cwd()+"/docs/swagger.css"), 'utf8');
require('./config/db');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use('/api',fileRoute);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {customCss}));

app.listen(5001, () => {
  console.log('server started on port 5001');
});
