# Config-manager

Simple module to have configs from a folder. This module manage `*.local.js` and `local.js` overrides to have an easy way to have dev configs ;).

# How to install

Simply do `npm i --save @fabien0102/config-manager`.

# Examples
## Simple configuration
configs/bdd.js
```
module.exports.bdd = {
  host: "production.mongo.com"
}
```

app.js
```
var config = require('@fabien0102/config-manager')('/configs');

console.log(config.bdd.host); // -> 'production.mongo.com'
```

## Local override with namespace
configs/bdd.js
```
module.exports.bdd = {
  host: "production.mongo.com"
}
```

configs/bdd.local.js
```
module.exports.bdd = {
  host: "localhost"
}
```

app.js
```
var config = require('@fabien0102/config-manager')('/configs');

console.log(config.bdd.host); // -> 'localhost'
```

## Local override without namespace
configs/global.js
```
module.exports = {
  bdd: {
    host: "production.mongo.com"
  }
}
```

configs/local.js
```
module.exports = {
  bdd: {
    host: "localhost"
  }
}
```

app.js
```
var config = require('@fabien0102/config-manager')('/configs');

console.log(config.bdd.host); // -> 'localhost'
```
