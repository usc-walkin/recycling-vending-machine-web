import axios from 'axios';
import * as bodyParser from "body-parser";
import cors from 'cors';
import express from 'express';

import config from '@@config';
import httpLogger from '@@middlewares/httpLogger';

function createExpressApp() {
  const port = config.expressPort;

  const app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(httpLogger);

  app.use('/run' , async (req, res, next) => {
    axios.post(`${config.operatorEndpoint}/recycle`, req.body)
      .then(({ data }) => {
        console.log('axios succeeds', data);
        res.send({
          error: false,
          result: data.result,
        });    
      })
      .catch((err) => {
        console.error('Error has occurred', err);
        res.send({
          error: true,
        });
      });
  });

  app.use((err, req, res, next) => {
    console.error('Error has occurred: %s', err);
  });

  app.listen(port, () => {
    console.log('Listening on port: %s', port);
  });

  return app;
}

export default createExpressApp;
