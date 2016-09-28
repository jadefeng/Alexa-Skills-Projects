'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var SKILL_NAME = 'Aussie Facts';

/**
 * Array containing space facts.
 */
var FACTS = [
    "Australia is the 6th largest country in the world, occupying an entire continent of some 7.6 million square kilometres.",
    "Australia has the world's 3rd largest ocean territory, spanning three oceans and covering around 12 million square kilometres.",
    "Vegetation covers over 90 percent of Australia.",
    "Melbourne has the world’s largest Greek population outside of Athens.",
    "The Indigenous 'Dream Time' is the foundation for tens of thousands of years of spiritual aboriginal art, traditions, legends, myths, folklore and culture.",
    "More than 85% of Australians live within 50km of the coast.",
    "Australia has the world's highest proportion of migrant settlers in a developed nation, with over 25% of Australians born in another country spanning 200 countries.",
    "Australia has 16 world heritage listed sites including historic townships, cities and landscapes.",
    "Approximately 1.35 trillion bottles of wine are produced by Australia. That's about 60 bottles of wine per person.",
    "Australia is the best place in the world, mate.",
    "Australian TV networks love cooking shows, with MasterChef and My Kitchen Rules as the most popular television shows.",
    "Canberra was selected as the capital because Sydney and Melbourne could not stop arguing which city should be the capital of Australia.",
    "Former Prime Minister Bob Hawke of Australia set a world record for sculling 2.5 pints of beer in 11 seconds. Hawke later suggested that this was the reason for his great political success.",
    "Australia’s first police force was made up of the most well-behaved convicts.",
    "Saudi Arabia imports camels from Australia (mostly for meat production).",
    "Kangaroos and emus cannot walk backward, one of the reasons that they’re on the Australian coat of arms.",
    "Prime Minister of Australia, Harold Holt, went for a swim at Cheviot Beach, and was never seen again.",
    "Captain James Cook first landed on Australia’s east coast in 1770.",
    "Australia was almost a French colony. In 1788, the British came to Australia with eleven ships to establish a penal colony. Two days later, two French ships arrived just too late to claim Australia for France."
];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random Aussie fact from the Aussie facts list
        var factIndex = Math.floor(Math.random() * FACTS.length);
        var randomFact = FACTS[factIndex];

        // Create speech output
        var speechOutput = "Gday, did you know: " + randomFact;

        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "G'day. You can say tell me an Aussie fact, or, you can say exit... What can I help you with?";
        var reprompt = "What do you want to know, mate?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    }
};