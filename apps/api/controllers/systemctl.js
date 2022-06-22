const cache = require('../services/cache');
const systemctl = require('../services/systemctl');

exports.list = function (req, res, next) {
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
   systemctl.status(service, callback);
};

exports.start = function (req, res, next) {
   const service = req.params.service;
   systemctl.start(service, callback);
};

exports.stop = function (req, res, next) {
   const service = req.params.service;
   systemctl.stop(service, callback);
};

exports.restart = function (req, res, next) {
   const service = req.params.service;
   systemctl.restart(service, callback);
};

exports.enable = function (req, res, next) {
   const service = req.params.service;
   systemctl.enable(service, callback);
};

exports.disable = function (req, res, next) {
   const service = req.params.service;
   systemctl.disable(service, callback);
};

function callback(err, data) {
   if (err) {
      return res.status(500).json({ message: err.message });
   }

   return res.status(200).json(data);
};