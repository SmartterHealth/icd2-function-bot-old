'use strict';

var builder = require('botbuilder');
const helpDialog = require('./dialogs/help').dialogInfo;
const searchCodesDialog = require('./dialogs/searchCodes').dialogInfo;

var connector = new builder.ChatConnector({
    appId: process.env.CHAT_CONNECTOR_APP_ID,
    appPassword: process.env.CHAT_CONNECTOR_APP_PASSWORD
});

var LUIS_RECOGNIZER_URL = process.env.LUIS_RECOGNIZER_URL;

var recognizers = [];

var intents = new builder.IntentDialog({
    recognizers: recognizers
});

var bot = new builder.UniversalBot(connector);

bot.dialog(helpDialog.id, helpDialog.dialog).triggerAction({ matches: helpDialog.pattern });
bot.dialog(searchCodesDialog.id, searchCodesDialog.dialog).triggerAction({ matches: searchCodesDialog.pattern });

var listener = connector.listen();

module.exports = function (context, req) {
    // When request comes in, pass it to bot's listener function
    // while using the Express-style response object found from
    // context.res.
    listener(req, context.res);
};
