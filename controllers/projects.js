var Project = require('../models/project');
var User = require('../models/user');
module.exports = {
    index,
    create,
    show,
    addSwatch,
    delete: destroy
};

function index(req, res, next) {
    var user = req.user._id;
    Project.find({user: req.user._id})
    .then(projects => res.json({projects: projects}));
}

function create(req, res, next) {
    var project = new Project(req.body);
    project.user = req.user._id;
    project.save().then(() => {
        res.json({project: project});
    });
}

function show(req, res, next) {
    var params = req.params;
    Project.findById(params.id, (err, project) => {
        if(err) return next(err);
        res.json({project: project});
    });
}

function addSwatch(req, res, next) {
    Project.findById(req.params.projectId, (err, project) => {
        if(err) return next(err);
        project.swatches.push(req.params.swatchId);
        project.save((err, project) => {
            res.json({project: project});
        });
    });
}

function destroy(req, res, next) {

}

/*----- Helper Functions -----*/
