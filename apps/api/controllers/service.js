const si = require('systeminformation');
const cache = require('../services/cache');
const systemctl = require('../services/systemctl');

const HASH_SERVICE_FAV = "service:fav"

exports.add = async function (req, res, next) {
   const service = req.body.service;
   const priority = req.body.priority;
   let obj = {};
   obj[service] = JSON.stringify({
      service,
      priority
   });

   let { err, result } = await cache.hmset(HASH_SERVICE_FAV, obj);
   if (err) {
      return res.status(500).json({ message: err.message });
   }

   return res.status(200).json(result);
};

exports.remove = async function (req, res, next) {
   const service = req.params.service;
   let { err, result } = await cache.hdel(HASH_SERVICE_FAV, service);
   if (err) {
      return res.status(500).json({ message: err.message });
   }

   return res.status(200).json(result);
};

exports.list = async function (req, res, next) {
   try {
      let { err, result } = await cache.hgetall(HASH_SERVICE_FAV);
      if (err) {
         return res.status(500).json({ message: err.message });
      }

      if (!result || Object.keys(result) == 0) {
         return res.status(200).json([]);
      }

      const services = await si.services((Object.keys(result) || []).join(", "));
      return res.status(200).json(services);
   } catch (ex) {
      return res.status(500).json({ message: ex.message });
   }
};