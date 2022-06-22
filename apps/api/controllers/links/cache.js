const Redis = require("ioredis");
const config = require('../../config');

const HASH_SERVICE_FAV = "services:fav"
const redis = new Redis(config.cache);

redis.on('ready', function () {
    console.log("[REDIS] READY");
});

redis.on("error", function (err) {
    console.log(`[REDIS] ERROR : ${err.message}`);
});

exports.add = async function add(service, priority, callback) {
    try {
        let obj = {}
        obj[service] = priority
        const result = await redis.hmset(HASH_SERVICE_FAV, obj);
        return callback(null, result)
    } catch (ex) {
        return callback(ex)
    }
}

exports.remove = function remove(service, callback) {
    try {
        let obj = {}
        obj[service] = priority
        const result = await redis.hdel(HASH_SERVICE_FAV, service);
        return callback(null, result)
    } catch (ex) {
        return callback(ex)
    }
}