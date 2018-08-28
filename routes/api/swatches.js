var express = require('express');
var router = express.Router();
var swatchesCtrl = require('../../controllers/swatches');

/*---------- Protected Routes ----------*/
router.get('/', swatchesCtrl.index);
router.post('/', swatchesCtrl.create);
router.get('/:id', swatchesCtrl.show);
router.get('/:id', swatchesCtrl.edit);
router.put('/', swatchesCtrl.update);
router.delete('/:id', swatchesCtrl.delete);


module.exports = router;