import express from  'express';
import cors from 'cors'
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import controllersAuthtenticate from './controllers/controllers.authtenticate.js';

const app = express(),
    port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(cookieParser());

app.get("/", (req, res)  => {
    return res.json({
        title: "Home Page",
        descripcion: "Página principal",
        status: 200
    });
})

app.post("/login", controllersAuthtenticate.login);
app.post("/register", controllersAuthtenticate.register);


app.listen(port, () => {
    console.log(`El servidor se esta ejecutando en el http://localhost:${port}/`);
});