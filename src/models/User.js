const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(64),
        unique: true,
        allowNull: false,
        allowEmpty: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        allowEmpty: false,
      },
      passAdmin: {
        type: DataTypes.STRING,
        allowNull: false,
        allowEmpty: false,
      },
      passStaff: {
        type: DataTypes.STRING,
        allowNull: false,
        allowEmpty: false,
      },
      tables: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(64),
        allowNull: false,
        allowEmpty: false,
      },
      /*
			logo: {
				type: DataType.STRING, //(?)
				allowNull: false,
			},
			theme: {
				type: DataType.INTEGER, 
			}
      payment_mp:{
        type:DataType.STRING,
      }
			*/
    },
    {
      timestamps: false,
    }
  );
}
