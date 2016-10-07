'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var SKILL_NAME = 'Cheese of the Day';

/**
 * Array containing cheeses.
 */
var CHEESES = [
    "Roquefort - Roquefort is a popular French cheese, reported to be a favorite of Emperor Charlemagne. Genuine Roquefort is rich, creamy and sharp, tangy, salty in flavour. It is aged for 5 months. It is also mostly used in salads and dressings.",
    "Camembert - Very good varieties of Camembert cheese made from pasteurised milk can be found in Normandy today. Young Camembert has a milky and sweet taste. As the cheese matures it forms a smooth, runny interior and a white bloomy rind that is typical to Camenbert cheese. It has a rich, buttery flavour.",
    "Cotija - Cotija is a Hispanic-style cheese named after the town of Cotija in the Mexican state of Michoacán. This hard, crumbly Mexican cheese is made mainly from cow’s milk.",
    "Chevre - Chevre is French for Goat’s cheese. Goat cheeses have a unique, tart, earthy flavour that sets them apart from cow cheeses. This distinctive tang and aroma grows robust and bold as it ages.",
    "Feta - Feta is undoubtedly one of the most famous Greek cheeses. In fact, Feta occupies 70% stake in Greek cheese consumption. Traditional feta is a mix of goat's milk and sheep's milk. Feta is a pickled curd cheese that has a salty and tangy taste enhanced by the brine solution.",
    "Mozzarella - Mozzarella cheese is a sliceable curd cheese originating in Italy. Unlike most cheeses, it is not aged and eaten fresh and within few hours after it is made.",
    "Emmental - Emmental is produced in the central cantons of Switzerland. It is a traditional, unpasteurised, hard cheese made from cow's milk. The aroma is sweet with tones of fresh-cut hay. The flavour is very fruity, not without a tone of acidity. ",
    "Cheddar - Cheddar cheese is the most widely purchased and eaten cheese in the world. It is always made from cow's milk. It is a hard and natural cheese that has a slightly crumbly texture. It gets a sharper taste as it matures.",
    "Gouda - Gouda is a Dutch cheese made from pasteurised cow's milk. It a semi-hard cheese celebrated for its rich, unique flavour and smooth texture. There are many different types of Gouda cheese, classified by their texture and age.",
    "Taleggio - Taleggio is a smear-ripened Italian cheese named after the caves of Val Taleggio. It’s one of the oldest soft cheeses produced in every autumn and winter.  The cheese has a strong smell, but its taste is relatively mild with an unusual fruity tang. To make it brighter and moderate, factories add spices, raisins, nuts and some lemons to it.",
    "Parmigiano-Reggiano - Also known as parmesan cheese, parmigiano-reggiano has a hard, gritty texture and is fruity and nutty in taste. It is considered as among the top cheeses in the world.",
    "Manchego - The Manchego is produced in the La Mancha region of Spain, which is also home to Don Quixote. It is made from unpasteurised sheep's milk. As the manchego matures over time, the taste and texture progresses from fruity and tangy, to crumbly and sweet. The rind is inedible.",
    "Monterey Jack - Monterey Jack is an American cheese. Around the 1700s, monasteries around the Monterey region were making a semi-firm, creamy, mild flavoured cheese from cow’s milk which they aged for a little period. It is mild in flavour and melts well.",
    "Blue Cheese - Blue Cheese are cheeses produced with cow's milk, sheep's milk, or goat's milk and ripened with cultures of the mold Penicillium. They can be identified by the peculiar smell that comes from the cultivated bacteria. The flavour of the cheese depends on the type of blue cheese, shape, size, climate of the curing and the length of ageing. But it generally tends to be sharp and salty. ",
    "Brie - Brie is the best known French cheese and has a nickname called the Queen of Cheeses. Brie is produced from the whole or semi-skimmed cow's milk. Brie cheese is slightly pale in colour with a greyish tinge under a rind. Its flavour varies depending upon the ingredients added while producing the cheese, but is an excellent dessert cheese.",
    "Mascarpone - Mascarpone is an Italian cheese from the Lombardy region, made by curdling milk cream with citric acid or acetic acid. It is a thick, double or triple cream, soft cheese with a very high fat content. The texture ranges from smooth, to creamy, to buttery.",
    "Provolone - Provolone is an Italian cheese made from cow’s milk whose origins lie in Southern Italy. There are two kinds: Provolone Dolce which has a pale yellow to white colour and sweet taste, and Provolone Piccante which has a sharper taste.",
    "Gorgonzola - Gorgonzola is one of the world's oldest blue-veined cheeses. The Cheese is mainly produced in the northern Italian regions of Piedmont and Lombardy, Gorgonzola. Unskimmed cow's milk is used while preparing the cheese. This cheese has crumbly and soft texture with nutty aroma. It can have a mild to sharp taste depending on its age.",
    "Cheese curds - Cheese curds are bite-size solid parts of soured milk either eaten alone or used in regional dishes, especially in Canada and United States. Cheese curds are mild, salty to taste, but the flavour can differ depending on how it is made. They display the same firmness as cheese but with an added springy or rubbery texture.",
    "Gruyere - Gruyere is a popular Swiss cheese made of cow's milk. It is traditional, creamery, unpasteurised, semi-soft cheese. The natural, rusty brown rind is hard, dry and pitted with tiny holes."
];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetCheese');
    },
    'GetNewCheeseIntent': function () {
        this.emit('GetCheese');
    },
    'GetCheese': function () {
        // Get a random cheese from the cheeses list
        var cheeseIndex = Math.floor(Math.random() * CHEESES.length);
        var randomCheese = CHEESES[cheeseIndex];

        // Create speech output
        var speechOutput = "Today's recommended cheese is: " + randomCheese;

        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomCheese)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "Hello. You can ask what is the cheese of the day, or, you can say stop ... What can I help you with?";
        var reprompt = "Do you want a cheese recommendation?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    }
};