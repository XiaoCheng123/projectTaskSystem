const Koa = require('koa');
const Router = require('koa-router');
// const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const helmet = require('koa-helmet');
const respond = require('koa-respond');
const logger = require('koa-logger');
const serve = require('koa-static');
const path = require('path');
const session = require('koa-session');

const app = new Koa();
const router = new Router();
const port = process.env.PORT || 3000;
const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false) */
};

require('./router')(router);

app.keys = ['some secret hurr'];


app
  .use(logger())
  .use(bodyParser())
  .use(helmet())
  .use(respond())
  .use(session(CONFIG, app))
  .use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', 'http://localhost:4444');
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    ctx.set('Access-Control-Allow-Credentials', true);
    await next();
  })
  .use(router.routes())
  .use(router.allowedMethods())
  .use(serve(path.join(process.cwd(), '../client/build')))
  .listen(port, () => {
    console.log('The server is running at:');
    console.log(
      `    - Local:  http://localhost:${port}`
    );
  });
