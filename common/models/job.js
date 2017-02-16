'use strict';
const parse = require('csv-parse');
const fs = require('fs');
const csv=require('csvtojson')
const _ = require('lodash');

module.exports = function(Job) {

    Job['import'] = function(filename, mappings, cb) {
        const FILEPATH = __dirname + '/../../files/imports/' + filename;

        mappings = _.filter(mappings, mapping => mapping.source !== undefined && mapping.source !== '');

        csv()
            .fromFile(FILEPATH)
            .on('json',(jsonObj)=>{ //Runs once per csv line
                let newObj = {};
                _.each(mappings, (mapping) => {
                    if(jsonObj[mapping.source] && jsonObj[mapping.source] !== '') {
                        if(jsonObj[mapping.source].startsWith('#') && jsonObj[mapping.source].endsWith('#')) {
                            jsonObj[mapping.source] = jsonObj[mapping.source].substring(1, jsonObj[mapping.source].length - 1);
                        }
                        _.setWith(newObj, mapping.destination, jsonObj[mapping.source], Object);
                    }
                });

                Job.create(newObj, (err, obj) => {
                    if(err) throw err;
                });
            })
            .on('done',(error)=>{
                cb(null, JSON.stringify({response: 'Success!'}));
            });
    };

    Job.remoteMethod('import', {
        accepts: [
            {arg: 'filename', type: 'string'},
            {arg: 'mappings', type: '[Mapping]'}
        ],
        returns: {arg: 'jobs', type:'Job[]'}
    });
};
