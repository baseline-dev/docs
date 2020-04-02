import http from 'http';
import serveStatic from 'serve-static';

const serve = serveStatic('build', );
const server = http.createServer( (req, res) => {
  serve(req, res, (res, ) => {});
})

server.listen(3000)