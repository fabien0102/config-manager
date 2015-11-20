var should = require("should");

describe("config.js", function (){
  beforeEach(function(){
    this.configs = require("../lib/config")("test/fixtures");
  });

  context("global configurations", function (){
    it("should return correct value from global.js", function(){
      (this.configs.a).should.equal("global.js");
    });

    it("should return correct value from foo.js", function(){
      (this.configs.foo.d).should.equal("foo.js");
    });
  });

  context("local configurations", function (){
    it("should return overrided value from global.local.js", function (){
      (this.configs.b).should.equal("global.local.js");
    });

    it("should return overrided value from local.js", function (){
      (this.configs.c).should.equal("local.js");
    });
  });

});
