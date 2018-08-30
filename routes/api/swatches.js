var express = require('express');
var router = express.Router();
var swatchesCtrl = require('../../controllers/swatches');

/*---------- Protected Routes ----------*/
router.get('/', swatchesCtrl.index);
router.post('/', swatchesCtrl.create);
router.get('/get', swatchesCtrl.swatch);
router.get('/info', swatchesCtrl.info);
router.get('/:id', swatchesCtrl.show);
router.put('/', swatchesCtrl.update);
router.delete('/:id', swatchesCtrl.delete);


module.exports = router;