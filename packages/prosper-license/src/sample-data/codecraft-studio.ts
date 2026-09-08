/**
 * Sample license data for CodeCraft Studio
 * This file contains all the configuration and data for the CodeCraft Studio PROSPER license
 */

import type { LicenseData } from '../prosper-license-types';

export const codecraftStudioData: LicenseData = {
  config: {
    defaultYear: "2024",
    defaultProjectName: "CodeCraft Studio",
    defaultProjectId: "proj_abc123def456",
    defaultHashKey: "sha256:a1b2c3d4e5f6789012345678901234567890abcdef",
    defaultAppName: "CodeCraft Studio",
    defaultLogoUrl: undefined
  },
  backgroundText: {
    text: "CodeCraft Studio",
    mobileFontSize: "20vw",
    smallScreenFontSize: "15vw",
    largeScreenFontSize: "12vw",
    textColor: "text-gray-100/30",
    rotation: "-rotate-12",
    letterSpacing: "tracking-wider",
    shineDuration: 3,
    shineDelay: 1
  },
  authors: [
    {
      name: "Jane Developer",
      email: "jane@example.com",
      role: "Lead Developer"
    },
    {
      name: "Alex Chen",
      email: "alex@designstudio.com",
      role: "UI/UX Designer"
    }
  ],
  organizations: [
    {
      name: "TechCorp Solutions",
      contact: "opensource@techcorp.com",
      role: "Sponsor"
    }
  ],
  entityDetails: {
    "Jane Developer": {
      name: "Jane Developer",
      type: "Individual",
      email: "jane@example.com",
      role: "Lead Developer",
      bio: "Full-stack developer with 8+ years of experience in React, Node.js, and cloud architecture. Passionate about open source and building scalable applications.",
      location: "San Francisco, CA",
      github: "github.com/janedev",
      website: "janedev.com",
      projects: [
        {
          name: "React Component Library",
          stars: 1200,
          description: "Popular UI component library used by 50k+ developers"
        },
        {
          name: "Node.js Microservices",
          stars: 850,
          description: "Production-ready microservices framework"
        },
        {
          name: "Cloud Deployment Tools",
          stars: 650,
          description: "DevOps automation toolkit"
        }
      ],
      contributions: 45,
      followers: 3200
    },
    "Alex Chen": {
      name: "Alex Chen",
      type: "Individual",
      email: "alex@designstudio.com",
      role: "Creative Designer & Researcher",
      bio: "Multi-disciplinary creative professional specializing in visual design, user experience, and digital media. Expert in design systems, accessibility, and cross-platform content creation.",
      location: "New York, NY",
      behance: "behance.net/alexchen",
      website: "alexchen.design",
      projects: [
        {
          name: "Design System Framework",
          stars: 950,
          description: "Comprehensive design system for enterprise applications"
        },
        {
          name: "YouTube Design Series",
          stars: 850,
          description: "Educational videos on UI/UX design principles and creative workflows"
        },
        {
          name: "Movie Scene Design Concepts",
          stars: 720,
          description: "Visual design concepts for sci-fi and fantasy film environments"
        },
        {
          name: "Video Game UI Research",
          stars: 680,
          description: "Research PDFs on user interface design in modern gaming"
        },
        {
          name: "Accessibility Toolkit",
          stars: 720,
          description: "Tools for creating accessible digital experiences"
        },
        {
          name: "Creative Portfolio Templates",
          stars: 580,
          description: "Professional templates for designers and artists"
        }
      ],
      contributions: 32,
      followers: 2100
    },
    "TechCorp Solutions": {
      name: "TechCorp Solutions",
      type: "Organization",
      contact: "opensource@techcorp.com",
      role: "Sponsor",
      bio: "Leading technology company focused on enterprise software solutions and open source innovation. Committed to supporting the developer community.",
      location: "Austin, TX",
      website: "techcorp.com",
      founded: 2015,
      employees: 250,
      projects: [
        {
          name: "Enterprise Platform",
          stars: 2100,
          description: "Comprehensive business management platform"
        },
        {
          name: "Developer Tools Suite",
          stars: 1800,
          description: "Complete toolkit for modern development teams"
        },
        {
          name: "Cloud Infrastructure",
          stars: 1500,
          description: "Scalable cloud solutions for enterprises"
        }
      ],
      sponsorships: 15,
      openSourceProjects: 8
    }
  },
  modalAnimation: {
    pulseDuration: 2,
    layerDelay: 0.5,
    gradientLayers: 3
  }
};

// Sample data for other tokens
export const sampleLicenseDataByToken: Record<string, LicenseData> = {
  'codecraft-studio': codecraftStudioData,
  'design-system': {
    ...codecraftStudioData,
    config: {
      ...codecraftStudioData.config,
      defaultProjectName: 'Design System',
      defaultProjectId: 'proj_designsystem',
      defaultAppName: 'Design System',
    },
    authors: [
      {
        name: 'Sam Designer',
        email: 'sam@design.com',
        role: 'Lead Designer',
      },
    ],
    organizations: [
      {
        name: 'DesignOrg',
        contact: 'contact@designorg.com',
        role: 'Sponsor',
      },
    ],
  },
  'enterprise-platform': {
    ...codecraftStudioData,
    config: {
      ...codecraftStudioData.config,
      defaultProjectName: 'Enterprise Platform',
      defaultProjectId: 'proj_enterprise',
      defaultAppName: 'Enterprise Platform',
    },
    authors: [
      {
        name: 'Enterprise Dev',
        email: 'dev@enterprise.com',
        role: 'Lead Engineer',
      },
    ],
    organizations: [
      {
        name: 'EnterpriseCorp',
        contact: 'opensource@enterprisecorp.com',
        role: 'Sponsor',
      },
    ],
  },
  'open-source-toolkit': {
    ...codecraftStudioData,
    config: {
      ...codecraftStudioData.config,
      defaultProjectName: 'Open Source Toolkit',
      defaultProjectId: 'proj_ostoolkit',
      defaultAppName: 'Open Source Toolkit',
    },
    authors: [
      {
        name: 'Open Dev',
        email: 'open@dev.com',
        role: 'Maintainer',
      },
    ],
    organizations: [
      {
        name: 'OpenSourceOrg',
        contact: 'contact@opensource.org',
        role: 'Sponsor',
      },
    ],
  },
  'sample-project-1': {
    ...codecraftStudioData,
    config: {
      ...codecraftStudioData.config,
      defaultProjectName: 'Sample Project 1',
      defaultProjectId: 'proj_sample1',
      defaultAppName: 'Sample Project 1',
    },
    authors: [
      {
        name: 'Sample Author 1',
        email: 'author1@sample.com',
        role: 'Author',
      },
    ],
    organizations: [],
  },
  'sample-project-2': {
    ...codecraftStudioData,
    config: {
      ...codecraftStudioData.config,
      defaultProjectName: 'Sample Project 2',
      defaultProjectId: 'proj_sample2',
      defaultAppName: 'Sample Project 2',
    },
    authors: [
      {
        name: 'Sample Author 2',
        email: 'author2@sample.com',
        role: 'Author',
      },
    ],
    organizations: [],
  },
  'sample-project-3': {
    ...codecraftStudioData,
    config: {
      ...codecraftStudioData.config,
      defaultProjectName: 'Sample Project 3',
      defaultProjectId: 'proj_sample3',
      defaultAppName: 'Sample Project 3',
    },
    authors: [
      {
        name: 'Sample Author 3',
        email: 'author3@sample.com',
        role: 'Author',
      },
    ],
    organizations: [],
  },
};

// Default export for convenience
export default codecraftStudioData; 