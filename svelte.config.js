import vercel from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// Use the Vercel adapter for deployment
		adapter: vercel(),
		csrf: {
			checkOrigin: true,
		}
	}
};

export default config;
