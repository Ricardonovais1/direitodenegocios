import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const config: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
  async redirects() {
    return [
      // A área "Direito de negócios" foi absorvida pelas nove subáreas; a URL
      // já esteve no ar, então segue apontando para a listagem em vez de 404.
      {
        source: '/areas-de-atuacao/direito-de-negocios',
        destination: '/areas-de-atuacao',
        permanent: true,
      },
      {
        source: '/:locale/areas-de-atuacao/direito-de-negocios',
        destination: '/:locale/areas-de-atuacao',
        permanent: true,
      },
    ]
  },
}

export default withNextIntl(config)
