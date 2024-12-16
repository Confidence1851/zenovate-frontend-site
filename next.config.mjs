// import obfuscationConfig from './src/utils/nextConfig/obfuscationConfig.js';
// import cssHashingConfig from './src/utils/nextConfig/cssHashingConfig.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,

	eslint: {
		ignoreDuringBuilds: true
	},
	experimental: {
		swcMinify: true,
	},
	compiler: {
		removeConsole: true,
	},
	webpack: (config, ctx) => {
		config.module.rules.push({
			test: /\.md$/,
			use: 'raw-loader'
		})

		// config = obfuscationConfig(config, ctx);
		// config = cssHashingConfig(config, ctx);
		return config
	},
};

export default nextConfig