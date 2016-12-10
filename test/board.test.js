var expect = require('chai').expect;
var board = require('../board.js');

describe('board.js', function() {
  describe('play', function() {it('should return the expected output for the input', function() {
    var result = board.play({
      maxPosition: {
        x: '5',
        y: '3',
      },
      scents: [],
      robots: [{
        position: {
          x: 1,
          y: 1,
        },
        direction: 'E',
        lost: false,
        instructions: ['R', 'F', 'R', 'F', 'R', 'F', 'R', 'F'],
      }, {
        position: {
          x: 3,
          y: 2,
        },
        direction: 'N',
        lost: false,
        instructions: ['F', 'R', 'R', 'F', 'L', 'L', 'F', 'F', 'R', 'R', 'F', 'L', 'L'],
      }, {
        position: {
          x: 0,
          y: 3,
        },
        direction: 'W',
        lost: false,
        instructions: ['L', 'L', 'F', 'F', 'F', 'L', 'F', 'L', 'F', 'L'],
      }]
    });

    expect(result).to.deep.equal({
      maxPosition: {
        x: '5',
        y: '3',
      },
      scents: [{
        x: 3,
        y: 3,
      }],
      robots: [{
        position: {
          x: 1,
          y: 1,
        },
        direction: 'E',
        lost: false,
        instructions: [],
      }, {
        position: {
          x: 3,
          y: 3,
        },
        direction: 'N',
        lost: true,
        instructions: ['R', 'R', 'F', 'L', 'L'],
      }, {
        position: {
          x: 2,
          y: 3,
        },
        direction: 'S',
        lost: false,
        instructions: [],
      }]
    });
  });
  });

  describe('isPositionOutOfBounds', function() {
    it('should detect if negative x is out of bounds', function() {
      var result = board.isPositionOutOfBounds({x: -1, y: 4}, {x: 10, y: 10})

      expect(result).to.equal(true);
    });

    it('should detect if negative x is out of bounds', function() {
      var result = board.isPositionOutOfBounds({x: 4, y: -4}, {x: 10, y: 10})

      expect(result).to.equal(true);
    });

    it('should return false if coord is within bounds', function() {
      var result = board.isPositionOutOfBounds({x: 4, y: 3}, {x: 10, y: 10})

      expect(result).to.equal(false);
    });

    it('should return true if coord is outside', function() {
      var result = board.isPositionOutOfBounds({x: 11, y: 45}, {x: 10, y: 10})

      expect(result).to.equal(true);
    });
  });

  describe('forwardCoordinate', function() {
    it('should go up if direction is north', function() {
      var newCoordinate = board.forwardCoordinate({x: 0, y: 0}, 'N');
      expect(newCoordinate).to.deep.equal({x: 0, y: 1})
    });

    it('should go right if direction is east', function() {
      var newCoordinate = board.forwardCoordinate({x: 0, y: 0}, 'E');
      expect(newCoordinate).to.deep.equal({x: 1, y: 0})
    });

    it('should go down if direction is south', function() {
      var newCoordinate = board.forwardCoordinate({x: 0, y: 0}, 'S');
      expect(newCoordinate).to.deep.equal({x: 0, y: -1})
    });

    it('should go left if direction is north', function() {
      var newCoordinate = board.forwardCoordinate({x: 0, y: 0}, 'W');
      expect(newCoordinate).to.deep.equal({x: -1, y: 0})
    });

  });

  describe('newDirection', function() {
    it('should find the correct new direction for north', function() {
      expect(board.newDirection('N', 'L')).to.equal('W');
      expect(board.newDirection('N', 'R')).to.equal('E');
    });

    it('should find the correct new direction for east', function() {
      expect(board.newDirection('E', 'L')).to.equal('N');
      expect(board.newDirection('E', 'R')).to.equal('S');
    });

    it('should find the correct new direction for south', function() {
      expect(board.newDirection('S', 'L')).to.equal('E');
      expect(board.newDirection('S', 'R')).to.equal('W');
    });

    it('should find the correct new direction for west', function() {
      expect(board.newDirection('W', 'L')).to.equal('S');
      expect(board.newDirection('W', 'R')).to.equal('N');
    });

  });

  describe('doesPositionHaveScent', function() {
    it('should return true if position does have scent', function() {
      var result = board.doesPositionHaveScent({x: 4, y: 3}, [{x: 4,y: 3}]);

      expect(result).to.equal(true);
    });

    it('should return false if position does not have scent', function() {
      var result = board.doesPositionHaveScent({x: 4, y: 3}, []);

      expect(result).to.equal(false);
    });
  });
});
