const app = require('./app');

const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/database');
const swaggerDocs = require('./swagger');


// Conectar a MongoDB
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
    console.error('MONGO_URI is not defined in the environment variables');
    process.exit(1);
}


const PORT = process.env.PORT || 5000;

connectDB();

// Configurar Swagger
swaggerDocs(app);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}/api-docs/`);
});
