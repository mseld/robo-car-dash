const Redis = require("ioredis");
const config = require('../../config');

const redis = new Redis(config.cache);

redis.on('ready', function () {
    console.log("[REDIS] READY");
});

redis.on("error", function (err) {
    console.log(`[REDIS] ERROR : ${err.message}`);
});

exports.hgetall = async function (hash) {
    let result = null;
    let err = null;
    try {
        result = await redis.hgetall(hash);
    } catch (ex) {
        err = ex;
    }
    return { error: err, result: result };
}

exports.hget = async function (hash, key) {
    let result = null;
    let err = null;
    try {
        result = await redis.hget(hash, key);
    } catch (ex) {
        err = ex;
    }
    return { error: err, result: result };
}

exports.hset = async function (hash, key, val) {
    let result = null;
    let err = null;
    try {
        result = await redis.hset(hash, key, val);
    } catch (ex) {
        err = ex;
    }
    return { error: err, result: result };
}

exports.hmset = async function (hash, obj) {
    let result = null;
    let err = null;
    try {
        result = await redis.hmset(hash, obj);
    } catch (ex) {
        err = ex;
    }
    return { error: err, result: result };
}

exports.hdel = async function (hash, keys) {
    let result = null;
    let err = null;
    try {
        result = await redis.hdel(hash, keys);
    } catch (ex) {
        err = ex;
    }
    return { error: err, result: result };
}
