var assert = chai.assert;
var expect = chai.expect;

function createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild;
}
describe("leftClick", function(){
  beforeEach(async () => {
    //Arrange: Given I have a fresh board
    await load_puzzle('easy_5x5');

  });
  it("should change the state of the line from 0 to 1", function(){
    //Act: When I click on the top left line
    leftClick(document.getElementById("0,0,horizontal"));
    //Assert: Then line state has changed
    assert.equal(horizontalLines[0][0].state, 1);
  });
  it("should change the state of the line from 1 to 0", function(){
    let line = document.getElementById("0,0,horizontal");
    leftClick(line);
    leftClick(line);
    assert.equal(horizontalLines[1][1].state, 0);
  });
});

describe("AI", () => {
  beforeEach(async () => {
    //Arrange: Given I have a fresh board
    await load_puzzle('hard_5x5');

  });
  it("should complete the game", function(){
    complete();
    complete_horizontalLines = [
      [
        {
          "i": 0,
          "j": 0,
          "orientation": "horizontal",
          "state": 2,
          "end_point": false,
          "depth": 1
        },
        {
          "i": 0,
          "j": 1,
          "orientation": "horizontal",
          "state": 1,
          "end_point": false,
          "depth": 1
        },
        {
          "i": 0,
          "j": 2,
          "orientation": "horizontal",
          "state": 2,
          "end_point": false,
          "depth": 1
        },
        {
          "i": 0,
          "j": 3,
          "orientation": "horizontal",
          "state": 2,
          "end_point": false,
          "depth": 1
        },
        {
          "i": 0,
          "j": 4,
          "orientation": "horizontal",
          "state": 1,
          "end_point": false,
          "depth": 1
        }
      ],
      [
        {
          "i": 1,
          "j": 0,
          "orientation": "horizontal",
          "state": 1,
          "end_point": false,
          "depth": 1
        },
        {
          "i": 1,
          "j": 1,
          "orientation": "horizontal",
          "state": 2,
          "end_point": false,
          "depth": 1
        },
        {
          "i": 1,
          "j": 2,
          "orientation": "horizontal",
          "state": 1,
          "end_point": false,
          "depth": 1
        },
        {
          "i": 1,
          "j": 3,
          "orientation": "horizontal",
          "state": 2,
          "end_point": false,
          "depth": 1
        },
        {
          "i": 1,
          "j": 4,
          "orientation": "horizontal",
          "state": 2,
          "end_point": false,
          "depth": 1
        }
      ],
      [
        {
          "i": 2,
          "j": 0,
          "orientation": "horizontal",
          "state": 1,
          "end_point": false,
          "depth": 1
        },
        {
          "i": 2,
          "j": 1,
          "orientation": "horizontal",
          "state": 2,
          "end_point": false,
          "depth": 1
        },
        {
          "i": 2,
          "j": 2,
          "orientation": "horizontal",
          "state": 1,
          "end_point": false,
          "depth": 1
        },
        {
          "i": 2,
          "j": 3,
          "orientation": "horizontal",
          "state": 2,
          "end_point": false,
          "depth": 1
        },
        {
          "i": 2,
          "j": 4,
          "orientation": "horizontal",
          "state": 2,
          "end_point": false,
          "depth": 1
        }
      ],
      [
        {
          "i": 3,
          "j": 0,
          "orientation": "horizontal",
          "state": 1,
          "end_point": false,
          "depth": 1
        },
        {
          "i": 3,
          "j": 1,
          "orientation": "horizontal",
          "state": 2,
          "end_point": false,
          "depth": 1
        },
        {
          "i": 3,
          "j": 2,
          "orientation": "horizontal",
          "state": 1,
          "end_point": false,
          "depth": 1
        },
        {
          "i": 3,
          "j": 3,
          "orientation": "horizontal",
          "state": 1,
          "end_point": false,
          "depth": 1
        },
        {
          "i": 3,
          "j": 4,
          "orientation": "horizontal",
          "state": 2,
          "end_point": false,
          "depth": 1
        }
      ],
      [
        {
          "i": 4,
          "j": 0,
          "orientation": "horizontal",
          "state": 2,
          "end_point": false,
          "depth": 1
        },
        {
          "i": 4,
          "j": 1,
          "orientation": "horizontal",
          "state": 2,
          "end_point": false,
          "depth": 1
        },
        {
          "i": 4,
          "j": 2,
          "orientation": "horizontal",
          "state": 1,
          "end_point": false,
          "depth": 1
        },
        {
          "i": 4,
          "j": 3,
          "orientation": "horizontal",
          "state": 1,
          "end_point": false,
          "depth": 1
        },
        {
          "i": 4,
          "j": 4,
          "orientation": "horizontal",
          "state": 2,
          "end_point": false,
          "depth": 1
        }
      ],
      [
        {
          "i": 5,
          "j": 0,
          "orientation": "horizontal",
          "state": 1,
          "end_point": false,
          "depth": 1
        },
        {
          "i": 5,
          "j": 1,
          "orientation": "horizontal",
          "state": 1,
          "end_point": false,
          "depth": 1
        },
        {
          "i": 5,
          "j": 2,
          "orientation": "horizontal",
          "state": 2,
          "end_point": false,
          "depth": 1
        },
        {
          "i": 5,
          "j": 3,
          "orientation": "horizontal",
          "state": 2,
          "end_point": false,
          "depth": 1
        },
        {
          "i": 5,
          "j": 4,
          "orientation": "horizontal",
          "state": 1,
          "end_point": false,
          "depth": 1
        }
      ]
    ];
    complete_verticalLines = [
      [
        {
          "i": 0,
          "j": 0,
          "orientation": "vertical",
          "state": 2,
          "end_point": false,
          "depth": 1
        },
        {
          "i": 0,
          "j": 1,
          "orientation": "vertical",
          "state": 1,
          "end_point": false,
          "depth": 1
        },
        {
          "i": 0,
          "j": 2,
          "orientation": "vertical",
          "state": 1,
          "end_point": false,
          "depth": 1
        },
        {
          "i": 0,
          "j": 3,
          "orientation": "vertical",
          "state": 2,
          "end_point": false,
          "depth": 1
        },
        {
          "i": 0,
          "j": 4,
          "orientation": "vertical",
          "state": 1,
          "end_point": false,
          "depth": 1
        },
        {
          "i": 0,
          "j": 5,
          "orientation": "vertical",
          "state": 1,
          "end_point": false,
          "depth": 1
        }
      ],
      [
        {
          "i": 1,
          "j": 0,
          "orientation": "vertical",
          "state": 1,
          "end_point": false,
          "depth": 1
        },
        {
          "i": 1,
          "j": 1,
          "orientation": "vertical",
          "state": 2,
          "end_point": false,
          "depth": 1
        },
        {
          "i": 1,
          "j": 2,
          "orientation": "vertical",
          "state": 2,
          "end_point": false,
          "depth": 1
        },
        {
          "i": 1,
          "j": 3,
          "orientation": "vertical",
          "state": 1,
          "end_point": false,
          "depth": 1
        },
        {
          "i": 1,
          "j": 4,
          "orientation": "vertical",
          "state": 1,
          "end_point": false,
          "depth": 1
        },
        {
          "i": 1,
          "j": 5,
          "orientation": "vertical",
          "state": 1,
          "end_point": false,
          "depth": 1
        }
      ],
      [
        {
          "i": 2,
          "j": 0,
          "orientation": "vertical",
          "state": 2,
          "end_point": false,
          "depth": 1
        },
        {
          "i": 2,
          "j": 1,
          "orientation": "vertical",
          "state": 1,
          "end_point": false,
          "depth": 1
        },
        {
          "i": 2,
          "j": 2,
          "orientation": "vertical",
          "state": 1,
          "end_point": false,
          "depth": 1
        },
        {
          "i": 2,
          "j": 3,
          "orientation": "vertical",
          "state": 2,
          "end_point": false,
          "depth": 1
        },
        {
          "i": 2,
          "j": 4,
          "orientation": "vertical",
          "state": 1,
          "end_point": false,
          "depth": 1
        },
        {
          "i": 2,
          "j": 5,
          "orientation": "vertical",
          "state": 1,
          "end_point": false,
          "depth": 1
        }
      ],
      [
        {
          "i": 3,
          "j": 0,
          "orientation": "vertical",
          "state": 1,
          "end_point": false,
          "depth": 1
        },
        {
          "i": 3,
          "j": 1,
          "orientation": "vertical",
          "state": 2,
          "end_point": false,
          "depth": 1
        },
        {
          "i": 3,
          "j": 2,
          "orientation": "vertical",
          "state": 2,
          "end_point": false,
          "depth": 1
        },
        {
          "i": 3,
          "j": 3,
          "orientation": "vertical",
          "state": 2,
          "end_point": false,
          "depth": 1
        },
        {
          "i": 3,
          "j": 4,
          "orientation": "vertical",
          "state": 2,
          "end_point": false,
          "depth": 1
        },
        {
          "i": 3,
          "j": 5,
          "orientation": "vertical",
          "state": 1,
          "end_point": false,
          "depth": 1
        }
      ],
      [
        {
          "i": 4,
          "j": 0,
          "orientation": "vertical",
          "state": 1,
          "end_point": false,
          "depth": 1
        },
        {
          "i": 4,
          "j": 1,
          "orientation": "vertical",
          "state": 2,
          "end_point": false,
          "depth": 1
        },
        {
          "i": 4,
          "j": 2,
          "orientation": "vertical",
          "state": 1,
          "end_point": false,
          "depth": 1
        },
        {
          "i": 4,
          "j": 3,
          "orientation": "vertical",
          "state": 2,
          "end_point": false,
          "depth": 1
        },
        {
          "i": 4,
          "j": 4,
          "orientation": "vertical",
          "state": 1,
          "end_point": false,
          "depth": 1
        },
        {
          "i": 4,
          "j": 5,
          "orientation": "vertical",
          "state": 1,
          "end_point": false,
          "depth": 1
        }
      ]
    ];
    expect(horizontalLines).to.deep.equal(complete_horizontalLines);
    expect(verticalLines).to.deep.equal(complete_verticalLines);
    expect(hintUsed).to.be.true;
  });

})
