var Swatch = require('../models/swatch');
var Project = require('../models/project');
var Enums = require('../src/utils/enums');

module.exports = {
    index,
    create,
    show,
    update,
    swatch,
    info,
    search,
    delete: destroy
};

function index(req, res, next) {
    var user = req.user._id;
    Swatch.find({user: req.user._id})
    .then(swatches => res.json({swatches: swatches}));
}

function create(req, res, next) {
    var swatch = new Swatch(req.body);
    swatch.user = req.user._id;
    swatch.save().then(() => {
        res.json(swatch);
    });
}

function show(req, res, next) {
    Swatch.findById(req.params.id, (err, swatch) => {
        if(err) return next(err);
        res.json({swatch: swatch})
    })
}

function update(req, res, next) {
    Swatch.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, swatch) => {
        if(err) return next(err);
        swatch.save((err, swatch) => {
            if(err) return next(err);
            res.json({swatch: swatch});
        });
    });
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

function search(req, res, next) {
    var color = req.color;
    var type = req.type;
    Swatch.find({color: color} || {type: type})
    .then(swatches => res.json({swatches: swatches}));
}

function destroy(req, res) {
    Swatch.findByIdAndRemove(req.params.id, (err, swatch) => {
        if (err) return next(err);
        if (req.body.projectId) {
            Project.findById(req.body.projectId, (err, project) => {
                if (err) return next(err);
                project.swatches.remove(req.params.id);
                console.log(req.params.id);
                res.json('Removed Swatch');
            });
        } else {
            res.json('Removed Swatch');
        }
    });
}

/*----- Helper Functions -----*/
