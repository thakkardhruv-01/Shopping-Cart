require('./Connection/database.js')
const express = require('express')
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors({origin:'*'}));

//localhost:3000/profile
const profileRouter = require('./routers/profile');
app.use('/profile',profileRouter)

//localhost:3000/login
const loginRouter = require('./routers/login');
app.use('/login',loginRouter);

//localhost:3000/product
const productRouter = require('./routers/product');
app.use('/product',productRouter);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    let host = server.address().address;
    console.log(`Server connection established : http://%s:%s"`, host, port);
});
