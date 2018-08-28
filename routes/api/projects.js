var express = require('express');
var router = express.Router();
var projectsCtrl = require('../../controllers/projects');

/*---------- Protected Routes ----------*/
router.get('/', projectsCtrl.index);
router.post('/', projectsCtrl.create);
router.get('/:id', projectsCtrl.show);
router.put('/', projectsCtrl.update);
router.delete('/:id', projectsCtrl.delete);

module.exports = router;