'use strict';

var Alexa = require('alexa-sdk');
var APP_ID = 'arn:aws:lambda:us-east-1:444491341796:function:AussieSlangHowTo';
var SKILL_NAME = 'Aussie Slang';
var dictionary = require('./dictionary');

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    // 'NewSession': function () {
    'LaunchRequest': function () {
        this.attributes['speechOutput'] = 'Welcome to ' + SKILL_NAME + '. You can ask a question like, what\'s 5a barbie? Now, what can I help you with?';
        // If the user either does not reply to the welcome message or says something that is not
        // understood, they will be prompted again with this text.
        this.attributes['repromptSpeech'] = 'For instructions on what you can ask, please say help me.';
        this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptSpeech'])
    },
    'RecipeIntent': function () {
        var wordSlot = this.event.request.intent.slots.Word;
        var wordName;
        if (wordSlot && wordSlot.value) {
            wordName = wordSlot.value.toLowerCase();
        }

        var cardTitle = SKILL_NAME + ' - Meaning of ' + wordName;
        var recipe = dictionary[wordName];

        if (recipe) {
            this.attributes['speechOutput'] = recipe + "Are there any other words you want to know?";
            this.attributes['repromptSpeech'] = 'Try saying repeat.';
            this.emit(':askWithCard', recipe, this.attributes['repromptSpeech'], cardTitle, recipe);
        } else {
            var speechOutput = 'I\'m sorry mate, I currently do not know what that means.';
            var repromptSpeech = 'What else can I help with?';
            if (wordName) {
                speechOutput = 'The meaning of ' + wordName + ' is ' + dictionary[wordName] + ".";
            } else {
                speechOutput = 'that meaning. ';
            }
            speechOutput += repromptSpeech;

            this.attributes['speechOutput'] = speechOutput;
            this.attributes['repromptSpeech'] = repromptSpeech;

            this.emit(':ask', speechOutput, repromptSpeech);
        }
    },
    'AMAZON.HelpIntent': function () {
        this.attributes['speechOutput'] = 'You can ask questions such as, what\'s the meaning of mozzie, or, you can say exit... ' +
            'Now, what can I help you with?';
        this.attributes['repromptSpeech'] = 'You can say things like, what\'s the meaning of mozzie, or you can say exit...' +
            ' Now, what can I help you with?';
        this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptSpeech'])
    },
    'AMAZON.RepeatIntent': function () {
        this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptSpeech'])
    },
    'AMAZON.StopIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'AMAZON.CancelIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'SessionEndedRequest':function () {
        this.emit(':tell', 'Goodbye mate!');
    }
};