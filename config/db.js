const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin@cluster.qctktes.mongodb.net/changeartworkdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
