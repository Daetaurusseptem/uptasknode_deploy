"use strict";

var sequelize = require('sequelize');

var db = require('../config/db');

var Proyectos = require('./Proyectos');

var bcrypt = require('bcrypt-nodejs');

var Usuarios = db.define('usuarios', {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: sequelize.STRING(60),
    allowNull: false,
    validate: {
      isEmail: {
        msg: 'Agrega un correo valido'
      },
      notEmpty: {
        msg: "email needed"
      }
    },
    unique: {
      args: true,
      msg: 'User already registered'
    }
  },
  password: {
    type: sequelize.STRING(60),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "password needed"
      }
    }
  },
  token: sequelize.STRING,
  expiracion: sequelize.DATE
}, {
  hooks: {
    beforeCreate: function beforeCreate(usuario) {
      usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10));
    }
  }
}); //Metodos personalizados

Usuarios.prototype.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

Usuarios.hasMany(Proyectos);
module.exports = Usuarios;