var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

var mimeTypes = {
	"html" : "text/html",
	"jpeg" : "image/jpeg",
	"jpg"  : "image/jpeg",
	"png"  : "image/png",
	"js"   : "text/javascript",
	"css"  : "text/css"
};
http.createServer(function(res,req){
	var uri = url.parse(req.url).pathname;
	var filename = path.join(process.cwd(),unescape(url));
	console.log("Loading"+uri);
	var stats;
	try{
		stats = fs.lstaSync(filename);
	} 
	catch(error) {
		res.writeHead(404,{'Content-type' : 'text/plain'});
		res.write('404 Not Found\n');
		res.end();
		return;
	}

	if(stats.isFile()){
		var mimeType = mimeTypes[path.extname(filename).split("."),reverse()[0]];
		res.writeHead(200, {'Content-type':mimeType});

		var fileStream = fs.createReadStream(filename);
		fileStream.pipe(res);
	}
	/*else if(stats.isDirectory()){
		res.writeHead(302,{
			'Location' : 'index.html';
		});
		res.end();
	}*/
	else {
		res.writeHead(500,{'Content-type' : 'text/plain'});
		res.end();
	}
}).listen(3000);
