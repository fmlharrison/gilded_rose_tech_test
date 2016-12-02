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
    backstage_pass = new Item('Backstage passes to a TAFKAL80ETC concert', 12, 20);
    sulfuras = new Item('Sulfuras, Hand of Ragnaros', 0, 80);
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

  describe("#isSulfuras", function () {

    it("Know is an item is a sulfuras", function () {
      expect(gildedRose.isSulfuras(sulfuras)).toBeTruthy();
    });

  });

  describe("#isNormalItem", function () {

    it("know if item is a not a brie, pass or sulfuras", function () {
      expect(gildedRose.isNormalItem(item)).toBeTruthy();
    });

  });

  describe("quality checking", function () {

    it("know the quality of the item", function () {
      expect(gildedRose._itemQuality(item)).toEqual(20);
    });

    it("knows if the item has a quality value of under 50", function () {
      expect(gildedRose.isNotMaxQuality(item)).toBeTruthy();
    });

    it("knows if the item is still good", function () {
      expect(gildedRose.isItemStillOk(item)).toBeTruthy();
    });

  });

  describe("the conditions", function () {

    beforeEach(function () {
      gildedRose.addItem(item);
      gildedRose.addItem(old_item);
      gildedRose.addItem(brie);
      gildedRose.addItem(brie_deluxe);
      gildedRose.addItem(backstage_pass);
    });

    it("knows to reduce the sell_in and quality by 1 for normal(still good) item", function () {
      gildedRose.newQuality();
      expect(gildedRose.items[0].quality).toEqual(19);
      expect(gildedRose.items[0].sell_in).toEqual(4);
    });

    it ("knows to reduce the quality by 2 when sell in value is 0 or less", function () {
      for (var i = 1; i < 7; i++) {
        gildedRose.newQuality();
      }
      expect(item.quality).toEqual(13);
    });

    it ("know quality can never be a negative", function () {
      gildedRose.newQuality();
      expect(old_item.quality).toEqual(0);
    });

    it("should know that brie gets better with age", function () {
      gildedRose.newQuality();
      expect(brie.quality).toEqual(11);
    });

    it("quality can't go higher than 50", function () {
      gildedRose.newQuality();
      expect(brie_deluxe.quality).toEqual(50);
    });

    it("increases in quality by 1 when there are 10 or more left till sell in deadline", function () {
      gildedRose.newQuality();
      expect(backstage_pass.quality).toEqual(21);
    });

    it("increases in quality by 2 when there are 10 days left till sell in deadline", function () {
      for (var i = 0; i < 2; i++) {
        gildedRose.newQuality();
      }
      expect(backstage_pass.quality).toEqual(22);
    });

    it("increases in quality by 3 when there are 5 days left till sell in deadline", function () {
      for (var i = 0; i < 7; i++) {
        gildedRose.newQuality();
      }
      expect(backstage_pass.quality).toEqual(32);
    });

    it("looses all it's value after the sell in value reaches 0", function () {
      for (var i = 0; i < 13; i++) {
        gildedRose.newQuality();
      }
      console.log(backstage_pass);
      expect(backstage_pass.quality).toEqual(0);
    });
  });


});
