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

const $out = (msg) => {
	ts.debug(16,msg);
	msg.body = ts.toString({file:'index.html',tpl:{title:msg.body,body:msg.body+'<br>'+new Date()}});
	return msg;
};

const $info = {
  "user": "Clock",
  "name": "Clock app",
  "site": "clock@tondy.com",
  "loc": "tondy.com",
  "pkey": "04b4c7d77715e6a1e8346669d2fd3a624c43542e18b71c3d709f7bd5b19f7f6ab9deaab13d63c09ce23f9bdd222ec63e95218431211d26fc09ee34747843fed36d",
  "skey": "0db20b5ecaabdf3fc632d0c8d65c0c22cc70e8eebdf62df4d678f318f9c004f0",
  "sign": "304502207a57de3f9a56da56d9bb6fcc0d56d22852327f30bf6c7d27d14da9333640f8f1022100b53e00ff0165246873cd8cecb7217788531fdbd2bc5e72205e213a0aa0cf479d"
};


const agent = new CAgent($info);
agent.connect(host,WebSocket);
agent.out = msg => $out(msg);
//agent.log = (s) => ts.debug(s);
/*agent.file = (msg) => {
	const file = msg.n;
	fs.writeFileSync(__dirname+'/files/' + file, Buffer.from(msg.b));
	out('> file: ' + file);
};*/
if (pjson.config){
	if (pjson.config.server === 'free') agent.throttle = true;
}

if (false){
	agent.call('msg',answer,this.SRV)
		.then( res => { })
		.catch(e => { ts.error(50, e); });
}

