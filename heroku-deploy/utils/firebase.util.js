const { initializeApp } = require('firebase/app');
const {
	getStorage,
	ref,
	uploadBytes,
	getDownloadURL,
} = require('firebase/storage');

// Model
const { PostImg } = require('../models/postImg.model');

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	appId: process.env.FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

// Storage service
const storage = getStorage(firebaseApp);

const uploadPostImgs = async (imgs, postId) => {
	// Map async -> Async operations with arrays
	const imgsPromises = imgs.map(async img => {
		// Create firebase reference
		const [originalName, ext] = img.originalname.split('.'); // -> [pug, jpg]

		const filename = `posts/${postId}/${originalName}-${Date.now()}.${ext}`;
		const imgRef = ref(storage, filename);

		// Upload image to Firebase
		const result = await uploadBytes(imgRef, img.buffer);

		await PostImg.create({
			postId,
			imgUrl: result.metadata.fullPath,
		});
	});

	await Promise.all(imgsPromises);
};

const getPostsImgsUrls = async posts => {
	// Loop through posts to get to the postImgs
	const postsWithImgsPromises = posts.map(async post => {
		// Get imgs URLs
		const postImgsPromises = post.postImgs.map(async postImg => {
			const imgRef = ref(storage, postImg.imgUrl);
			const imgUrl = await getDownloadURL(imgRef);

			postImg.imgUrl = imgUrl;
			return postImg;
		});

		// Resolve imgs urls
		const postImgs = await Promise.all(postImgsPromises);

		// Update old postImgs array with new array
		post.postImgs = postImgs;
		return post;
	});

	return await Promise.all(postsWithImgsPromises);
};

module.exports = { storage, uploadPostImgs, getPostsImgsUrls };
