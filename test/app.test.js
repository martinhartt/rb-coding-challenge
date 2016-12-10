var expect = require('chai').expect;
var app = require('../app.js');

describe('app.js', function() {
  it('should return the expected output for the input', function() {
    var input = '5 3\n1 1 E\nRFRFRFRF\n\n3 2 N\nFRRFLLFFRRFLL\n\n0 3 W\nLLFFFLFLFL';

    var output = app(input);
    expect(output).to.equal('1 1 E\n3 3 N LOST\n2 3 S');
  })
});
