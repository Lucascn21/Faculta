const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const chalk = require('chalk');
const session = require('express-session');
const ejsLayouts = require('express-ejs-layouts');
const { initDatabase } = require('./database/init');
const flashMiddleware = require('./middlewares/flash');

// Import routes
const permissionRoutes = require('./routes/permissionRoutes');
const roleRoutes = require('./routes/roleRoutes');
const userRoutes = require('./routes/userRoutes');

// Initialize the app
const app = express();
const PORT = process.env.PORT || 3000;

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(ejsLayouts);
app.set('layout', 'layouts/main');

// Middlewares
app.use(morgan('dev')); // HTTP request logger
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method')); // For HTTP method override (PUT, DELETE)
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Session and flash messages
app.use(session({
    secret: 'sistema-permisos-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true in production with HTTPS
}));
app.use(flashMiddleware);

// Initialize database
initDatabase();

// Routes
app.use('/permissions', permissionRoutes);
app.use('/roles', roleRoutes);
app.use('/users', userRoutes);

// Home route
app.get('/', (req, res) => {
    res.render('index', { title: 'Sistema de Gestión de Permisos' });
});

// 404 Handler
app.use((req, res, next) => {
    res.status(404).render('error', { 
        title: 'Error 404',
        message: 'Página no encontrada',
        statusCode: 404
    });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error(chalk.red('Error:'), err);
    res.status(err.status || 500).render('error', {
        title: 'Error',
        message: err.message || 'Error interno del servidor',
        statusCode: err.status || 500
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(chalk.green(`✓ Servidor iniciado en puerto ${PORT}`));
    console.log(chalk.blue(`✓ http://localhost:${PORT}`));
});
