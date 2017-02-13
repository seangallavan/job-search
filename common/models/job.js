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



        csv()
            .fromFile(FILEPATH)
            .on('json',(jsonObj)=>{
                newObj = {};
                _.each(mappings, (mapping) => {
                    let parts = mapping.destination.split('.');
                    let property = parts.pop();
                    let obj = newObj;
                    parts.forEach(part => {
                        if(!obj[part]) {
                            obj[part] = {};
                            obj = obj[part];
                        }
                        obj[property] = jsonObj[mapping.source];
                    });
                });

                Job.create(newObj, (err, obj) => {
                    if(err) throw err;
                });
            })
            .on('done',(error)=>{
                cb(null, JSON.stringify({response: 'Success!'}));
            });
    }

    Job.remoteMethod('import', {
        accepts: [
            {arg: 'filename', type: 'string'},
            {arg: 'mappings', type: '[Mapping]'}
        ],
        returns: {arg: 'jobs', type:'Job[]'}
    })
};
