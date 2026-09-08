/**
 * Custom variables and types for PROSPER License customization
 * This file contains all configurable elements for the license display
 */

// ============================================================================
// ENTITY TYPES
// ============================================================================

/**
 * Represents an individual contributor to the project
 */
export interface IndividualAuthor {
  /** Full name of the contributor */
  name: string;
  /** Email address for contact */
  email: string;
  /** Role in the project (e.g., Lead Developer, UI/UX Designer) */
  role: string;
}

/**
 * Represents an organization that contributed to the project
 */
export interface Organization {
  /** Organization name */
  name: string;
  /** Contact email for the organization */
  contact: string;
  /** Role of the organization (e.g., Sponsor, Contributor) */
  role: string;
}

/**
 * Represents a project created by an entity
 */
export interface Project {
  /** Name of the project */
  name: string;
  /** Number of stars/rating for the project */
  stars: number;
  /** Brief description of the project */
  description: string;
}

/**
 * Detailed information about an entity (person or organization)
 */
export interface EntityDetails {
  /** Entity name */
  name: string;
  /** Type of entity (Individual or Organization) */
  type: 'Individual' | 'Organization';
  /** Contact email */
  email?: string;
  /** Organization contact (for organizations) */
  contact?: string;
  /** Role in the current project */
  role: string;
  /** Biography or description */
  bio: string;
  /** Location of the entity */
  location: string;
  /** Personal/organization website */
  website?: string;
  /** GitHub profile (for individuals) */
  github?: string;
  /** Behance profile (for designers) */
  behance?: string;
  /** Year founded (for organizations) */
  founded?: number;
  /** Number of employees (for organizations) */
  employees?: number;
  /** Notable projects */
  projects: Project[];
  /** Number of contributions (for individuals) */
  contributions?: number;
  /** Number of followers (for individuals) */
  followers?: number;
  /** Number of sponsorships (for organizations) */
  sponsorships?: number;
  /** Number of open source projects (for organizations) */
  openSourceProjects?: number;
}

// ============================================================================
// LICENSE CONFIGURATION
// ============================================================================

/**
 * Configuration for the PROSPER license display
 */
export interface LicenseConfig {
  /** Default year for copyright */
  defaultYear: string;
  /** Default project name */
  defaultProjectName: string;
  /** Default project ID */
  defaultProjectId: string;
  /** Default hash key */
  defaultHashKey: string;
  /** Default app name */
  defaultAppName: string;
  /** Default logo URL (optional) */
  defaultLogoUrl?: string;
}

/**
 * Configuration for the background text animation
 */
export interface BackgroundTextConfig {
  /** Text to display as background */
  text: string;
  /** Base font size for mobile (in vw units) */
  mobileFontSize: string;
  /** Font size for small screens (in vw units) */
  smallScreenFontSize: string;
  /** Font size for large screens (in vw units) */
  largeScreenFontSize: string;
  /** Text color with opacity */
  textColor: string;
  /** Rotation angle in degrees */
  rotation: string;
  /** Letter spacing */
  letterSpacing: string;
  /** Shine animation duration in seconds */
  shineDuration: number;
  /** Shine animation delay in seconds */
  shineDelay: number;
}

// ============================================================================
// DEFAULT VALUES
// ============================================================================

/**
 * Default license configuration
 */
export const DEFAULT_LICENSE_CONFIG: LicenseConfig = {
  defaultYear: '2024',
  defaultProjectName: 'CodeCraft Studio',
  defaultProjectId: 'proj_abc123def456',
  defaultHashKey: 'sha256:a1b2c3d4e5f6789012345678901234567890abcdef',
  defaultAppName: 'CodeCraft Studio',
  defaultLogoUrl: undefined
};

/**
 * Default background text configuration
 */
