require('dotenv').config();
const express = require('express');
const path = require('path');
const fileRoute = require('./routes/quotation');
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
const customCss = fs.readFileSync((process.cwd()+"/docs/swagger.css"), 'utf8');
const cors = require('cors');
require('./config/db');

const app = express();
app.use('/api',fileRoute);
app.use(cors());
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {customCss}));

app.listen(`${process.env.APP_PORT}`, () => {
  console.log('quote-service started on port '+ `${process.env.APP_PORT}`);
});
