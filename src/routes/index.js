const rootRouter = require('express').Router();

const notesRouter = require('./notes.routes');
const foldersRouter = require('./folders.routes');
const authenticationRouter = require('./authentication.routes');

rootRouter.use(notesRouter, foldersRouter, authenticationRouter);

module.exports = rootRouter;
