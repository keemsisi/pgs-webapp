
// declare the require function
declare function require(name: string);

const Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Grid = require('mongodb').Grid,
    Code = require('mongodb').Code,
    BSON = require('mongodb').pure().BSON,
    assert = require('assert');

MongoClient.connect('mongodb://localhost:30000,localhost:30001,localhost:30002/integration_test_?w=1', function(err, db) {
  assert.equal(null, err);
  assert.ok(db != null);

  db.collection('submitted-cv').update({a:1}, {b:1}, {upsert: true}, function(err, result) {
    assert.equal(null, err);
    assert.equal(1, result);

    db.close();
  });
});

