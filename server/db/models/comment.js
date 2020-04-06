'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    comment:{
      type:DataTypes.TEXT,
      allowNull: false,
      trim:true
    }
  });
  Comment.associate = (models) => {
    // associations can be defined here
    Comment.belongsTo(models.User,{
      foreignKey: "userId",
      onDelete: 'CASCADE'
    });
    Comment.belongsTo(models.Thread,{
      foreignKey: "threadId",
      onDelete: 'CASCADE'
    });
  };
  return Comment;
};