var assert = chai.assert;

function createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild;
}
describe("leftClick", function(){
  beforeEach(() => {
    //Arrange: Given I have a fresh board
    display_board();
    horizontalLines = initiate_horizontalLines();
    verticalLines = initiate_verticalLines();

  })
  it("should change the state of the line from 0 to 1", function(){
    //Act: When I click on the top left line
    leftClick(document.getElementById("0,0,horizontal"));
    //Assert: Then line state has changed
    assert.equal(horizontalLines[0][0].state, 1);
  });
  it("should change the state of the line from 1 to 0", function(){
      let line = slitherLink.getElementById("0,0,horizontal");
      console.log(line);
      leftClick(line);
      assert.equal(horizontalLines[1][1].state, 2);
  });
  it("should change the background color from white to black", function(){

  });
  it("should change the background color from black to white", function(){

  });
});
