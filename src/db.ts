import * as sql from 'mssql'

function parseKeywords(keyword) {
    var regex = /("(.*)")|[^\W\d]+[\u00C0-\u017Fa-zA-Z'](\w|[-'](?=\w))*("(.*)")|[^\W\d]+[\u00C0-\u017Fa-zA-Z'](\w|[-'](?=\w))*/gi;
    var tokens = keyword.match(regex);
    return tokens.join(' AND ');
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

export interface IICD10Code {
    code: string;
    description: string;
    chapter: string;
    hipaa: boolean;
}

exports.searchCodes = function (keywords) {

    return new Promise<IICD10Code[]>((resolve, reject) => {
        var results = [];

        const pool = new sql.ConnectionPool(config, err => {
            if (err) reject(err);

            pool.request()
                .input('KEYWORDS', sql.VarChar, parseKeywords(keywords))
                .execute('[dbo].[SEARCH_CODES]')
                .then((data) => {
                    data.recordset.forEach((record) => {
                        results.push({
                            "code": record["code"].trim(),
                            "description": record["description"].trim(),
                            "hipaa": new Boolean(record["hipaa"]),
                            "chapter": record["chapter"].trim()
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