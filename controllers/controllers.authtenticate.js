import pool from "../database.js";
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const login = async (req, res) => {
    
    const { username, password } = req.body;

    if (!username || !password) return res.status(401).json({
        title: "Error",
        descripcion: "Los campos del formulario son obligatorios",
        status: 401
    });

    try{

        const [result] = await pool.query(
            "SELECT * FROM login WHERE username = ?",
            [username]
        );

        const verifyUser = result.find((user) => user.username === username);

        if(!verifyUser){
            return res.status(402).json({
                title: "Success",
                status: 402,
                descripcion: "El usuario no existe, por favor verifique su información."
            });
        }

        const createTokenUser = jsonwebtoken.sign(
            {user: result[0].username, rol: result[0].id_rol, userId: result[0].id_usuario},
            process.env.SECRET_KEY,
            {expiresIn: process.env.EXPIRE_TOKEN}
        );
        
        const cookieOption = {
            MaxAge: new Date(Date.now() + process.env.EXPIRE_TOKEN *24*60*60*1000), 
            path: "/",
        }

        res.cookie("authTokenUser", createTokenUser, cookieOption);
        
        return res.status(202).json({
            title: "Success",
            status: 202,
            result: {
                createTokenUser,
                path: "/dashboard",
            }
        });
        

    }catch (error) {
        console.log(error);
    }
};


const register = async (req, res) => {

    const { username, password, cedula, telefono, correo, rol_user } = req.body;

    if(!username || !password || !cedula || !telefono || !correo || !rol_user) return res.status(404).json({
        title: "Error",
        status: 404,
        descripcion: "Los campos del formulario son obligatorios"
    });
    
    let connection;
    
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        const [dataUser] = await connection.query(
            "SELECT * FROM login WHERE username = ? AND password = ?",
            [username, password]
        );

        const verifyUser = dataUser.find((user) => user.username === username && user.password === password);

        if(verifyUser){
            return res.status(402).json({
                title: "Success",
                status: 402,
                descripcion: "El usuario ya se encuentra registrado en la base de datos."
            });
        }

        //generamos una contraseña encriptada
        const generateSalt = await bcrypt.genSalt(10),
            hashingPassword = await bcrypt.hash(password, generateSalt);        

        const [result] = await pool.query(
            "INSERT INTO login(username, password, cedula, telefono, correo, rol_user) VALUES(?, ?, ?, ?, ?, ?)",
            [username, hashingPassword, cedula, telefono, correo, rol_user]
        );

        await connection.commit(); // Confirmar la transacción si todo fue exitoso

        if(result.affectedRows > 0){
            return res.status(202).json({
                title: "Success",
                status: 202,
                descripcion: "El usuario se ha registrado de manera exitosa!!!",
                result
            });
        }
        
    }catch(error) {
        if (connection) {
            await connection.rollback(); // Revertir la transacción en caso de error
        }
        console.error("Error al procesar el nuevo usuario:", error); // Log del error para depuración
        return res.status(500).json({
            title: "Error Interno del Servidor",
            status: 500,
            description: "Ocurrió un error al procesar el nuevo usuario. Por favor, inténtalo de nuevo más tarde.",
            error: error.message // Incluir el mensaje de error para depuración (opcional en producción)
        });
    }finally{
        if (connection) {
            connection.release(); // Siempre liberar la conexión al pool
        }
    }
    
}

export default {
    login,
    register
};