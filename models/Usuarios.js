const sequelize = require('sequelize');
const db = require('../config/db');
const Proyectos = require('./Proyectos');
const bcrypt = require('bcrypt-nodejs');

const Usuarios = db.define('usuarios',{
        id:{
            type:sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        email:{
            type:sequelize.STRING(60),
            allowNull:false,
            validate:{
                isEmail:{
                    msg:'Agrega un correo valido'
                },
                notEmpty:{
                    msg:"email needed"
                }  
            },
            unique:{
                args:true,
                msg:'User already registered'
            }
        },
        password:{
            type:sequelize.STRING(60),
            allowNull:false,
            validate: {
                notEmpty:{
                    msg:"password needed"
                }
            }
        },
        activo:{
            type: sequelize.INTEGER,
            defaultValue:0
        },
        token:sequelize.STRING,
        expiracion:sequelize.DATE
},{
    hooks:{
        beforeCreate(usuario){
            usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10));
        }
    }
})




//Metodos personalizados

Usuarios.prototype.validPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

Usuarios.hasMany(Proyectos);

module.exports = Usuarios;