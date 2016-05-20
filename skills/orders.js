module.exports = function (skill, info, bot, message) {
    var sqlite3 = require('sqlite3').verbose();
    var file = "orders";
    var db = new sqlite3.Database(file);
    var drink = '';
    var price = 0;

    if (message.text.indexOf('clear') > -1) {
        db.serialize(function () {
            var query = "DELETE FROM demo";
            db.run(query);
        });
    }

    if (message.text.indexOf('lager') > -1) {
        drink = 'lager';
        price = '1.50';
    }

    if (message.text.indexOf('ale') > -1) {
        drink = 'ale';
        price = '1.50';
    }

    if (message.text.indexOf('cider') > -1) {
        drink = 'cider';
        price = '2.00';
    }

    if (message.text.indexOf('red wine') > -1) {
        drink = 'red wine';
        price = '1.50';
    }

    if (message.text.indexOf('white wine') > -1) {
        drink = 'white wine';
        price = '1.50';
    }

    if (drink) {
        bot.reply(message, '<@' + message.user + '> has placed an order for a ' + drink);

        db.serialize(function () {
            //var query = "DELETE FROM demo where userName = '" + message.user + "'";
            //db.run(query);
            var query = "INSERT INTO demo (orderName, price, userName) VALUES ('" + drink + "','" + price + "','" + message.user + "')";
            db.run(query);

        });
    }

    var orderList = 'Current Orders are \n';

    db.all("SELECT orderName, userName, price FROM demo", function (err, rows) {
        console.log (rows);
        var redGlasses = 0;
        var whiteGlasses = 0;
        rows.forEach(function (row) {
            if (row.orderName == 'red wine') {
                redGlasses++;
            }
            if (row.orderName == 'white wine') {
                whiteGlasses++;
            }

            orderList = orderList + '<@' + row.userName + '>: ' + row.orderName + ' £'+ row.price +'\n';
        });

        if (redGlasses > 2) {
            orderList = orderList + 'Yay! We have enough Red Wine to get a bottle of Red\n';
        }
        if (whiteGlasses > 2) {
            orderList = orderList + 'Yay! We have enough White Wine to get a bottle of White\n';
        }
        bot.reply(message, orderList);
    });
};
