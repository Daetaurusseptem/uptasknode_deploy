"use strict";

var Sequelize = require('sequelize');

var shortid = require('shortid');

var slug = require('slug');

var db = require('../config/db');

var Proyectos = db.define('Proyectos', {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
  nombre: Sequelize.STRING(100),
  url: Sequelize.STRING(100)
}, {
  hooks: {
    beforeCreate: function beforeCreate(proyecto) {
      var url = slug(proyecto.nombre).toLowerCase();
      proyecto.url = "".concat(url, "-").concat(shortid.generate());
    }
  }
});
module.exports = Proyectos;