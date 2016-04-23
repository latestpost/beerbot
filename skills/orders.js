module.exports = function(skill, info, bot, message) {
    var sqlite3 = require('sqlite3').verbose();
    var file = "orders";
    var db = new sqlite3.Database(file);
    var drink = '';
    if (message.text.indexOf('lager') > -1) {
        drink = 'lager';
    }
    if (message.text.indexOf('ale') > -1) {
        drink = 'ale';
    }
    if (message.text.indexOf('cider') > -1) {
        drink = 'cider';
    }
    if (message.text.indexOf('wine') > -1) {
        drink = 'red wine';
    }

    if (drink) {
        bot.reply(message, '<@' + message.user + '> has placed an order for a ' + drink);

        db.serialize(function() {
            var query = "DELETE FROM demo where userName = '" + message.user + "'";
            db.run(query);
            var query = "INSERT INTO demo (orderName, userName) VALUES ('" + drink + "','" + message.user + "')";
            db.run(query);

        });
    }

    var orderList = 'Current Orders are \n';

    db.all("SELECT orderName,userName FROM demo", function(err, rows) {
        var redGlasses = 0;
        var whiteGlasses = 0;
        rows.forEach(function(row) {
            if (row.orderName == 'red wine') {
                redGlasses++;
            }
            if (row.orderName == 'white wine') {
                whiteGlasses++;
            }
            if (redGlasses > 3) {
                orderList = orderList + 'Yay! We have enough Red Wine to get a bottle of Red\n';
            }
            if (whiteGlasses > 3) {
                orderList = orderList + 'Yay! We have enough White Wine to get a bottle of White\n';
            }
            orderList = orderList + '<@' + row.userName + '>: ' + row.orderName + '\n';

        });
        bot.reply(message, orderList);
    });
};
