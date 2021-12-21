const mercadopago = require("mercadopago");
var { usersTables } = require("../cache");

mercadopago.configure({
  access_token:
    "TEST-8597162101756929-120903-244e52b38faa5e385b1394e5fec0f351-186091864",
});

// Crea un objeto de preferencia
const mercadoPago = async (idResto, idTable, state, tip) => {
  let table = usersTables[idResto].tables[idTable - 1];
  let ordered = table.ordered;
  console.log("ORdered", ordered.quantity);
  let preference = {
    items: [
      {
        title: ordered.productName,
        productId: ordered.productId,
        unit_price: 200,
        quantity: ordered.quantity * 1,
      },
    ],
    // back_urls: {
    //   success: "http://localhost:8080/feedback",
    //   failure: "http://localhost:8080/feedback",
    //   pending: "http://localhost:8080/feedback",
    // },
    // auto_return: "approved",
  };

  const res = await mercadopago.preferences.create(preference);
  console.log(res.body.init_point);
  return res;
};
// mercadopago.preferences
//   .create(preference)
//   .then(function (response) {
//     res.redirect(response.body.init_point);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
module.exports = mercadoPago;