const { DataTypes } = require('sequelize')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('character', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    specie: {
      type: DataTypes.STRING,
    },
    origen: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'https://rickandmortyapi.com/api/character/avatar/20.jpeg'
    },
    created: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  })
}
