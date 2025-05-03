import { Box, Container } from '@chakra-ui/react'
import { Layout } from '../components/Layout'
import { Hero } from '../components/home/Hero'
import { StatsSection } from '../components/home/StatsSection'
import { FeatureSection } from '../components/home/FeatureSection'
import { FeaturedPoliticians } from '../components/home/FeaturedPoliticians'
import { NewsSection } from '../components/home/NewsSection'
import { DemocracyTips } from '../components/home/DemocracyTips'

export default function Home() {
  return (
    <Layout>
      <Box>
        <Hero />
        <Container maxW="container.xl" py={8}>
          <DemocracyTips />
          <StatsSection />
          <FeatureSection />
          <FeaturedPoliticians />
          <NewsSection />
        </Container>
      </Box>
    </Layout>
  )
}