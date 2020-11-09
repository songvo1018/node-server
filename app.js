const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')

mongoose.connect('mongodb+srv://songvo:' + process.env.MONGODB_ATLAS_PW +'@cluster0.9bzjf.azure.mongodb.net/server-with-mongo?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})


app.use(cors())
app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json({limit: '2mb'}))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (res.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', '*')
    return res.status(200).json({})
  }
  next();
});

app.use('/products', productRoutes)
app.use('/orders', orderRoutes)

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  })
} )
module.exports = app;