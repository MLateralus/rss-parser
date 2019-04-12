// Externals
const srv = require('./options');
const crypto = require('crypto');
const express = require('express');
const request = require('request');
const { parseString } = require('xml2js');
const bodyParser = require('body-parser');
const jsmediatags = require('jsmediatags');
const port = srv.conf.port;

const app = express();
app.use(bodyParser.urlencoded({
    extended: false,
}));

app.get('/rss', async (req, res) => {
	let rss = req.query.url;
	getRSS(rss).then((xml)=>{
		parseString(xml, (err, result)=>{
			let list = prepResponse(result);
			res.json({"result" : list});
		});
	})
	.catch((err)=>{
		res.json({"err": err});
	});
});

app.get('/id3', async (req, res) => {
	let url = req.query.url; 
	getRSS(url).then((payload) => {
		new jsmediatags.Reader(url)
		.setTagsToRead(["title", "artist"])
		.read({
		  onSuccess: function(tag) {
			res.json(tag);
		  },
		  onError: function(err) {
			res.json({'err' : err});
		  }
		});
	})
	.catch((err) => {
		res.json({"err": err});
	})
});

function prepResponse(json){
	let list = [];
	let items = json.rss.channel[0].item;
	items.forEach((elem) => {
		list.push({
			title: 	elem.title[0],
			checksum: checksum(elem['<host>:episodeId'][0]),
			url: elem.link[0]
		});
	});
	return list;
}

function checksum(str, algorithm, encoding) {
	return crypto
	  .createHash(algorithm || 'md5')
	  .update(str, 'utf8')
	  .digest(encoding || 'hex')
  }

function getRSS(url){
	return new Promise((res, rej) => {
		request({
			url: url,
			json: true,
			headers: {
				'User-Agent': 'Kjeragbolten'
			}
		},
		function(error, resp, body){
			if(!error && resp.statusCode === 200){
				res(resp.body);
			} else {
				rej(`Unable to resolve url: ${url}, please check if the url is correct`);
			}
		});
	});
}

app.listen(port, () => {
    console.log('info', `Kjeragbolten up on: ${port}`);
});