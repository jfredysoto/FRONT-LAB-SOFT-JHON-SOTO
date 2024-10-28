import express from 'express';
import bodyParser from 'body-parser';
import { Pool } from 'pg'; // Usando PostgreSQL, cambia según tu base de datos
import cors from 'cors';

const app = express();
const port = 3000; // Cambia el puerto según tu configuración

// Configuración de middleware
app.use(cors());
app.use(bodyParser.json());

// Conexión a la base de datos (ajusta según tu configuración)
const pool = new Pool({
    user: 'tu_usuario',
    host: 'localhost',
    database: 'tu_base_de_datos',
    password: 'tu_contraseña',
    port: 5432, // Cambia según tu configuración
});


// Rutas para los vuelos
app.post('/api/flights', async (req, res) => {
    const { origin, destination, date, time, duration, cost } = req.body;
    const query = 'INSERT INTO flights (origin, destination, date, time, duration, cost) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    try {
        const result = await pool.query(query, [origin, destination, date, time, duration, cost]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al programar el vuelo' });
    }
});

app.get('/api/flights', async (req, res) => {
    const query = 'SELECT * FROM flights';
    try {
        const result = await pool.query(query);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener vuelos' });
    }
});

app.delete('/api/flights/:code', async (req, res) => {
    const { code } = req.params;
    const query = 'DELETE FROM flights WHERE code = $1';
    try {
        await pool.query(query, [code]);
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al cancelar el vuelo' });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
