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

GildedRose.prototype.isNormalItem = function (item) {
  return !this.isBrie(item) && !this.isBackstagePass(item);
};

GildedRose.prototype._itemQuality = function (item) {
  return item.quality;
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
      if (this.items[i].quality < 50) {
        this.items[i].quality = this.items[i].quality + 1
        if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
          if (this.items[i].sell_in < 11) {
            if (this.items[i].quality < 50) {
              this.items[i].quality = this.items[i].quality + 1
            }
          }
          if (this.items[i].sell_in < 6) {
            if (this.items[i].quality < 50) {
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
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1
        }
      }
    }
  }
}
