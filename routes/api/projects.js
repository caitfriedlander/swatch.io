var express = require('express');
var router = express.Router();
var projectsCtrl = require('../../controllers/projects');

/*---------- Protected Routes ----------*/
router.get('/', projectsCtrl.index);
router.post('/', projectsCtrl.create);
router.get('/:id', projectsCtrl.show);
router.put('/:projectId/swatches/:swatchId', projectsCtrl.addSwatch);
router.delete('/:id', projectsCtrl.delete);

module.exports = router;