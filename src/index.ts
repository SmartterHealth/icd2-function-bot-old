'use strict';

require('dotenv').config();
import {IDialogInfo} from './dialogs/IDialogInfo';
import * as builder from 'botbuilder';
const helpDialog: IDialogInfo = require('./dialogs/helpDialogInfo');
const searchCodesDialog = require('./dialogs/searchCodesDialogInfo');

var connector:builder.ChatConnector = new builder.ChatConnector({
    appId: process.env.CHAT_CONNECTOR_APP_ID,
    appPassword: process.env.CHAT_CONNECTOR_APP_PASSWORD
});

var bot:builder.UniversalBot = new builder.UniversalBot(connector);

bot.dialog(helpDialog.id, helpDialog.action).triggerAction({ matches: helpDialog.pattern });
bot.dialog(searchCodesDialog.id, searchCodesDialog.dialog).triggerAction({ matches: searchCodesDialog.pattern });

var listener = connector.listen();

module.exports = function (context, req) {
    // When request comes in, pass it to bot's listener function
    // while using the Express-style response object found from
    // context.res.
    listener(req, context.res);
};
