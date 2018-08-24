
'use strict';

const sql = require('mssql')

function parseKeywords(keyword) {
    var regex = /("(.*)")|[^\W\d]+[\u00C0-\u017Fa-zA-Z'](\w|[-'](?=\w))*("(.*)")|[^\W\d]+[\u00C0-\u017Fa-zA-Z'](\w|[-'](?=\w))*/gi;
    var tokens = keyword.match(regex);
    return tokens.join (' AND ');
}

const config = {
    user: process.env.DB_UID,
    password: process.env.DB_PWD,
    server: process.env.DB_SERVER, // You can use 'localhost\\instance' to connect to named instance
    database: process.env.DB_NAME,
 
    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
}

const mappings = { 
    'ICD10': 'code',
     'Short_Description': "description",
     "ChapterCodeKey": 'chapter',
     'HIPAA_valid': 'hippa'
}

exports.searchCodes = function(keywords) {   
    
    return new Promise((resolve, reject) => {
        var results = [];

        const pool = new sql.ConnectionPool(config, err => {
            if(err) reject(err);

            pool.request()
                    .input('KEYWORDS', sql.VarChar, parseKeywords(keywords))
                    .execute('[dbo].[SEARCH_CODES]')
                    .then((data) => {
                        data.recordset.forEach((record) => {
                            results.push({
                                "code": record["ICD10"].trim(),
                                "description": record["Short_Description"].trim(),
                                "hipaa": new Boolean(record["HIPAA_valid"]),
                                "chapter": record["ChapterCodeKey"].trim()
                            });
                        });
                        resolve(results);
                    })
                    .catch((err) => {
                        reject(err);
                    })
        });
        
    })
}