var fs = require('fs'),
    path = require('path'),
    dyson = require('../lib/dyson'),
    request = require('supertest'),
    express = require('express'),
    sinon = require('sinon');

var key = fs.readFileSync(path.join(__dirname, 'fixtures', 'key.pem')),
    cert = fs.readFileSync(path.join(__dirname, 'fixtures', 'cert.pem'));

describe('dyson.https', function() {

    describe('request', function(){

        var app;

        before(function() {
            app = dyson.bootstrap({
                configDir: path.join(__dirname, '..', 'dummy'),
                port: 8765,
                https: {
                    key: key,
                    crt: cert
                }
            });
        });

        after(() => {
            app.get('server').close();
        });

        it('should respond with correct body', function(done){
            request(app).get('/dummy/1').ca(cert).expect(200, {"id": 1, "name": "Lars", "status": "OK"}, done);
        });
    });
});
