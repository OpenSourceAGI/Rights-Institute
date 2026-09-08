/**
 * License data loader utility
 * Handles loading and parsing of license data from JSON files
 */

import type { LicenseData } from './prosper-license-types';

/**
 * Loads license data from a TypeScript file in the sample-data folder
 * @param projectName - The name of the project (e.g., 'codecraft-studio')
 * @returns Promise<LicenseData> - The parsed license data
 */
export async function loadLicenseData(projectName: string): Promise<LicenseData> {
  try {
    // Dynamic import of the TypeScript file
    const data = await import(`../sample-data/${projectName}.ts`);
    return data.default as LicenseData;
  } catch (error) {
    console.error(`Failed to load license data for ${projectName}:`, error);
    throw new Error(`License data not found for project: ${projectName}`);
  }
}

/**
 * Loads license data synchronously (for server-side rendering)
 * @param projectName - The name of the project
 * @returns LicenseData - The parsed license data
 */
export function loadLicenseDataSync(projectName: string): LicenseData {
  try {
    // For server-side rendering, we can use require
    const data = require(`../sample-data/${projectName}.ts`);
    return data.default as LicenseData;
  } catch (error) {
    console.error(`Failed to load license data for ${projectName}:`, error);
    throw new Error(`License data not found for project: ${projectName}`);
  }
}

/**
 * Gets a list of available license data files
 * @returns string[] - Array of available project names
 */
export function getAvailableLicenses(): string[] {
  // This would typically read from the sample-data directory
  // For now, we'll return a hardcoded list
  return ['codecraft-studio'];
}

/**
 * Validates license data structure
 * @param data - The license data to validate
 * @returns boolean - True if valid, false otherwise
 */
export function validateLicenseData(data: any): data is LicenseData {
  return (
    data &&
    typeof data === 'object' &&
    'config' in data &&
    'backgroundText' in data &&
    'authors' in data &&
    'organizations' in data &&
    'entityDetails' in data &&
    'modalAnimation' in data
  );
} 