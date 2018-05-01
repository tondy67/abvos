/**
 * Abvos sample app
 */
"use strict";

/*
const { spawn } = require('child_process');
const child = spawn(__dirname + '/app');
child.on('error', err => {console.error(8,err);});
 */
const ts = require('abv-ts')('abv:app.clock');
const pjson = require('../../package.json');
const fs = require('abv-vfs');
const { CAgent } = require('abv-agent');
const WebSocket = require('ws');

const host = 'http://localhost:8080';

const out = (msg) => {
	ts.debug(16,msg);
  	return {file:'index.html',tpl:{title:msg.b,body:msg.b+'<br>'+new Date()}};
};


const agent = new CAgent(host,WebSocket);
agent.out = out;
agent.log = ts.debug.bind(ts);
agent.file = (msg) => {
	const file = msg.n;
	fs.writeFileSync(__dirname+'/files/' + file, Buffer.from(msg.b));
	out('> file: ' + file);
};
if (pjson.config){
	if (pjson.config.server === 'free') agent.throttle = true;
}

if (false){
	agent.call('msg',answer,'@0')
		.then( res => { })
		.catch(e => { ts.error(74, e.stack); });
}
