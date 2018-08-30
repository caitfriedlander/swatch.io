var Swatch = require('../models/swatch');
var User = require('../models/user');
var Enums = require('../src/utils/enums');

module.exports = {
    index,
    create,
    show,
    swatch,
    update,
    info,
    delete: destroy
};

function index(req, res, next) {
    User.findById(req.user._id).populate('swatches')
    .then(user => res.json({swatches: user.swatches}));
}

function create(req, res, next) {
    var swatch = new Swatch(req.body);
    swatch.user = req.user._id;
    swatch.save().then(() => {
        User.findById(req.user._id)
        .then(user => {
            user.swatches.push(swatch._id);
            user.save()
            .then(() => {
                res.json({swatch: swatch});
            });
        });
    });
}

function show(req, res, next) {
    Swatch.findById(req.params.id, (err, swatch) => {
        if(err) return next(err);
        res.json({swatch: swatch})
    })
}

function swatch(req, res, next) {
    res.json({
        bucketName: process.env.BUCKET_NAME,
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY
    });
}

function info(req, res, next) {
    res.json({
        types: Enums.types,
        colors: Enums.colors,
        quantities: Enums.quantities
    });
}

function update(req, res, next) {

}

function destroy(req, res) {
    Swatch.findById(req.params.id, (err, swatch) => {
      swatch.remove();
      res.json({});
    });
  }

/*----- Helper Functions -----*/
