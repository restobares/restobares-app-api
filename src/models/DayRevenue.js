const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	let d = new Date();
	let today = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
	// defino el modelo
	sequelize.define(
		"DayRevenue",
		{
			totalPrice: {
				type: DataTypes.DECIMAL(10,2),
				allowNull: false,
			},
			date: {
				type: DataTypes.STRING(32),
				allowNull: false,
				defaultValue: today 
			},
		},
		{
			timestamps: false,
		}
	);
}



