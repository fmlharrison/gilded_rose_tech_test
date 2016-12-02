function GildedRose() {
  this.items = [];
}

GildedRose.prototype.newQuality = function () {
  for (var i = 0; i < this.items.length; i++) {
    if (this.normalGoodItem(this.items[i])) {this.normalDecay(this.items[i]);}
    if (this.offItem(this.items[i])) {this.doubleDecay(this.items[i]);}
    if (this.isBrie(this.items[i])) {this.addsValue(this.items[i]);}
    if (this.isBackstagePass(this.items[i])) {this.passPrices(this.items[i]);}
    this.reduceSellIn(this.items[i]);
  }
};

GildedRose.prototype.addItem= function (item) {
  this.items.push(item);
};

GildedRose.prototype.isBrie = function (item) {
  return item.name === "Aged Brie" && this.isNotMaxQuality(item);
};

GildedRose.prototype.isBackstagePass = function (item) {
  return item.name === "Backstage passes to a TAFKAL80ETC concert";
};

GildedRose.prototype.isSulfuras = function (item) {
  return item.name === "Sulfuras, Hand of Ragnaros";
};

GildedRose.prototype.isNormalItem = function (item) {
  return !this.isBrie(item) && !this.isBackstagePass(item) && !this.isSulfuras(item);
};

GildedRose.prototype._itemQuality = function (item) {
  return item.quality;
};

GildedRose.prototype.isNotMaxQuality = function (item) {
  return this._itemQuality(item) < 50;
};

GildedRose.prototype.isNotMinQuality = function (item) {
  return this._itemQuality(item) > 0;
};

GildedRose.prototype.sellInValue = function (item) {
  return item.sell_in;
};

GildedRose.prototype._isPastSellIn = function (item) {
  return item.sell_in <= 0;
};

GildedRose.prototype.isItemStillOk = function (item) {
  return this.isNotMinQuality(item) && !this._isPastSellIn(item);
};

GildedRose.prototype.normalGoodItem = function (item) {
  return this.isNormalItem(item) && this.isItemStillOk(item);
};

GildedRose.prototype.offItem = function (item) {
  return this.isNormalItem(item) && this._isPastSellIn(item) && this.isNotMinQuality(item);
}

GildedRose.prototype.normalDecay = function (item) {
  item.quality = item.quality - 1;
};

GildedRose.prototype.doubleDecay = function (item) {
  item.quality = item.quality - 2;
};

GildedRose.prototype.addsValue = function (item) {
  item.quality = item.quality + 1;
};

GildedRose.prototype.addsValue2 = function (item) {
  item.quality = item.quality + 2;
};

GildedRose.prototype.addsValue3 = function (item) {
  item.quality = item.quality + 3;
};

GildedRose.prototype.loseAllValue = function (item) {
  item.quality = item.quality - item.quality;
};

GildedRose.prototype.reduceSellIn = function (item) {
  if (!this.isSulfuras(item)) {item.sell_in = item.sell_in - 1;}
};

GildedRose.prototype.passPrices = function (item) {
  if (this.sellInValue(item) === 0) {this.loseAllValue(item);
  } else if (this.sellInValue(item) <= 5) {this.addsValue3(item);
  } else if (this.sellInValue(item) <= 10) {this.addsValue2(item);
  } else if (this.sellInValue(item) > 10) {this.addsValue(item); }
};
