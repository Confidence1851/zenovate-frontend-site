const TerserPlugin = require('terser-webpack-plugin');
const WebpackObfuscatorPlugin = require('webpack-obfuscator');

const obfuscationConfig = (config, { isServer }) => {
    // const obfuscationConfig = (config) => {
    // if (process.env.APP_ENV === 'production') {

    if (process.env.APP_ENV === 'production' && !isServer) {
        // config.mode = 'production';
        config.optimization.minimize = true;
        config.optimization.minimizer.push(
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    ecma: 2016,
                    parse: {
                        ecma: 8,
                    },
                    format: { comments: false },
                    compress: {
                        ecma: 5,
                        warnings: false,
                        comparisons: false,
                        inline: 2,
                        passes: 2,
                        drop_console: true,
                        pure_funcs: [
                            'console.log',
                            'console.info',
                            'console.debug',
                            'console.warn',
                        ],
                    },
                    mangle: { properties: true },
                    keep_classnames: false,
                    keep_fnames: false,
                    module: false,
                    output: {
                        ecma: 5,
                        comments: false,
                        ascii_only: true,
                    },
                },
            }),
        );

        config.optimization.splitChunks = { chunks: 'all' };

        config.plugins.push(
            new WebpackObfuscatorPlugin(
                {
                    rotateStringArray: true,
                    stringArray: true,
                    stringArrayThreshold: 0.75,
                    transformObjectKeys: true,
                    renameGlobals: true,
                    deadCodeInjection: true,
                    deadCodeInjectionThreshold: 0.4,
                },
                [],
            ),
        );
    }
    return config;
};

module.exports = obfuscationConfig;
