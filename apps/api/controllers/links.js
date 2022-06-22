const { json } = require('body-parser');
const cache = require('../services/cache');

// params
const HASH_BOOKMARK_LINK = "bookmark:link"

exports.add = async function (req, res, next) {
   const key = req.body.key;
   const url = req.body.url;
   const description = req.body.description;
   const priority = req.body.priority;
   let obj = {}
   obj[key] = JSON.stringify({
      key,
      url,
      priority,
      description
   })

   let { err, result } = await cache.hmset(HASH_BOOKMARK_LINK, obj);
   if (err) {
      return res.status(500).json({ message: err.message });
   }

   return res.status(200).json(result);
};

exports.remove = async function (req, res, next) {
   const key = req.params.key;
   let { err, result } = await cache.hdel(HASH_BOOKMARK_LINK, key);
   if (err) {
      return res.status(500).json({ message: err.message });
   }

   return res.status(200).json(result);
};

exports.list = async function (req, res, next) {
   let { err, result } = await cache.hgetall(HASH_BOOKMARK_LINK);
   if (err) {
      return res.status(500).json({ message: err.message });
   }

   return res.status(200).json(result);
};