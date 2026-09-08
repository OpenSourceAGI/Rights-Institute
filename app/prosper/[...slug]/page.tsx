import PROSPERLicense from '@rights/prosper-license/PROSPER';
import { Metadata } from 'next';

export async function generateStaticParams() {
  // Return all possible 'slug' values that your app supports
  const sampleSlugs = [
    'codecraft-studio',
    'design-system',
    'enterprise-platform',
    'open-source-toolkit'
  ];

  return sampleSlugs.map((slug) => ({
    slug: [slug],
  }));
}

// Generate metadata for each page
export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const slugValue = slug?.[0] || 'default';
  
  return {
    title: `PROSPER License Sample - ${slugValue.charAt(0).toUpperCase() + slugValue.slice(1)}`,
    description: `Sample PROSPER license configuration for ${slugValue} use case. Explore how the PROSPER license works for different scenarios.`,
    keywords: ['PROSPER', 'license', 'sample', slugValue, 'blockchain', 'attribution'],
  };
}

export default async function SampleLicensePage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const slugValue = slug?.[0] || 'codecraft-studio';
  return <PROSPERLicense sampleSlug={slugValue} />;
} 