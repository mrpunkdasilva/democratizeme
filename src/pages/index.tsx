import { Box } from '@chakra-ui/react'
import { Layout } from '../components/Layout'
import { Hero } from '../components/home/Hero'
import { StatsSection } from '../components/home/StatsSection'
import { FeatureSection } from '../components/home/FeatureSection'
import { FeaturedPoliticians } from '../components/home/FeaturedPoliticians'
import { NewsSection } from '../components/home/NewsSection'

export default function Home() {
  return (
    <Layout>
      <Box>
        <Hero />
        <StatsSection />
        <FeatureSection />
        <FeaturedPoliticians />
        <NewsSection />
      </Box>
    </Layout>
  )
}