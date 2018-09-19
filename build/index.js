'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const builder = require("botbuilder");
const helpDialogInfo_1 = require("./dialogs/helpDialogInfo");
const searchCodesDialogInfo_1 = require("./dialogs/searchCodesDialogInfo");
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});
var bot = new builder.UniversalBot(connector);
// Load dialogs
bot.dialog(helpDialogInfo_1.helpDialog.id, helpDialogInfo_1.helpDialog.action).triggerAction({ matches: helpDialogInfo_1.helpDialog.pattern });
bot.dialog(searchCodesDialogInfo_1.searchCodesDialog.id, searchCodesDialogInfo_1.searchCodesDialog.action).triggerAction({ matches: searchCodesDialogInfo_1.searchCodesDialog.pattern });
var listener = connector.listen();
module.exports = function (context, req) {
    // When request comes in, pass it to bot's listener function
    // while using the Express-style response object found from
    // context.res.
    listener(req, context.res);
};
