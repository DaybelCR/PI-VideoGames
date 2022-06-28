const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type: DataTypes.UUID,
      primaryKey:true,
      allowNull:false,
      defaultValue:DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique :true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    released: {
      type: DataTypes.DATEONLY,
      allowNull:false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull:false,
      set(value){
        this.setDataValue('rating',parseInt(value));
      }
    },
    platforms:{
      type:DataTypes.ARRAY(DataTypes.STRING),
      allowNull:false,
    },
    image:{
      type:DataTypes.TEXT,
      allowNull:false,
    }, 
     created:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue: true,
    }
  },{
    timestamps:false,
  });
};
