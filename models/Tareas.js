const { STRING, BOOLEAN } = require('sequelize');
const Sequelize = require('sequelize');
const db = require('../config/db.js');
const Proyectos = require('./Proyectos.js');

const Tareas = db.define('Tareas',{
    id:{
        type:Sequelize.INTEGER(11),
        primaryKey:true,
        autoIncrement:true
    },
    tarea:STRING(100),
    estado:BOOLEAN
})

Tareas.belongsTo(Proyectos);

module.exports = Tareas;