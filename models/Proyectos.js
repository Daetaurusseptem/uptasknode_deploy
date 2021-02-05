const Sequelize = require('sequelize');
const shortid = require('shortid');


const slug = require('slug')

const db = require('../config/db');

const Proyectos = db.define('Proyectos',{
    id:{
        type: Sequelize.INTEGER(11),
        primaryKey:true,
        autoIncrement:true
    },
    nombre:Sequelize.STRING(100),
    url:Sequelize.STRING(100)
}, {
    hooks:{
        beforeCreate(proyecto){
            const url =  slug(proyecto.nombre).toLowerCase()
            proyecto.url = `${url}-${shortid.generate()}`
        }
    }
});

module.exports = Proyectos;
