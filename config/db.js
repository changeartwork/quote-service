const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/changeartworkdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
