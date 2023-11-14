/** @type {import('next').NextConfig} */
const nextConfig = {
    api: {
        bodyParser: {
            sizeLimit: '20mb',
        }
    }
}

module.exports = nextConfig
