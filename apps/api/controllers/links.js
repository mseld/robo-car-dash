const cache = require('../services/cache');

// params
const HASH_BOOKMARK_LINK = "bookmark:link"

exports.add = async function (req, res, next) {
   const key = req.body.key;
   const url = req.body.url;
   const priority = req.body.priority;
   let obj = {}
   obj[key] = {
      url,
      priority
   }

   let { err, result } = await cache.hset(HASH_BOOKMARK_LINK, obj, callback);
   if (err) {
      return res.status(500).json({ message: err.message });
   }

   return res.status(200).json(result);
};

exports.remove = function (req, res, next) {
   const key = req.body.service;
   let { err, result } = await cache.hdel(HASH_BOOKMARK_LINK, service, callback);
   if (err) {
      return res.status(500).json({ message: err.message });
   }

   return res.status(200).json(result);
};

exports.list = function (req, res, next) {
   let { err, result } = await cache.hgetall(HASH_BOOKMARK_LINK);
   if (err) {
      return res.status(500).json({ message: err.message });
   }

   return res.status(200).json(result);
};