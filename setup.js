// Convert a string into a board setup
function setup(input) {
  var inputLines = input.split('\n');
  var rawCoords = inputLines[0].split(' ');
  var upperRightCoords = {
    x: rawCoords[0],
    y: rawCoords[1],
  };

  // Remove line about board coords and split into different robot strings
  var robotStrings = input.split('\n').slice(1).join('\n').split('\n\n');

  // Parse the robot information strings into data structures
  var robots = robotStrings
    .map(function(raw) {
      var array = raw.split('\n');
      var positionArray = array[0].split(' ');
      return {
        position: {
          x: Number(positionArray[0]),
          y: Number(positionArray[1]),
        },
        direction: positionArray[2],
        lost: false,
        instructions: array[1].split(''),
      }
    });

  var board = {
    maxPosition: upperRightCoords,
    scents: [],
    robots: robots,
  };

  return board;
}

module.exports = setup;
