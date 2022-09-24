// const path = require('path');
const multer = require('multer');

// const storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		// D:\Development\academlo\gen-15\security\utils
// 		// D:\Development\academlo\gen-15\security\
// 		// D:\Development\academlo\gen-15\security\imgs
// 		const destPath = path.join(__dirname, '..', 'imgs');
// 		cb(null, destPath);
// 	},
// 	filename: (req, file, cb) => {
// 		// file -> {
// 		//   fieldname: 'postImg',
// 		//   originalname: 'pug.jpg',
// 		//   encoding: '7bit',
// 		//   mimetype: 'image/jpeg'
// 		// }

// 		const [originalName, ext] = file.originalname.split('.'); // -> [pug, jpg]

// 		// pug.jpg -> pug-12345.jpg
// 		const filename = `${originalName}-${Date.now()}.${ext}`;

// 		cb(null, filename);
// 	},
// });

const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = { upload };
