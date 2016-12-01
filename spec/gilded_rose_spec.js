describe("Gilded Rose", function() {

  var gildedRose;
  var item;
  var brie;
  var backstage_pass;
  var sulfuras;
  var brie_deluxe;
  var old_item;

  beforeEach(function () {
    gildedRose = new GildedRose();
    item = new Item("Mac'n'Cheese", 5, 20);
    old_item = new Item("Rottern Cabbage", -5, 0);
    brie_deluxe = new Item("Aged Brie", 10, 50);
    brie = new Item("Aged Brie", 15, 10);
    backstage_pass = new Item('Backstage passes to a TAFKAL80ETC concert', 9, 20);
    sulfuras = new Item('Sulfuras, Hand of Ragnaros', 0, 80);
  });

  describe("updating normal food quality", function () {

    beforeEach(function () {
      gildedRose.addItem(item);
    });

    it("should reduce the quality of a normal object", function() {
      gildedRose.update_quality();
      expect(gildedRose.items[0].quality).toEqual(19);
    });

    it("should reduce the sell in value of an object", function () {
      gildedRose.update_quality();
      expect(gildedRose.items[0].sell_in).toEqual(4);
    });

    it("quality reduces twice as fast after the sell_in date reaches 0", function () {
      for (var i = 0; i < 7; i++) {
        gildedRose.update_quality();
      }
      expect(gildedRose.items[0].quality).toEqual(11);
    });

  });

  describe("edge cases", function () {

    beforeEach(function () {
      gildedRose.addItem(brie_deluxe);
      gildedRose.addItem(old_item);
    });

    it("quality can't go higher than 50", function () {
      gildedRose.update_quality();
      expect(gildedRose.items[0].quality).toEqual(50);
    });

    it("quality can't go lower than 0", function () {
      gildedRose.update_quality();
      expect(gildedRose.items[1].quality).toEqual(0);
    });

  });

  describe("Special cases", function () {

    it("should know that brie gets better with age", function () {
      gildedRose.addItem(brie);
      gildedRose.update_quality();
      expect(gildedRose.items[0].quality).toEqual(11);
    });

    describe("back stage passes", function () {

      beforeEach(function () {
        gildedRose.addItem(backstage_pass);
      });

      it("increases in quality by 2 when there are 10 days left till sell in deadline", function () {
        gildedRose.update_quality();
        expect(gildedRose.items[0].quality).toEqual(22);
      });

      it("increases in quality by 3 when there are 5 days left till sell in deadline", function () {
        for (var i = 0; i < 5; i++) {
          gildedRose.update_quality();
        }
        expect(gildedRose.items[0].quality).toEqual(31);
      });

      it("looses all it's value after the sell in value reaches 0", function () {
        for (var i = 0; i < 10; i++) {
          gildedRose.update_quality();
        }
        expect(gildedRose.items[0].quality).toEqual(0);
      });

    });

    describe("Sulfuras", function () {

      beforeEach(function () {
        gildedRose.addItem(sulfuras);
      });

      it("doesn't decrease in value", function () {
        gildedRose.update_quality();
        expect(gildedRose.items[0].quality).toEqual(80);
      });

      it("doesn't have to be sold, it's everlasting", function () {
        gildedRose.update_quality();
        expect(gildedRose.items[0].sell_in).toEqual(0);
      });

    });

  });

  describe("#isBrie", function () {

    it("knows if the item is Aged Brie", function () {
      expect(gildedRose.isBrie(brie)).toBeTruthy();
    });

    it("knows if the item is not Aged Brie", function () {
      expect(gildedRose.isBrie(item)).toBeFalsy();
    });
  });

  describe("#isBackstagePass", function () {

    it("know if the item is a backstage pass", function () {
      expect(gildedRose.isBackstagePass(backstage_pass)).toBeTruthy();
    });

    it("know if the item is not a backstage pass", function () {
      expect(gildedRose.isBackstagePass(item)).toBeFalsy();
    });
  });


});
