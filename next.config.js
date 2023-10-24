// /** @type {import('next').NextConfig} */
// // const withNextIntl = require('next-intl/plugin')(
// //   // This is the default (also the `src` folder is supported out of the box)
// //   './i18n.ts'
// // );

// const nextConfig = {};

// module.exports = nextConfig;
// // module.exports = withNextIntl({
// //   Other Next.js configuration ...
// // });
const withNextIntl = require('next-intl/plugin')(
  // This is the default (also the `src` folder is supported out of the box)
  './i18n.ts'
);
 
module.exports = withNextIntl({
  // Other Next.js configuration ...
});