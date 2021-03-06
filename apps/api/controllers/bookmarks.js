const { json } = require('body-parser');
const cache = require('../services/cache');

// params
const HASH_BOOKMARK_LINK = "bookmark:link"

exports.list = async function (req, res, next) {
   let { err, result } = await cache.hgetall(HASH_BOOKMARK_LINK);
   if (err) {
      return res.status(500).json({ message: err.message });
   }

   let data = []
   for (const key in result) {
      if (Object.hasOwnProperty.call(result, key)) {
         const item = result[key];
         data.push(JSON.parse(item));
      }
   }

   return res.status(200).json(data);
};

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

   return res.status(200).send(result);
};

exports.remove = async function (req, res, next) {
   const key = req.params.key;
   let { err } = await cache.hdel(HASH_BOOKMARK_LINK, key);
   if (err) {
      return res.status(500).json({ message: err.message });
   }

   return res.status(200).send("OK");
};
