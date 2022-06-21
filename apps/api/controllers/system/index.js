exports.list = function (req, res, next) {
    let callback = function (err, data) {
       if (err) {
          console.log(err);
          return res.status(500).json({ message: err.message });
       }

       return res.status(200).json(data);
    };

    callback([{message : "not implemented"}])
 };