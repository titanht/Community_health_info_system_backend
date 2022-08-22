const express = require('express');
const db = require('./connect/connect');
const ApiError = require('./core/api-error');
const errorHandler = require('./core/error-handler');
const { router } = require('./routers/Routes');
const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1', router);

// Invalid routes supplied by client, raise not found exception
app.use((_req, _res, next) => {
  next(new ApiError('route not found', 404, {}));
});
// handle runtime errors
app.use(errorHandler);

const start = () => {
  try {
    db.connect((err) => {
      if (err) {
        throw err;
      }
      console.log('connected to mysqlDb');
    });
    app.listen(port, () => {
      console.log(`server is listening to port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
