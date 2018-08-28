var Project = require('../models/project');
var User = require('../models/user');
module.exports = {
    index,
    create,
    show,
    update,
    delete: destroy
};

function index(req, res, next) {
    User.findById(req.user._id).populate('projects')
    .then(user => res.json({projects: user.projects}));
}

function show(req, res, next) {
    Project.findById(this.props.match.params.id, function (err, p) {
      if (err) return next(err);
      res.json(p);
    });
  }

function create(req, res, next) {
    var project = new Project(req.body);
    project.save().then(() => {
        User.findById(req.user._id)
        .then(user => {
            user.projects.push(project._id);
            user.save()
            .then(() => {
                res.json({project: project});
            });
        });
    });
}

function update(req, res, next) {

}

function destroy(req, res, next) {

}

/*----- Helper Functions -----*/
