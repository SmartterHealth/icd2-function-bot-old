'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const builder = require("botbuilder");
const helpDialog = require('./dialogs/helpDialogInfo');
const searchCodesDialog = require('./dialogs/searchCodesDialogInfo');
var connector = new builder.ChatConnector({
    appId: process.env.CHAT_CONNECTOR_APP_ID,
    appPassword: process.env.CHAT_CONNECTOR_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
bot.dialog(helpDialog.id, helpDialog.action).triggerAction({ matches: helpDialog.pattern });
bot.dialog(searchCodesDialog.id, searchCodesDialog.dialog).triggerAction({ matches: searchCodesDialog.pattern });
var listener = connector.listen();
module.exports = function (context, req) {
    // When request comes in, pass it to bot's listener function
    // while using the Express-style response object found from
    // context.res.
    listener(req, context.res);
};
//# sourceMappingURL=index.js.map