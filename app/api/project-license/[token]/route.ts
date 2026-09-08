import { NextRequest, NextResponse } from 'next/server';
import { sampleLicenseDataByToken } from '@rights/prosper-license/sample-data/codecraft-studio';

// Required for static export
export const dynamic = 'force-static';

// Generate static params for all possible tokens
export async function generateStaticParams() {
  // Define the tokens you want to pre-generate
  const tokens = [
    'codecraft-studio',
    'design-system', 
    'enterprise-platform',
    'open-source-toolkit',
    'sample-project-1',
    'sample-project-2',
    'sample-project-3'
  ];

  return tokens.map((token) => ({
    token,
  }));
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    
    // Look up the correct sample data for the token
    const licenseData = sampleLicenseDataByToken[token];
    if (!licenseData) {
      return NextResponse.json(
        { error: `No sample license data found for token '${token}'` },
        { status: 404 }
      );
    }
    const projectData = {
      token,
      project: {
        name: licenseData.config.defaultProjectName,
        description: `Sample project for token ${token}`,
        license: "PROSPER",
        authors: licenseData.authors,
        organizations: licenseData.organizations,
        config: licenseData.config,
        entityDetails: licenseData.entityDetails,
        backgroundText: licenseData.backgroundText
      },
      timestamp: new Date().toISOString()
    };
    return NextResponse.json(projectData);
  } catch (error) {
    console.error('Error fetching project license data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project license data' },
      { status: 500 }
    );
  }
} 