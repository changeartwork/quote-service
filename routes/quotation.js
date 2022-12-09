const path = require('path');
const express = require('express');
const multer = require('multer');
const Quote = require('../model/quotation');
const Router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './files');
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    }
  }),
  limits: {
    fileSize: 5000000 // max file size 5MB = 5000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
      return cb(
        new Error(
          'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
        )
      );
    }
    cb(undefined, true); // continue with upload
  }
});

Router.post(
  '/quote/create',
  upload.single('file'),
  async (req, res) => {
    try {
      const { name, mail, contact, memo } = req.body;
      const { path, mimetype } = req.file;
      const file = new Quote({
        name,
        mail,
        contact,
        memo,
        file_path: path,
        file_mimetype: mimetype
      });
      await file.save();
      res.send(file);
    } catch (error) {
      res.status(400).send('Error while placing quote. Try again later.');
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);

Router.get('/quote/list', async (req, res) => {
  try {
    const files = await Quote.find({});
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send('Error while getting list of files. Try again later.');
  }
});

Router.get('/quote/download/:id', async (req, res) => {
  try {
    const file = await Quote.findById(req.params.id);
    res.set({
      'Content-Type': file.file_mimetype
    });
    res.sendFile(path.join(__dirname, '..', file.file_path));
  } catch (error) {
    res.status(400).send('Error while downloading file. Try again later.');
  }
});

module.exports = Router;