export const DEFAULT_BACKGROUND_TEXT_CONFIG: BackgroundTextConfig = {
  text: 'CodeCraft Studio',
  mobileFontSize: '20vw',
  smallScreenFontSize: '15vw',
  largeScreenFontSize: '12vw',
  textColor: 'text-gray-100/30',
  rotation: '-rotate-12',
  letterSpacing: 'tracking-wider',
  shineDuration: 3,
  shineDelay: 1
};

/**
 * Default individual authors
 */
export const DEFAULT_AUTHORS: IndividualAuthor[] = [
  {
    name: 'Jane Developer',
    email: 'jane@example.com',
    role: 'Lead Developer'
  },
  {
    name: 'Alex Chen',
    email: 'alex@designstudio.com',
    role: 'UI/UX Designer'
  }
];

/**
 * Default organizations
 */
export const DEFAULT_ORGANIZATIONS: Organization[] = [
  {
    name: 'TechCorp Solutions',
    contact: 'opensource@techcorp.com',
    role: 'Sponsor'
  }
];

/**
 * Detailed entity information for modal display
 */
export const ENTITY_DETAILS: Record<string, EntityDetails> = {
  'Jane Developer': {
    name: 'Jane Developer',
    type: 'Individual',
    email: 'jane@example.com',
    role: 'Lead Developer',
    bio: 'Full-stack developer with 8+ years of experience in React, Node.js, and cloud architecture. Passionate about open source and building scalable applications.',
    location: 'San Francisco, CA',
    github: 'github.com/janedev',
    website: 'janedev.com',
    projects: [
      { name: 'React Component Library', stars: 1200, description: 'Popular UI component library used by 50k+ developers' },
      { name: 'Node.js Microservices', stars: 850, description: 'Production-ready microservices framework' },
      { name: 'Cloud Deployment Tools', stars: 650, description: 'DevOps automation toolkit' }
    ],
    contributions: 45,
    followers: 3200
  },
  'Alex Chen': {
    name: 'Alex Chen',
    type: 'Individual',
    email: 'alex@designstudio.com',
    role: 'UI/UX Designer',
    bio: 'Creative designer specializing in user experience and interface design. Expert in design systems, accessibility, and user research.',
    location: 'New York, NY',
    behance: 'behance.net/alexchen',
    website: 'alexchen.design',
    projects: [
      { name: 'Design System Framework', stars: 950, description: 'Comprehensive design system for enterprise applications' },
      { name: 'Accessibility Toolkit', stars: 720, description: 'Tools for creating accessible digital experiences' },
      { name: 'Prototyping Library', stars: 580, description: 'Rapid prototyping components and templates' }
    ],
    contributions: 32,
    followers: 2100
  },
  'TechCorp Solutions': {
    name: 'TechCorp Solutions',
    type: 'Organization',
    contact: 'opensource@techcorp.com',
    role: 'Sponsor',
    bio: 'Leading technology company focused on enterprise software solutions and open source innovation. Committed to supporting the developer community.',
    location: 'Austin, TX',
    website: 'techcorp.com',
    founded: 2015,
    employees: 250,
    projects: [
      { name: 'Enterprise Platform', stars: 2100, description: 'Comprehensive business management platform' },
      { name: 'Developer Tools Suite', stars: 1800, description: 'Complete toolkit for modern development teams' },
      { name: 'Cloud Infrastructure', stars: 1500, description: 'Scalable cloud solutions for enterprises' }
    ],
    sponsorships: 15,
    openSourceProjects: 8
  }
};

// ============================================================================
// ANIMATION CONFIGURATIONS
// ============================================================================

/**
 * Modal background animation configuration
 */
export interface ModalAnimationConfig {
  /** Animation duration for pulse effects */
  pulseDuration: number;
  /** Delay between animation layers */
  layerDelay: number;
  /** Number of gradient layers */
  gradientLayers: number;
}

export const MODAL_ANIMATION_CONFIG: ModalAnimationConfig = {
  pulseDuration: 2,
  layerDelay: 0.5,
  gradientLayers: 3
}; 