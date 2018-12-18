/**
 * The nodejs part of abv-agent bundle
 * build: npm run dist
 */
"use strict";

const ts = require('abv-ts')('abv:agent');
const pjson = require('./package.json');
const fs = require('abv-vfs');
const CAgent = require('abv-agent');
const { Msg } = require('abv-socket');
const crypto = require('crypto');

if (ts.isBrowser){
	if (!window.abv) window.abv = {};
	window.abv.ts = ts;
	window.abv.fs = fs;
	window.abv.pjson = pjson;
	window.abv.crypto = crypto;
	window.abv.CAgent = CAgent;
	window.abv.Msg = Msg;
}
