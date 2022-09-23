const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const destPath = path.join(__dirname, '..', 'imgs');
		cb(null, destPath);
	},
	filename: (req, file, cb) => {
		// file -> {
		//   fieldname: 'postImg',
		//   originalname: 'pug.jpg',
		//   encoding: '7bit',
		//   mimetype: 'image/jpeg'
		// }

		// pug.jpg -> pug-12345.jpg
		const filename = 'img.png';

		cb(null, filename);
	},
});

const upload = multer({ storage });

module.exports = { upload };
