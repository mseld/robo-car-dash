// const systemctl = require('../services/systemctl');
const cache = require('../services/cache');

// params
const HASH_SERVICE_FAV = "service:fav"

exports.add = async function (req, res, next) {
   const key = req.body.key;
   const priority = req.body.priority;
   let obj = {};
   obj[key] = { priority };

   let { err, result } = await cache.hset(HASH_SERVICE_FAV, obj, callback);
   if (err) {
      return res.status(500).json({ message: err.message });
   }

   return res.status(200).json(result);
};

exports.remove = function (req, res, next) {
   const key = req.body.service;
   let { err, result } = await cache.hdel(HASH_SERVICE_FAV, service, callback);
   if (err) {
      return res.status(500).json({ message: err.message });
   }

   return res.status(200).json(result);
};

exports.list = function (req, res, next) {
   let { err, result } = await cache.hgetall(HASH_SERVICE_FAV);
   if (err) {
      return res.status(500).json({ message: err.message });
   }

   // systemctl.list()
   return res.status(200).json(result);
};