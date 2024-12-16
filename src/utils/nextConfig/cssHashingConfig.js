// const path = require('path');
// const crypto = require('crypto');

// const generateHash = (input) => {
//     return crypto
//         .createHash('md5')
//         .update(input)
//         .digest('base64')
//         .replace(/[/+=]/g, '')
//         .substring(0, 5);
// };

// const cssHashingConfig = (config, ctx) => {
//     const rules = config.module.rules;

//     rules.forEach((rule) => {
//         rule.use.forEach((moduleLoader) => {
//             if (
//                 moduleLoader.loader?.includes('css-loader') &&
//                 !moduleLoader.loader?.includes('postcss-loader') &&
//                 typeof moduleLoader.options.modules === 'object'
//             ) {
//                 moduleLoader.options.modules = {
//                     ...moduleLoader.options.modules,
//                     getLocalIdent: (context, _, localName) => {
//                         const filePath = path.relative(
//                             context.rootContext,
//                             context.resourcePath,
//                         );
//                         const hash = generateHash(`${filePath}:${localName}`);
//                         return hash;
//                     },
//                 };
//             }
//         });
//     });

//     return config;
// };

// export default cssHashingConfig;


// src/utils/nextConfig/cssHashingConfig.js
const crypto = require('crypto');
const path = require('path');

const generateHash = (input) => {
    return crypto.createHash('md5').update(input).digest('hex').slice(0, 8);
};

const cssHashingConfig = (config, { dev, isServer }) => {
    const rules = config.module.rules
        .find((rule) => typeof rule.oneOf === "object")
        .oneOf.filter((rule) => Array.isArray(rule.use));

    rules.forEach((rule) => {
        rule.use.forEach((moduleLoader) => {
            if (
                moduleLoader.loader?.includes("css-loader") &&
                !moduleLoader.loader?.includes("postcss-loader") &&
                typeof moduleLoader.options.modules === "object"
            ) {
                moduleLoader.options.modules = {
                    ...moduleLoader.options.modules,
                    getLocalIdent: (context, _, localName) => {
                        const filePath = path.relative(context.rootContext, context.resourcePath);
                        const hash = generateHash(`${filePath}:${localName}`);
                        return hash;
                    }
                };
            }
        });
    });

    return config;
};

module.exports = cssHashingConfig;