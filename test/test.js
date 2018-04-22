var assert = require('assert');

describe('Math', function() {
  describe('TestOne', function(){
      it('answer should be 9', function(){
          assert.equal(9, 3*3);
      });
  });
  describe('TestTwo', function(){
    it('answer should be -8', function(){
      assert.equal(-8, (3-4)*8);
  })
});
});