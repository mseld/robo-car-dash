const cache = require('../services/cache');
const systemctl = require('../services/systemctl');

exports.list = function (req, res, next) {
   let callback = function (err, data) {
      if (err) {
         return res.status(500).json({ message: err.message });
      }

      return res.status(200).json(data);
   };

   let fn = (err, services) => {
      if (err) {
         return res.status(500).json({ message: err.message });
      }

      systemctl.list(services, callback);
   }

   systemctl.list_names(fn);
};

exports.status = function (req, res, next) {
   const service = req.params.service;
   let callback = function (err, data) {
      if (err) {
         return res.status(500).json({ message: err.message });
      }

      return res.status(200).json(data);
   };
   systemctl.status(service, callback);
};

exports.start = function (req, res, next) {
   const service = req.params.service;
   let callback = function (err, data) {
      if (err) {
         return res.status(500).json({ message: err.message });
      }

      return res.status(200).json(data);
   };
   systemctl.start(service, callback);
};

exports.stop = function (req, res, next) {
   const service = req.params.service;
   let callback = function (err, data) {
      if (err) {
         return res.status(500).json({ message: err.message });
      }

      return res.status(200).json(data);
   };
   systemctl.stop(service, callback);
};

exports.restart = function (req, res, next) {
   const service = req.params.service;
   let callback = function (err, data) {
      if (err) {
         return res.status(500).json({ message: err.message });
      }

      return res.status(200).json(data);
   };
   systemctl.restart(service, callback);
};

exports.enable = function (req, res, next) {
   const service = req.params.service;
   let callback = function (err, data) {
      if (err) {
         return res.status(500).json({ message: err.message });
      }

      return res.status(200).json(data);
   };
   systemctl.enable(service, callback);
};

exports.disable = function (req, res, next) {
   const service = req.params.service;
   let callback = function (err, data) {
      if (err) {
         return res.status(500).json({ message: err.message });
      }

      return res.status(200).json(data);
   };
   systemctl.disable(service, callback);
};
