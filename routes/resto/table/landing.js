var express = require('express');
var router = express.Router();

// Obtenemos la lógica correspondiente desde controllers/index.js
// const { registerUser } = require('../controllers');

// ruta relativa!
router.get('/',async (req,res) => {
	//let result = await registerUser(req.body);
	//res.status(result.status).json(result);
	res.send(`Landing del comensal. MESA: ${req.idTable}, RESTAURANTE: ${req.idResto}`)
	
});

// tambien puede ir el post, delete, etc...

module.exports = router;


