function GildedRose() {
  this.items = [];
}

GildedRose.prototype.addItem= function (item) {
  this.items.push(item);
};

GildedRose.prototype.isBrie = function (item) {
  return item.name === "Aged Brie";
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
GildedRose.prototype._isPastSellIn = function (item) {
  return item.sell_in <= 0;
};

GildedRose.prototype.isItemStillOk = function (item) {
  return this._itemQuality(item) > 0 && !this._isPastSellIn(item);
};

GildedRose.prototype.normalGoodItem = function (item) {
  return this.isNormalItem(item) && this.isItemStillOk(item);
};

GildedRose.prototype.offItem = function (item) {
  return this.isNormalItem(item) && this._isPastSellIn(item);
}

GildedRose.prototype.normalDecay = function (item) {
  item.quality = item.quality - 1;
};

GildedRose.prototype.doubleDecay = function (item) {
  item.quality = item.quality - 2;
};

GildedRose.prototype.reduceSellIn = function (item) {
  if (!this.isSulfuras(item)) {item.sell_in = item.sell_in - 1;}
};

GildedRose.prototype.newQuality = function () {
  for (var i = 0; i < this.items.length; i++) {
    if (this.normalGoodItem(this.items[i])) {this.normalDecay(this.items[i]);}
    if (this.offItem(this.items[i])) {this.doubleDecay(this.items[i]);}
    this.reduceSellIn(this.items[i]);
  }
};

GildedRose.prototype.update_quality = function () {
  for (var i = 0; i < this.items.length; i++) {
    if (this.isNormalItem(this.items[i])) {
      if (this.items[i].quality > 0) {
        if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
          this.items[i].quality = this.items[i].quality - 1
        }
      }
    } else {
      if (this.isNotMaxQuality(this.items[i])) {
        this.items[i].quality = this.items[i].quality + 1
        if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
          if (this.items[i].sell_in < 11) {
            if (this.items[i].quality < 50) {
              this.items[i].quality = this.items[i].quality + 1
            }
          }
          if (this.items[i].sell_in < 6) {
            if (this.isNotMaxQuality(this.items[i])) {
              this.items[i].quality = this.items[i].quality + 1
            }
          }
        }
      }
    }
    if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
      this.items[i].sell_in = this.items[i].sell_in - 1;
    }
    if (this.items[i].sell_in < 0) {
      if (this.items[i].name != 'Aged Brie') {
        if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
          if (this.items[i].quality > 0) {
            if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
              this.items[i].quality = this.items[i].quality - 1
            }
          }
        } else {
          this.items[i].quality = this.items[i].quality - this.items[i].quality
        }
      } else {
        if (this.isNotMaxQuality(this.items[i])) {
          this.items[i].quality = this.items[i].quality + 1
        }
      }
    }
  }
}
