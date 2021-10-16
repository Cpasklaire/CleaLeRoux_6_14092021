const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

/*enregistrer les images*/
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images'); /*enregistrer les fichiers dans le dossier images*/
    },
    filename: (req, file, callback) => { 
        const extension = MIME_TYPES[file.mimetype];
        callback(null, Date.now() + '.' + extension);
    }
});

module.exports = multer({storage: storage}).single('image');