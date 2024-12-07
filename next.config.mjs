/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com'],
    },
    async headers(){
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Cross-Origin-Opener-Policy',
                        value: 'same-origin-allow-popups'
                    }
                ]
            }
        ]
    }
};

export default nextConfig;
