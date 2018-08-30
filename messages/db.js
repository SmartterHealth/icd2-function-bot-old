"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sql = require("mssql");
function parseKeywords(keyword) {
    var regex = /("(.*)")|[^\W\d]+[\u00C0-\u017Fa-zA-Z'](\w|[-'](?=\w))*("(.*)")|[^\W\d]+[\u00C0-\u017Fa-zA-Z'](\w|[-'](?=\w))*/gi;
    var tokens = keyword.match(regex);
    return tokens.join(' AND ');
}
const config = {
    user: process.env.DB_UID,
    password: process.env.DB_PWD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
};
exports.searchCodes = function (keywords) {
    return new Promise((resolve, reject) => {
        var results = [];
        const pool = new sql.ConnectionPool(config, err => {
            if (err)
                reject(err);
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
            });
        });
    });
};
//# sourceMappingURL=db.js.map