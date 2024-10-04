module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Pokedex/pokedex/' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/Pokedex/pokedex' : '',
};
