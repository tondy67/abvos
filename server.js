/** 
 * https://gitlab.com/abvos/abvos
 */
"use strict";

const ABV_URL = 'https://tondy67.github.io/abvos/nodes.html';

// node --inspect server.js | Open 'about:inspect' in Chrome
// export DEBUG=abv:*,info / unset DEBUG
const ts = require('abv-ts')('abv:os');
const { spawn } = require('child_process');
const fs = require('abv-vfs');
const AbvServer = require('abv-server');

const pjson = require('./package.json');
//const aspa = require('abv-spa')();
//const AbvNode = require('abv-node');

const $port = 8089;
const $host = '0.0.0.0';
const $root = __dirname + '/public';

const port = process.env.PORT || $port;
const ip   = process.env.IP   || $host;

const srv = new AbvServer();
const aspa = srv.web;

aspa.set('root', $root);
aspa.set('cache',3000);

aspa.get('/', res => {
	res.body = 'Aspa server: ' + req.url;
	res.send(200);
});

aspa.match('/user/(.*)',(match, res) => {
	const id = match[1];
	const u = node.pub(id); if(u)console.log(38,u[0].info);
	res.body = 'user: ' + id;
	res.send(200);
});
const tpl = {title:'Abvos ' + pjson.version, url:ABV_URL};
aspa.tpl('/',tpl);
aspa.tpl('/index.html',tpl); 

srv.start(ip,port);

aspa.all = (path,res) => {//ts.error(42,path);
//	res.send(500);
	aspa.redirect(res, 'https://tondy67.gitlab.io/u/?'+path.substr(1));
}

/*



const tpl = {title:'Abvos ' + pjson.version, url:ABV_URL};
aspa.tpl('/',tpl);
aspa.tpl('/index.html',tpl);

const $ip = aspa.ips()[0];
const info = `Node.js(${process.version}) os: ${process.platform} ${process.arch}`;

aspa.listen(port, ip, (err) => {  
	if (err) return ts.error(err);
	ts.println(info, ts.BLUE);
	ts.println(`Abvos is running on http://${$ip}:${port}`,ts.GREEN);
});


*/
const node = srv.wss;
node._dir = {pub:$root};

/*node.on('msg', (m) => {
	ts.debug(46,m);
});*/
if (false){
//const child = spawn('node',[__dirname + '/apps/clock/run.js']);
	const child = spawn('node',[__dirname + '/apps/clock/app.js']);
//child.on('error', err => {ts.error(29,err);});

	aspa.match('/app/clock/(.*)',(match, res) => {
		const now = Date.now();
		const f = fs.File(Date.now(),match[1]);
		f.msg('msg','@1');
		node.call(f,1000)
			.then(msg => { 	
				let tpl = null;
				try{
					const b = ts.fromString(msg.body); 
					res.body = fs.readFileSync(__dirname + '/apps/clock/'+b.file); 
					tpl = b.tpl;
				}catch(e){};
	console.log(114,Date.now()-now);
				res.send(200, tpl);
			})
			.catch(e => {
				ts.error(117, e); 
				res.body = 'App error';
				res.send();
			});
  });
}

