/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        loader: "custom",
        loaderFile: './ImageLoader.js'
      },
    
}

module.exports = nextConfig
