'use strict';
const parse = require('csv-parse');
const fs = require('fs');
const csv=require('csvtojson')

import * as _ from 'lodash';

module.exports = function(Job) {
    Job['import'] = function(filename, mappings, cb) {
        const FILEPATH = __dirname + '/../../files/imports/' + filename;

        let newObj = {};

        mappings = _.filter(mappings, mapping => mapping.source !== undefined && mapping.source !== '');
console.log('mappings', mappings);
        csv()
            .fromFile(FILEPATH)
            .on('json',(jsonObj)=>{
//console.log("jsonObj", jsonObj);
                newObj = {};
                _.each(mappings, (mapping) => {
                    newObj[mapping.destination] = jsonObj[mapping.source];
                });
//console.log("newObj", newObj);
                Job.create(newObj, (err, obj) => {
                    if(err) throw err;
                });
            })
            .on('done',(error)=>{
                cb(null, JSON.stringify({response: 'Success!'}));
            });

        //fs.readFile(FILEPATH + '/' + filename, 'utf-8', function(err, data) {
        //    if(err) {
        //        throw err;
        //    }
        //    parse(data, {}, function(err, csvData) {
        //        if(err) {
        //            throw err;
        //        }
        //
        //    });
        //});
    }

    Job.remoteMethod('import', {
        accepts: [
            {arg: 'filename', type: 'string'},
            {arg: 'mappings', type: '[Mapping]'}
        ],
        returns: {arg: 'jobs', type:'Job[]'}
    })
};
