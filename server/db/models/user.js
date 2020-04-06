const bcrypt = require('bcryptjs');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username:{
      type:DataTypes.STRING,
      allowNull: false,
      unique: true,
      trim:true
    },
    password:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    email:{
      type:DataTypes.STRING,
      allowNull: false,
      unique: true,
    }
  });
  User.associate = (models) =>{
    // associations can be defined here
    User.hasMany(models.Comment, {
      foreignKey: "commentId", as: "comments"
    });
    User.hasMany(models.Thread, {
      foreignKey: "threadId", as: "threads"
    })
  };

  User.authenticate= async (username, password) =>{
    const user = await User.findOne({where:{username}});
    if(!user) throw new Error('Wrong username or password!');
    const compare = await bcrypt.compare(password, user.password);
    if(!compare) throw new Error('Wrong username or password!');
    return user
  };
  return User;
};