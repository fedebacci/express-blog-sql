// COMMENTO NORMALE
// ! COMMENTO ERRORE
// ? COMMENTO DOMANDA
// * COMMENTO HIGHLIGHT
// # COMMENTO WARNING
// - COMMENTO TEXT
// todo COMMENTO TODO

const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');


// - INDEX
router.get("/", postController.index);



// - SHOW
router.get('/:id', postController.show);



// - CREATE
router.post('/', postController.create);



// - UPDATE (MOD. TOTALE - put)
router.put('/:id', postController.update);



// - MODIFY (MOD. PARZIALE - patch)
router.patch('/:id', postController.modify);



// - DESTROY
router.delete('/:id', postController.destroy);




module.exports = { postsRouter: router };