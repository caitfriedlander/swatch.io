var Swatch = require('../models/swatch');
var User = require('../models/user');

module.exports = {
    index,
    create,
    show,
    edit,
    update,
    delete: destroy
};

function index(req, res, next) {
    User.findById(req.user._id).populate('swatches')
    .then(user => res.json({swatches: user.swatches}));
}

function create(req, res, next) {
    var swatch = new Swatch(req.body);
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

function edit(req, res, next) {

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
