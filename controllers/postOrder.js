// postOrder controller
var { usersTables } = require('../cache.js');

module.exports = function(idResto, idTable, body) {
	/*
	 Va a buscar al usuario idResto a través del numero de mesa de idTable
	 Le restamos 1 porque idTable arranca de 1 y la posición del array
	 arranca en 0.
	 Recibimos por body:
		{
			products: [
				{ 
					productId: number, 
					productName: 'string', 
					quantity: number,
					price: number,
				},
				... más platillos
			],
			comments: 'string',
		}
	*/
	let table = usersTables[idResto].tables[idTable-1];
	//if (table.state !== 'waiting' && !table.currentOrder.products.length) {
	table.state = 'waiting';
	
	body.products.forEach( (e,i) => {
		let prdct = table.currentOrder.products.find( (p) => p.productId === e.productId )
		if (prdct) {
			table.currentOrder.products[i].price += e.price;
			table.currentOrder.products[i].quantity += e.quantity;
		}
		else {
			table.currentOrder.products.push(e);
		}
		
	});
	
	// table.currentOrder.products = body.products;
	table.currentOrder.time = new Date().toLocaleString();
	table.currentOrder.comments = body.comments;
	return { status: 200, msg: 'Your order has been taken successfully.'};
	//}
	//else {
	//	return { status: 400, msg: 'There is an order in progress. Please be patient.'}
	//}
}