var express = require('express');
var router = express.Router();
const {Product, Label} = require('../../../db');


// Obtenemos la lógica correspondiente desde controllers/index.js
const {
  getMenu,
  putProduct,
  postMenu,
  uploadImage,
} = require("../../../controllers");

router.post('/',async (req,res) => {
	try{
		const {idResto, body}= req;
		let newproduct = await postMenu(idResto, body)
		res.json(newproduct);
	} catch (err){
		console.error(err.stack);
		res.status(400).json({ msg: 'There was an error', error: err.message});
	}
});

router.get("/", async (req, res) => {
  try {
    const { idResto } = req;
    const menu = await getMenu(idResto);
    if (!menu.length) {
      res.status(400).json({ error: "id undefined" });
    } else {
      res.status(200).send(menu);
    }
  } catch (err) {
		console.error(err.stack);
		res.status(400).json({ msg: 'There was an error', error: err.message});
  }
});

router.delete("/:productId", async (req,res)=>{
	try{
		const {productId} = req.params;
		const {idResto} = req;
		const menu = await getMenu(idResto);
		let product = menu.find(p=>p.id==productId);
		if(!product) return res.status(404).json({error: "Product not exist"});	
		await Product.destroy({
		where: {id: productId,
			UserId: idResto}
		});
		res.status(200).json({msg: "Product Deleted"});	
	} catch (err){
		console.error(err.stack);
		res.status(400).json({ msg: 'There was an error', error: err.message});
	}
});

router.put("/:productId", async (req,res)=>{
	try {
		const {productId} = req.params;
		const {idResto, body} = req;
		if(body.length<1)return res.status(400).json({ error: "There is nothing to edit" });
		const menu = await getMenu(idResto);
		let product = menu.find(p=>p.id==productId);
		if(!product) return res.status(404).json({error: "Product not exist"});	
		await putProduct(idResto,productId,body);
		res.status(200).json({msg:`Product edited successfully`});
	} catch (err) {
		console.error(err.stack);
		res.status(400).json({ msg: 'There was an error', error: err.message});
	}
});

module.exports = router;
