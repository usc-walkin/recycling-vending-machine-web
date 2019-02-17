import ExpressIsomorphic from '@nodekit/express-isomorphic';
import http from 'http';
import {
  NextFunction,
  Request,
  Response,
} from 'express';
import path from 'path';

import * as paths from '../paths';
import makeHtml from './makeHtml';

console.log(123, paths.universalApp);

function extend(app, state) {
  console.log('extend()');

  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log('middleware: extend');
    next();
  });
}

const { localServer, server, eject } = ExpressIsomorphic.create({
  extend,
  makeHtml,
  publicPath: paths.dist,
  serverDistPath: paths.dist,
  universalAppPath: paths.universalApp,
  webpackBuildJsonPath: path.resolve(paths.distPublicBundle, 'build.json'),
  webpackConfigClientLocalPath: paths.webpackConfigClientLocalWeb,
  webpackConfigUniversalLocalPath: paths.webpackConfigUniversalLocal,
});

const port = 5234;

const httpServer = http.createServer(localServer().app);
httpServer.listen(port, () => {
  console.log(`Listening on ${port}`);
});