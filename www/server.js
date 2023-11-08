const {createServer} = require('http');
const app = require("../src/index");
const serverless = require("serverless-http");
const port = process.env.PORT || 8081;
const server = createServer(app);
process.on('unhandledRejection',(err)=>{console.log(err)})
server.listen(port, () => {
	console.log(`Listening on PORT: ${port}`);
});
module.exports.handler = serverless(app);