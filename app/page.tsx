import { AtlasHero } from '@/components/atlas/AtlasHero';
import { LayersGrid } from '@/components/atlas/LayersGrid';
import { AtlasPreviewSection } from '@/components/atlas/AtlasPreviewSection';
import { ManifestoBlock } from '@/components/atlas/ManifestoBlock';
import { FeaturedStoryBlock } from '@/components/atlas/FeaturedStoryBlock';
import { PhysicalAtlasBlock } from '@/components/atlas/PhysicalAtlasBlock';
import { SubmissionCTA } from '@/components/atlas/SubmissionCTA';

export default function HomePage() {
  return (
    <>
      <AtlasHero />
      <LayersGrid />
      <AtlasPreviewSection />
      <ManifestoBlock />
      <FeaturedStoryBlock />
      <PhysicalAtlasBlock />
      <SubmissionCTA />
    </>
  );
}
