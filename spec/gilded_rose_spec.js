describe("Gilded Rose", function() {

  var item;
  var brie;
  var backstage_pass;

  beforeEach(function () {
    item = [ new Item("Mac'n'Cheese", 10, 20) ];
    brie = [ new Item("Aged Brie", 15, 10)];
    backstage_pass = [ new Item('Backstage passes to a TAFKAL80ETC concert', 9, 20)];
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

  });


});
