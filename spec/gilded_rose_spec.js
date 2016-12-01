describe("Gilded Rose", function() {

  var item;
  var brie;
  var backstage_pass;
  var sulfuras;
  var brie_deluxe;
  var old_item;

  beforeEach(function () {
    item = [ new Item("Mac'n'Cheese", 10, 20) ];
    old_item = [new Item("Rottern Cabbage", -5, 0)]
    brie_deluxe = [ new Item("Aged Brie", 10, 50)];
    brie = [ new Item("Aged Brie", 15, 10)];
    backstage_pass = [ new Item('Backstage passes to a TAFKAL80ETC concert', 9, 20)];
    sulfuras = [ new Item('Sulfuras, Hand of Ragnaros', 0, 80)];
  });

  describe("updating normal food quality", function () {

    it("should reduce the quality of a normal object", function() {
      update_quality(item);
      expect(item[0].quality).toEqual(19);
    });

    it("should reduce the sell in value of an object", function () {
      update_quality(item);
      expect(item[0].sell_in).toEqual(9);
    });

    it("quality can't go higher than 50", function () {
      update_quality(brie_deluxe);
      expect(brie_deluxe[0].quality).toEqual(50);
    });

    it("quality can't go lower than 0", function () {
      update_quality(old_item);
      expect(old_item[0].quality).toEqual(0);
    });

  });

  describe("Special cases", function () {

    it("should know that brie gets better with age", function () {
      update_quality(brie);
      expect(brie[0].quality).toEqual(11);
    });

    describe("back stage passes", function () {

      it("increases in quality by 2 when there are 10 days left till sell in deadline", function () {
        update_quality(backstage_pass);
        expect(backstage_pass[0].quality).toEqual(22);
      });

      it("increases in quality by 3 when there are 5 days left till sell in deadline", function () {
        for (var i = 0; i < 5; i++) {
          update_quality(backstage_pass);
        }
        expect(backstage_pass[0].quality).toEqual(31);
      });

      it("looses all it's value after the sell in value reaches 0", function () {
        for (var i = 0; i < 10; i++) {
          update_quality(backstage_pass);
        }
        expect(backstage_pass[0].quality).toEqual(0);
      });

    });

    describe("Sulfuras", function () {

      it("doesn't decrease in value", function () {
        update_quality(sulfuras);
        expect(sulfuras[0].quality).toEqual(80);
      });

      it("doesn't have to be sold, it's everlasting", function () {
        update_quality(sulfuras);
        expect(sulfuras[0].sell_in).toEqual(0);
      });

    });

  });


});
