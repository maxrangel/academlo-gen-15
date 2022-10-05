const { initializeApp } = require('firebase/app');
const { getStorage, ref, uploadBytes } = require('firebase/storage');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	appId: process.env.FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);

const uploadArtistPhoto = async (img, artistId) => {
	try {
		// name.jpg
		const [filename, extension] = img.originalname.split('.');

		const artistImg = `${
			process.env.NODE_ENV
		}/artist/${artistId}/${filename}-${Date.now()}.${extension}`;

		// Create ref
		const imgRef = ref(storage, artistImg);

		// Upload img
		const result = await uploadBytes(imgRef, img.buffer);

		return result.metadata.fullPath;
	} catch (err) {
		console.log(err);
	}
};

module.exports = { uploadArtistPhoto };
