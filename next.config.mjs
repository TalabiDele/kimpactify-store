/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: ['res.cloudinary.com', "http://localhost:3000"]
  },
};

export default nextConfig;
