
exports.dialogInfo  = {
    id: 'searchCodes',
    name: 'searchCodes',
    pattern: /.*(codes|search codes).*/i,
    dialog: 
        [(session, args, next) => {
            var msg = session.message.text;           
            
            var matches = msg.match(/^(codes|search codes)\s?(.*)$/i);
            var keywords = matches[matches.length - 1];



            session.endDialog(keywords);
        }]
    
};; 