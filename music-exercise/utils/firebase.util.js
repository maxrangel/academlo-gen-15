const { initializeApp } = require('firebase/app');
const {
	getStorage,
	ref,
	uploadBytes,
	getDownloadURL,
} = require('firebase/storage');
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

const uploadPhoto = async (img, id, folderName) => {
	try {
		// name.jpg
		const [filename, extension] = img.originalname.split('.');

		const imgPath = `${
			process.env.NODE_ENV
		}/${folderName}/${id}/${filename}-${Date.now()}.${extension}`;

		// Create ref
		const imgRef = ref(storage, imgPath);

		// Upload img
		const result = await uploadBytes(imgRef, img.buffer);

		return result.metadata.fullPath;
	} catch (err) {
		console.log(err);
	}
};

const getArtistsPhotos = async artists => {
	const artistsPromises = artists.map(async artist => {
		// Get albums photos
		const albumsPromises = artist.albums.map(async album => {
			const albumRef = ref(storage, album.imgUrl);

			const albumUrl = await getDownloadURL(albumRef);

			album.imgUrl = albumUrl;

			return album;
		});

		const albumsWithImgs = await Promise.all(albumsPromises);

		const imgRef = ref(storage, artist.imgUrl);

		const imgUrl = await getDownloadURL(imgRef);

		artist.imgUrl = imgUrl;
		artist.albums = albumsWithImgs;

		return artist;
	});

	return await Promise.all(artistsPromises);
};

module.exports = { uploadPhoto, getArtistsPhotos };
