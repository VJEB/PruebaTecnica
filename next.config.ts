// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

import type { NextConfig } from "next";
import withPWA from 'next-pwa'; // Import the next-pwa plugin

const nextConfig: NextConfig = {
  // Add your other Next.js configuration options here
  reactStrictMode: true, // Example of enabling strict mode
};

export default withPWA({
  ...nextConfig,
  dest: 'public', // Directory where service worker files will be stored
  disable: process.env.NODE_ENV === 'development', // Disable PWA in development mode
});
