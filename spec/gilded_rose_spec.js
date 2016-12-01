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

  // describe("Special cases", function () {
  //
  //   it("should know that brie gets better with age", function () {
  //     update_quality(brie);
  //     expect(brie[0].quality).toEqual(11);
  //   });
  //
  //   describe("back stage passes", function () {
  //
  //     it("increases in quality by 2 when there are 10 days left till sell in deadline", function () {
  //       update_quality(backstage_pass);
  //       expect(backstage_pass[0].quality).toEqual(22);
  //     });
  //
  //     it("increases in quality by 3 when there are 5 days left till sell in deadline", function () {
  //       for (var i = 0; i < 5; i++) {
  //         update_quality(backstage_pass);
  //       }
  //       expect(backstage_pass[0].quality).toEqual(31);
  //     });
  //
  //     it("looses all it's value after the sell in value reaches 0", function () {
  //       for (var i = 0; i < 10; i++) {
  //         update_quality(backstage_pass);
  //       }
  //       expect(backstage_pass[0].quality).toEqual(0);
  //     });
  //
  //   });
  //
  //   describe("Sulfuras", function () {
  //
  //     it("doesn't decrease in value", function () {
  //       update_quality(sulfuras);
  //       expect(sulfuras[0].quality).toEqual(80);
  //     });
  //
  //     it("doesn't have to be sold, it's everlasting", function () {
  //       update_quality(sulfuras);
  //       expect(sulfuras[0].sell_in).toEqual(0);
  //     });
  //
  //   });
  //
  // });


});
