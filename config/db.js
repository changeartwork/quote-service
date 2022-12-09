const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/changeartworkdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
