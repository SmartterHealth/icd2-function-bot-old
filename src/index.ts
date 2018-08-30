'use strict';

require('dotenv').config();
import {IDialogInfo} from './dialogs/IDialogInfo';
import * as builder from 'botbuilder';
import {helpDialog} from './dialogs/helpDialogInfo';
import {searchCodesDialog} from './dialogs/searchCodesDialogInfo';

var connector:builder.ChatConnector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

var bot:builder.UniversalBot = new builder.UniversalBot(connector);

// Load dialogs
bot.dialog(helpDialog.id, helpDialog.action).triggerAction({ matches: helpDialog.pattern });
bot.dialog(searchCodesDialog.id, searchCodesDialog.action).triggerAction({ matches: searchCodesDialog.pattern });

var listener = connector.listen();

module.exports = function (context, req) {
    // When request comes in, pass it to bot's listener function
    // while using the Express-style response object found from
    // context.res.
    listener(req, context.res);
};
