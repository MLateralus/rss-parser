const assert = require('assert');
const request = require('request');
const { parseString } = require('xml2js');

describe('Basics', () => {
    let response = '';
    before(() => {
        request({
            url: `http://localhost:3000/rss?url=https://rss.acast.com/aliceochbianca`,
            json: true,
            headers: {
                'User-Agent': 'Kjeragbolten'
            }
        },
        function(error, resp, body){
            parseString(resp.body, (err, result)=>{
                response = result;
            });
        });
    });

    describe('localhost', () => {
        it('Localhost should respond with 200', ()=>{
            request({
                url: `http://localhost:3000/rss`,
                json: true,
                headers: {
                    'User-Agent': 'Kjeragbolten'
                }
            },
            function(error, resp, body){
                assert.equal(resp.statusCode, 200)
            });
        });
    });
    
    describe('rss', () => {
        it('RSS server should be avaliable', () => {
            request({
                url: `https://rss.<host>.com`,
                json: true,
                headers: {
                    'User-Agent': 'Kjeragbolten'
                }
            },
            function(error, resp, body){
                assert.equal(resp.statusCode, 200)
            });
        });
    });

    describe('media server', () => {
        it('media server should be avaliable', () => {
            request({
                url: `https://media.<host>.com/`,
                json: true,
                headers: {
                    'User-Agent': 'Kjeragbolten'
                }
            },
            function(error, resp, body){
                assert.equal(resp.statusCode, 200)
            });
        });
    });

    describe('episodes response', () => {
        it('Episodes repsonse should not be empty', () => {
            assert.notEqual(response, null);
        });
    });

});