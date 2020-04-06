'use strict';
module.exports = (sequelize, DataTypes) => {
  const Thread = sequelize.define('Thread', {
    title:{
      type:DataTypes.STRING,
      allowNull: false,
      unique: true,
      trim:true
    },
    content:{
      type:DataTypes.STRING,
      trim:true,
      allowNull:true
    }

  });
  Thread.associate = (models) => {
    // associations can be defined here
    Thread.belongsTo(models.User,{
      foreignKey: "userId",
      onDelete: 'CASCADE'
    });
    Thread.hasMany(models.Comment, {
      foreignKey: "commentId", as: "comments"
    })
  };
  return Thread;
};