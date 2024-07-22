import Head from 'next/head'

interface SEOProps {
      title: string
      description: string
}

const SEO = ({ title, description }: SEOProps) => (
      <Head>
            <title>{title}</title>
            <meta name='description' content={description} />
      </Head>
)

export default SEO
