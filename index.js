const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');

const { notFoundHandler, errorHandler } = require('./middlewares/common/errorHandler');

const loginRouter = require('./router/loginRouter');
const usersRouter = require('./router/userRouter');
// const inboxRouter = require('./router/inboxRouter');
const inboxRouter = require('./router/inboxRouter');

const app = express();
dotenv.config();


// console.log(process.env.APP_NAME);

mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => { console.log('DatabaseConnection SuccessFully') })
    .catch((err) => console.log(err));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser(process.env.COOKIE_SECRET));


app.use('/', loginRouter);
app.use('/users', usersRouter);
app.use('/inbox', inboxRouter);







app.use(notFoundHandler);
app.use(errorHandler);






app.listen(process.env.PORT, () => {
    console.log(`listening to port ${process.env.PORT}`);
})