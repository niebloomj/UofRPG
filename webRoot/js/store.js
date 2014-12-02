var storeItems = [
  {
    id: "jacket",
    displayName: "Jacket",
    isBuyable: true,
    isPersistent: true,
    price: 100,
    description: "Basic protection against the harsh winter",
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
  },
  {
    id: "healthpotion_small",
    displayName: "Small Health Potion",
    isBuyable: true,
    isPersistent: false,
    price: 30,
    description: "Restores 20 health points",
    fileLarge: "img/sprites/placeholder_64.png",
    fileSmall: "img/sprites/placeholder_32.png",
    attributes: {
      maxHealth: 0,
      health: 20,
      strength: 0,
      defense: 0,
      intelligence: 0,
      charisma: 0
    }
  },
  {
    id: "healthpotion_large",
    displayName: "Large Health Potion",
    isBuyable: true,
    isPersistent: false,
    price: 50,
    description: "Restores 40 health points",
    fileLarge: "img/sprites/placeholder_64.png",
    fileSmall: "img/sprites/placeholder_32.png",
    attributes: {
      maxHealth: 0,
      health: 40,
      strength: 0,
      defense: 0,
      intelligence: 0,
      charisma: 0
    }
  }
];


$('#storeModal').on('show.bs.modal', function (event) {
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
    html += '<div class="col-xs-3 store-modal-item" data-storeid="' + item.id + '">';
    html += '<div class="panel panel-default"><div class="panel-body">';
    html += '<div class="store-modal-image"><img src="' + item.fileLarge + '"></div>';
    html += '<div class="store-modal-caption">';
    html += '<h4 class="store-modal-title">' + item.displayName + '</h4>';
    html += '<p>' + item.description + '</p>';

    console.log(player.money - item.price);
    var canBuy = !player.isInInventory(item.id)
      && item.isBuyable
      && player.money - item.price >= 0
      && ((item.attributes.health != 0 && player.health != player.maxHealth) || item.attributes.health == 0);
    var disabledStr = canBuy ? "" : ' disabled="disabled"';
    var buyStr = /*canBuy ?*/ 'Buy ($' + item.price + ')' /*: 'n/a ($' + item.price + ')'*/;

    html += '<button type="button" class="btn btn-primary btn-xs btn-block store-modal-buy" data-index="' + i + '"' + disabledStr + '>';
    html += buyStr + '</button>';
    html += '</div>';
    html += '</div></div></div>';
    if (i % 4 == 3) {
      html += '<div class="clearfix"></div>';
    }
    itemsHtml += html;
  }
  itemContainer.html(itemsHtml);

  $('.store-modal-buy').click(function(){
    var button = $(this);
    var index = parseInt(button.attr('data-index'));
    var item = storeItems[index];
    player.addToInventory(item);
    player.setMoney(player.money - item.price);
    Messenger().post({
        parentLocations: ['.theGame'],
        message: "Item purchased!",
        type: "success",
        hideAfter: "3"
    });
    updateStore();
  });
}