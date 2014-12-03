var storeItems = [{
    id: "jacket",
    displayName: "Jacket",
    isBuyable: true,
    isPersistent: true,
    price: 100,
    description: "Basic protection against the cold",
    fileLarge: "img/sprites/letterman_jacket_64.png",
    fileSmall: "img/sprites/letterman_jacket_32.png",
    attributes: {
        maxHealth: 0,
        health: 0,
        strength: 0,
        defense: 0,
        intelligence: 0,
        charisma: 0
    }
}, {
    id: "yardStick",
    displayName: "Yard Stick",
    isBuyable: true,
    isPersistent: true,
    price: 500,
    description: "Wack people with an extra 5 strength",
    fileLarge: "img/sprites/placeholder_64.png",
    fileSmall: "img/sprites/placeholder_32.png",
    attributes: {
        maxHealth: 0,
        health: 0,
        strength: 5,
        defense: 0,
        intelligence: 0,
        charisma: 0
    }
}, {
    id: "textbook",
    displayName: "Textbook",
    isBuyable: true,
    isPersistent: true,
    price: 1000,
    description: "Bludgeon your way through life with overpriced literature",
    fileLarge: "img/sprites/placeholder_64.png",
    fileSmall: "img/sprites/placeholder_32.png",
    attributes: {
        maxHealth: 0,
        health: 0,
        strength: 10,
        defense: 0,
        intelligence: 20,
        charisma: 0
    }
}, {
    id: "healthboost_small",
    displayName: "Oreos",
    isBuyable: true,
    isPersistent: false,
    price: 30,
    description: "Restores 20 health points",
    fileLarge: "img/sprites/oreo_64.png",
    fileSmall: "img/sprites/oreo_32.png",
    attributes: {
        maxHealth: 0,
        health: 20,
        strength: 0,
        defense: 0,
        intelligence: 0,
        charisma: 0
    }
}, {
    id: "healthboost_large",
    displayName: "Poptarts",
    isBuyable: true,
    isPersistent: false,
    price: 50,
    description: "Restores 40 health points",
    fileLarge: "img/sprites/poptart_64.png",
    fileSmall: "img/sprites/poptart_32.png",
    attributes: {
        maxHealth: 0,
        health: 40,
        strength: 0,
        defense: 0,
        intelligence: 0,
        charisma: 0
    }
}, {
    id: "wastemoney",
    displayName: "Throw away $100",
    isBuyable: true,
    isPersistent: false,
    price: 100,
    description: "Welcome to Hillside, bitch!",
    fileLarge: "img/sprites/fuckyou_64.png",
    fileSmall: "img/sprites/fuckyou_32.png",
    attributes: {
        maxHealth: 0,
        health: 0,
        strength: 0,
        defense: 0,
        intelligence: 0,
        charisma: 0
    }
}, {
    id: "tuition",
    displayName: "Tuition",
    isBuyable: true,
    isPersistent: true,
    price: 70008,
    description: "Pay off your annual student debt!",
    fileLarge: "img/sprites/placeholder_64.png",
    fileSmall: "img/sprites/placeholder_32.png",
    attributes: {
        maxHealth: 0,
        health: 0,
        strength: 0,
        defense: 0,
        intelligence: 0,
        charisma: 0
    }
}];


$('#storeModal').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget);
    updateStore();
});

function updateStore() {
    var modal = $('#storeModal');

    var itemContainer = modal.find('.store-modal-items');
    var itemsHtml = "";
    for (var i = 0; i < storeItems.length; i++) {
        var item = storeItems[i];
        var html = "";
        html += '<div class="col-xs-4 store-modal-item" data-storeid="' + item.id + '">';
        html += '<div class="panel panel-default"><div class="panel-body">';
        html += '<div class="store-modal-image"><img src="' + item.fileLarge + '"></div>';
        html += '<div class="store-modal-caption">';
        html += '<h4 class="store-modal-title">' + item.displayName + '</h4>';
        html += '<p class="text-center">' + item.description + '</p>';

        var canBuy = true;

        var buyStr = "Buy";
        if (!item.isBuyable || player.isInInventory(item.id)) {
            buyStr = "Sold Out";
            canBuy = false;
        } else if (player.money - item.price < 0) {
            buyStr = "Too Expensive";
            canBuy = false;
        } else if (player.health >= player.maxHealth && item.attributes.health != 0) {
            buyStr = "Already Full";
            canBuy = false;
        }
        buyStr += ' ($' + item.price + ')';

        var disabledStr = canBuy ? "" : ' disabled="disabled"';


        html += '<button type="button" class="btn btn-primary btn-xs btn-block store-modal-buy" data-index="' + i + '"' + disabledStr + '>';
        html += buyStr + '</button>';
        html += '</div>';
        html += '</div></div></div>';
        if (i % 3 == 2) {
            html += '<div class="clearfix"></div>';
        }
        itemsHtml += html;
    }
    itemContainer.html(itemsHtml);

    $('.store-modal-buy').click(function() {
        if (inCombat) {
            Messenger().post({
                message: "Can't shop while in combat!",
                type: "error",
                hideAfter: "5"
            });
        } else {
            var button = $(this);
            var index = parseInt(button.attr('data-index'));
            var item = storeItems[index];
            player.addToInventory(item);
            player.setMoney(player.money - item.price);
            Messenger().post({
                message: "Item purchased!",
                type: "success",
                hideAfter: "3"
            });
            updateStore();
            saveGame();
        }
    });
}
