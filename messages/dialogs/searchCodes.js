const searchCodes = require('../db').searchCodes;

exports.dialogInfo = {
    id: 'searchCodes',
    name: 'searchCodes',
    pattern: /.*(codes|search codes).*/i,
    dialog:
        [(session, args, next) => {
            var msg = session.message.text;

            var matches = msg.match(/^(codes|search codes)\s?(.*)$/i);
            var keywords = matches[matches.length - 1];

            searchCodes(keywords)
                .then((codes) => {
                    let count = codes.length;

                    console.log(`${count} codes retreived from service.`);

                    if (count < 1) {
                        var msg = `Sorry! I found 0 results for *${keywords}. Please try another search.`
                        session.endDialog(msg);
                    } else {
                        var list = [];
                        codes.forEach(code => {
                            list.push(`\n* ${code.code}: ${code.description}`);
                        });
                        var msg = `Success! Here are ${count} results for *${keywords}:* \n\n` + list.join('\n');
                        session.endDialog(msg);
                    }
                })
                .catch((err) => {
                    console.error(err)
                })
        }]
};; 