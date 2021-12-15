//tableStates controller

const {usersTables} = require("../cache.js");
const { SoldOrder, SoldProduct } = require("../db.js")

module.exports = async function (idTable, state, idResto, idStaff) {
	// Abreviate the table direction
	let table = usersTables[idResto].tables[idTable - 1];
	//changing the state of the table to eating
	if (state === "eating") {
		if(table.state === "waiting") {
			table.state = "eating";
			// adding the price of each product to the totalPrice
			table.totalPrice += table.currentOrder.products.reduce((a, e) => {
				return a + e.price
			}, 0)
			// change the location of the products to ordered
			// First we check if we find the productId already
			// to prevent product repeating.
			table.currentOrder.products.forEach( (e) => {
				let prdct = table.ordered.find( (p) => p.productId === e.productId )
				if (prdct) {
					prdct.price += e.price;
					prdct.quantity += e.quantity;
				}
				else {
					table.ordered.push(e);
				}
			} );
			// table.ordered = [...table.ordered, ...table.currentOrder.products];
			//deleting the current order product
			table.currentOrder = {
				time: '',
				products: [],
				comments: '',
			}
			return {msg: "Order delivered.", status: 200}
		}
		else {
			return {msg: `The table ${idTable} isn't requesting an order.`, status: 400}
		}
	}
	if (state.includes("pay")) {
		if (table.state.includes("pay")) {
			// Get the current date
			let today = new Date().toLocaleString();
			// Create the SoldOrder record.
			let soldOrder = await SoldOrder.create({
				UserId: idResto,
				idStaff,
				totalPrice: table.totalPrice,
				tip: table.tip,
				date: today,
				idTable,
				paymentMethod: state
			});
			// Create all the SoldProduct records and link them with the SoldOrder one
			await SoldProduct.bulkCreate(table.ordered.map((e) => {
				return { 
					SoldOrderId: soldOrder.id,
					productId: e.productId,
					name: e.name,
					price: e.price,
					quantity: e.quantity,
				};
			}));
			// Reset the table
			table = {
				tableId: idTable,  //xD
				state: 'free', // free, eating, waiting, pay_cash, pay_online
				ordered: [], // already ordered products
				totalPrice: 0,
				tip: 0,
				currentOrder: { // order waiting to be served
					time: '',
					products: [],
					comments: '',
				}
			}
			return {msg: "Payment Confirmed.", status: 200}
		}
		else {
			return {msg: "The table didn't request the bill.", status: 400}
		}
	}
};
