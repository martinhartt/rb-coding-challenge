// Applies the instructions on the robots with the initial board state
function play(board) {
  var robots = board.robots;
  var scents = board.scents;
  var maxPosition = board.maxPosition;

  robots.forEach(function(robot) {
    while (robot.instructions.length) {
      var instruction = robot.instructions.shift();

      if (instruction === 'L' || instruction === 'R') {
        robot.direction = newDirection(robot.direction, instruction);
      } else {
        // forward
        var proposedCoord = forwardCoordinate(robot.position, robot.direction);
        // is out of bounds and has current not got scent?
        if (isPositionOutOfBounds(proposedCoord, maxPosition)) {
          if (doesPositionHaveScent(robot.position, scents)) {
            continue;
          } else {
            scents.push(robot.position);
            robot.lost = true;
            break;
          }
        }

        robot.position = proposedCoord;
      }
    }
  });

  return board;
}

// Returns true if position has a scent on it
function doesPositionHaveScent(position, scents) {
  for (var i = 0; i < scents.length; i++) {
    var scent = scents[i];

    if ((position.x == scent.x) && (position.y == scent.y)) {
      return true;
    }
  }
  return false;
}

// Finds if the proposed coordinate is outside the board
function isPositionOutOfBounds(position, maxPosition) {
  if (position.x < 0 || position.x > maxPosition.x || position.y < 0 || position.y > maxPosition.y) {
    return true;
  }
  return false;
}

// Calculates a new coordinate if the robot goes forward in a direction
function forwardCoordinate(oldCoord, direction) {
  switch (direction) {
    case 'N':
      return {
        x: oldCoord.x,
        y: oldCoord.y + 1,
      };
    case 'E':
      return {
        x: oldCoord.x + 1,
        y: oldCoord.y,
      };
    case 'S':
      return {
        x: oldCoord.x,
        y: oldCoord.y - 1,
      };
    case 'W':
      return {
        x: oldCoord.x - 1,
        y: oldCoord.y,
      };
  }
}

// Function that finds the new direction of the robot
function newDirection(old, instruction) {
  if (instruction !== 'R' && instruction !== 'L') return old;

  var directions = ['N','E','S','W'];
  var move = (instruction === 'R') ? 1 : -1;
  // Add 4 to avoid negative index
  var index = ((directions.indexOf(old) + move) + 4) % 4;
  return directions[index];
}

module.exports = {
  play,
  doesPositionHaveScent,
  isPositionOutOfBounds,
  forwardCoordinate,
  newDirection,
}
