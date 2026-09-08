import { describe, expect, it } from 'vitest';
import { validateLicenseData } from '../license-data-loader';
import codecraftStudioData, { sampleLicenseDataByToken } from './codecraft-studio';

describe('codecraftStudioData', () => {
  it('passes license data validation', () => {
    expect(validateLicenseData(codecraftStudioData)).toBe(true);
  });

  it('has an ENTITY_DETAILS entry for every author and organization', () => {
    for (const author of codecraftStudioData.authors) {
      expect(codecraftStudioData.entityDetails[author.name]).toBeDefined();
    }
    for (const org of codecraftStudioData.organizations) {
      expect(codecraftStudioData.entityDetails[org.name]).toBeDefined();
    }
  });

  it('matches its own default export', () => {
    expect(codecraftStudioData.config.defaultProjectName).toBe('CodeCraft Studio');
  });
});

describe('sampleLicenseDataByToken', () => {
  const expectedTokens = [
    'codecraft-studio',
    'design-system',
    'enterprise-platform',
    'open-source-toolkit',
    'sample-project-1',
    'sample-project-2',
    'sample-project-3',
  ];

  it('contains all expected tokens', () => {
    expect(Object.keys(sampleLicenseDataByToken).sort()).toEqual(expectedTokens.sort());
  });

  it('maps codecraft-studio to the base data object', () => {
    expect(sampleLicenseDataByToken['codecraft-studio']).toBe(codecraftStudioData);
  });

  it.each(expectedTokens)('%s passes license data validation', (token) => {
    expect(validateLicenseData(sampleLicenseDataByToken[token])).toBe(true);
  });

  it.each(expectedTokens)('%s has a project name matching its config', (token) => {
    const data = sampleLicenseDataByToken[token];
    expect(data.config.defaultProjectName).toBeTruthy();
    expect(data.config.defaultAppName).toBeTruthy();
  });

  it('gives each override token a distinct project id', () => {
    const projectIds = expectedTokens.map((token) => sampleLicenseDataByToken[token].config.defaultProjectId);
    expect(new Set(projectIds).size).toBe(projectIds.length);
  });
});
