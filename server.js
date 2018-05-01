/** 
 * https://github.com/tondy67/abvos
 */
"use strict";

const ABV_URL = 'https://tondy67.github.io/abvos/nodes.html';

// node --inspect server.js | Open 'about:inspect' in Chrome
// export DEBUG=abv:*,info / unset DEBUG
const ts = require('abv-ts')('abv:os');
const { spawn } = require('child_process');
const fs = require('abv-vfs');

const pjson = require('./package.json');
const aspa = require('abv-spa')();
const AbvNode = require('abv-node');

const $port = 8080;
const $host = '0.0.0.0';
const $root = __dirname + '/public';

const port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || $port;
const ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || $host;

aspa.set('root', $root);
aspa.set('cache',3000);

aspa.match('/time/(.*)', (match, res) => {
	node.call('msg',match[1],'@1',1000)
		.then( data => { 
			ts.debug(29,data);
			res.body = String(match[1])+'\n'+ts.toJson(data);
			res.send();
		})
		.catch(e => {
			ts.error(30, e.stack); 
			res.send(500);
		});
	
});

const tpl = {title:'Abvos ' + pjson.version, url:ABV_URL};
aspa.tpl('/',tpl);
aspa.tpl('/index.html',tpl);

const $ip = aspa.ips()[0];
const info = `Node.js(${process.version}) os: ${process.platform} ${process.arch}`;

aspa.listen(port, ip, (err) => {  
	if (err) return ts.error(err);
	ts.println(info, ts.BLUE);
	ts.println(`Abvos desktop is running on http://${$ip}:${port}`,ts.GREEN);
});

///
const node = new AbvNode(aspa);

node.on('msg', (m) => {
	ts.debug(46,m);
});

if (true){
//	const child = spawn('node',[__dirname + '/apps/clock/run.js']);
	const child = spawn('node',[__dirname + '/apps/clock/app.js']);
	child.on('error', err => {ts.error(29,err);});

	aspa.match('/app/clock/(.*)',(match, res) => {
		node.call('msg',match[1],'@1',1000)
			.then(data => { 		ts.debug(29,data);	
				let tpl = null;
				try{ 
					res.body = fs.readFileSync(__dirname + '/apps/clock/'+data.b.file); 
					tpl = data.b.tpl;
				}catch(e){};
				res.send(200, tpl);
			})
			.catch(e => {
				ts.error(30, e.stack); 
				res.send(500);
			});

});
}
