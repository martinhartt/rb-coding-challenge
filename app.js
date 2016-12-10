var board = require('./board');
var setup = require('./setup');

module.exports = function(input) {
  var boardSetup = setup(input);

  var outcome = board.play(boardSetup);

  return formatBoard(outcome);
}

function formatBoard(board) {
  var outputs = board.robots.map(function(robot) {
    var x = robot.position.x;
    var y = robot.position.y;
    var direction = robot.direction;
    var lost = robot.lost ? ' LOST' : '';

    return x + ' ' + y + ' ' + direction + lost;
  });

  return outputs.join('\n');
}
