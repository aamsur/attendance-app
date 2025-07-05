module.exports = {
    pwa: {
      name: 'Presensia App',
      themeColor: '#3880ff', // match your primary color
      background_color: '#ffffff',
      display: 'standalone',
      start_url: '.',
      icons: [
        {
          src: 'img/icons/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'img/icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
      workboxOptions: {
        skipWaiting: true,
      },
    },
  };
