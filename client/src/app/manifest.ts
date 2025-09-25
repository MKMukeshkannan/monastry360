import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Monastry 360',
    short_name: 'Monastry360',
    description: 'Your Tour Guide In Sikkim',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    screenshots: [
        {
          src: "/manifest-screenshot.png",
          sizes: "320x640",
          type: "image/png",
          form_factor: "narrow",
          label: "Home Page"
        }
    ],
    icons: [
      {
        src: '/icon128.png',
        sizes: '128x128',
        type: 'image/png',
      },
      {
        src: '/icon512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
