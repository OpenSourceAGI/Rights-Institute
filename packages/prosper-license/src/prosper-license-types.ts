/**
 * TypeScript type definitions for PROSPER License
 * This file contains all type interfaces and configurations
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
// LICENSE CONFIGURATION TYPES
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

// ============================================================================
// LICENSE DATA STRUCTURE
// ============================================================================

/**
 * Complete license data structure
 */
export interface LicenseData {
  /** License configuration */
  config: LicenseConfig;
  /** Background text configuration */
  backgroundText: BackgroundTextConfig;
  /** Individual authors */
  authors: IndividualAuthor[];
  /** Organizations */
  organizations: Organization[];
  /** Entity details for modal display */
  entityDetails: Record<string, EntityDetails>;
  /** Modal animation configuration */
  modalAnimation: ModalAnimationConfig;
}

// ============================================================================
// SECTION NAVIGATION TYPES
// ============================================================================

/**
 * Navigation section configuration
 */
export interface NavigationSection {
  /** Unique identifier for the section */
  id: string;
  /** Display title for the section */
  title: string;
  /** Icon component for the section */
  icon: any; // React component type
}

/**
 * Role icon mapping configuration
 */
export interface RoleIconMapping {
  [key: string]: any; // React component type
} 