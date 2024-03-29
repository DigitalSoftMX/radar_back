var https = require('http')
var Q = require('q')
var xml2js = require('xml2js')
var parser = new xml2js.Parser()

var httpGet = function (opts) {
  var deferred = Q.defer()
  https.get(opts, deferred.resolve)
  return deferred.promise;
}

var loadBody = function (res) {
  var deferred = Q.defer()
  var data = ""
  res.on("data", function (chunk) {
    data += chunk.toString()
  })
  res.on("end", function () {
    parser.parseString(data, function(err, result) {
    deferred.resolve(result)
  })
  })
  return deferred.promise
}
function xmlToJson(url) {
	var deferred = Q.defer()
	httpGet(url).then(loadBody).then(function (res) {
    deferred.resolve(res)
	});
	return deferred.promise
}
module.exports = {xmlToJson } 