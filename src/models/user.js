const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const userShema = new Schema({
    email: String,
    password: String,    
});

userShema.methods.encryptPassword = async (password) => {
    try {
        // Permite generar un hash, definimos las veses que quieras ejecutarlo, en este caso le pondre 10 veses
        const salt = await bcrypt.genSalt(10);

        // Luego tomamos ese patron de la variable salt para poder generar nuestra cifrado
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        console.log("Ha ocurrido un error", error); 
    }
};

userShema.methods.comparePassword = async (password, savedPassword) => {
    try {
        return await bcrypt.compare(password, savedPassword)    ;
    } catch (error) {
        console.log("Ha ocurrido un error", error);
    }
};

module.exports = mongoose.model("users", userShema);