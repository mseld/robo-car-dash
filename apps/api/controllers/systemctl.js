const cache = require('../services/cache');
const systemctl = require('../services/systemctl');

exports.list = async function (req, res, next) {
   let { err, result } = await systemctl.list();
   if (err) {
      return res.status(500).json({ message: err.message });
   }

   return res.status(200).json(result);
};

exports.status = async function (req, res, next) {
   const service = req.params.service;
   let { err, result } = await systemctl.status(service);
   if (err) {
      return res.status(500).json({ message: err.message });
   }

   return res.status(200).send(result);
};

exports.start = async function (req, res, next) {
   const service = req.params.service;
   let { err, result } = await systemctl.start(service);
   if (err) {
      return res.status(500).json({ message: err.message });
   }

   return res.status(200).send(result);
};

exports.stop = async function (req, res, next) {
   const service = req.params.service;
   let { err, result } = await systemctl.stop(service);
   if (err) {
      return res.status(500).json({ message: err.message });
   }

   return res.status(200).send(result);
};

exports.restart = async function (req, res, next) {
   const service = req.params.service;
   let { err, result } = await systemctl.restart(service);
   if (err) {
      return res.status(500).json({ message: err.message });
   }

   return res.status(200).send(result);
};

exports.enable = async function (req, res, next) {
   const service = req.params.service;
   let { err, result } = await systemctl.enable(service);
   if (err) {
      return res.status(500).json({ message: err.message });
   }

   return res.status(200).send(result);
};

exports.disable = async function (req, res, next) {
   const service = req.params.service;
   let { err, result } = await systemctl.disable(service);
   if (err) {
      return res.status(500).json({ message: err.message });
   }

   return res.status(200).send(result);
};
