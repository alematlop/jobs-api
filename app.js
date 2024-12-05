require('dotenv').config();
require('express-async-errors');

// extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const express = require('express');
const app = express();



// connect DB
const connectDB = require('./db/connect');
const authenticateUser = require('./middleware/authentication');


// routers
const authRouter = require('./routes/auth');
const jobRouter = require('./routes/jobs');


// error handler
const notFoundMiddleware = require('./middleware/notFound');
const errorHandlerMiddleware = require('./middleware/errorHandler');

app.set('trust proxy', true);
app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000,
        max: 100,
    })
);

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());





// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobRouter);


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
let server;

const start = async () => {
    try {

        await connectDB.authenticate().then(() => console.log('Connected to database.'))
        await connectDB.sync().then(() => console.log('All models synchronized'));
        server = app.listen(port, () => {
            console.log(`Listening on port ${port}...`);
        })
    } catch (err) {
        console.log(err);
    }
}

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('SIGINT signal received.  Shutting down server ok ...');

    await connectDB.close();

    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

start().then();