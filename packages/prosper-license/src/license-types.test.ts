import { describe, expect, it } from 'vitest';
import { licenseTypes } from './license-types';

const VALID_CATEGORIES = ['Open Source', 'Commercial', 'Proprietary', 'Creative Commons', 'Custom'];

describe('licenseTypes', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(licenseTypes)).toBe(true);
    expect(licenseTypes.length).toBeGreaterThan(0);
  });

  it('has unique ids', () => {
    const ids = licenseTypes.map((license) => license.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('includes the core license types', () => {
    const ids = licenseTypes.map((license) => license.id);
    expect(ids).toEqual(
      expect.arrayContaining(['prosper', 'mit', 'apache-2', 'gpl-3', 'bsd-3', 'commercial', 'creative-commons'])
    );
  });

  it.each(licenseTypes.map((license) => [license.id, license]))(
    '%s has required non-empty string fields',
    (_id, license) => {
      expect(license.id).toBeTruthy();
      expect(license.name).toBeTruthy();
      expect(license.description).toBeTruthy();
      expect(license.icon).toBeTruthy();
      expect(license.color).toBeTruthy();
    }
  );

  it.each(licenseTypes.map((license) => [license.id, license]))(
    '%s has a valid category',
    (_id, license) => {
      expect(VALID_CATEGORIES).toContain(license.category);
    }
  );

  it.each(licenseTypes.map((license) => [license.id, license]))(
    '%s has non-empty features, restrictions, useCases, and samples arrays',
    (_id, license) => {
      expect(license.features.length).toBeGreaterThan(0);
      expect(license.restrictions.length).toBeGreaterThan(0);
      expect(license.useCases.length).toBeGreaterThan(0);
      expect(license.samples.length).toBeGreaterThan(0);
    }
  );

  it('gives every sample within a license a unique id', () => {
    for (const license of licenseTypes) {
      const sampleIds = license.samples.map((sample) => sample.id);
      expect(new Set(sampleIds).size).toBe(sampleIds.length);
    }
  });

  it('gives every sample the required string fields', () => {
    for (const license of licenseTypes) {
      for (const sample of license.samples) {
        expect(sample.id).toBeTruthy();
        expect(sample.name).toBeTruthy();
        expect(sample.description).toBeTruthy();
        expect(sample.projectType).toBeTruthy();
        expect(sample.icon).toBeTruthy();
        expect(typeof sample.params).toBe('object');
      }
    }
  });

  it('stores authors/orgs sample params as parseable JSON when present', () => {
    for (const license of licenseTypes) {
      for (const sample of license.samples) {
        if ('authors' in sample.params) {
          expect(() => JSON.parse(sample.params.authors)).not.toThrow();
        }
        if ('orgs' in sample.params) {
          expect(() => JSON.parse(sample.params.orgs)).not.toThrow();
        }
      }
    }
  });
});
