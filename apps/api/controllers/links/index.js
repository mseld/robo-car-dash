const cache = require('./cache');

exports.add = function (req, res, next) {
   const service = req.body.service;
   const priority = req.body.priority;
   let callback = function (err, data) {
      if (err) {
         console.log(err);
         return res.status(500).json({ message: err.message });
      }

      return res.status(200).json(data);
   };

   cache.add(service, priority, callback);
};

exports.remove = function (req, res, next) {
   const service = req.params.service;
   let callback = function (err, data) {
      if (err) {
         console.log(err);
         return res.status(500).json({ message: err.message });
      }

      return res.status(200).json(data);
   };

   cache.remove(service, callback);
};