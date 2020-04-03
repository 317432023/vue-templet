const path = require('path');
const config = require('./config');
const jsonServer = require('json-server');

const ip = config.SERVER;
const port = config.PORT;
const db_file = config.DB_FILE;

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, config.DB_FILE));
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);

server.use((req, res, next) => {
  res.header('user-defined', 'rise-auto');
  // 允许跨域
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, PUT');
  res.header('Access-Control-Max-Age', '3600');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
})
router.render = (req, res) => {
  res.jsonp({code:200, msg:'ok', data: res.locals.data})
}
server.use("/api", router);

server.use(router);
server.listen({
  host: ip,
  port: port
}, function () {
  console.log(JSON.stringify(jsonServer));
  console.log(`JSON Server is running in http://${ip}:${port}`);
});
