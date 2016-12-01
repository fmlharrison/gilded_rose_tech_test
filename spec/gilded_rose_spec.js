describe("Gilded Rose", function() {

  var item;
  var brie;

  beforeEach(function () {
    item = [ new Item("Mac'n'Cheese", 10, 20) ];
    brie = [ new Item("Aged Brie", 15, 10)];
  });

  it("should reduce the quality of a normal object", function() {
    update_quality(item);
    expect(item[0].quality).toEqual(19);
  });

  it("should reduce the sell in value of an object", function () {
    update_quality(item);
    expect(item[0].sell_in).toEqual(9);
  });

  it("should know that brie gets better with age", function () {
    update_quality(brie);
    expect(brie[0].quality).toEqual(11);
  });

});
