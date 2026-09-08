import { describe, expect, it } from 'vitest';
import { getAvailableLicenses, validateLicenseData } from './license-data-loader';
import codecraftStudioData from './sample-data/codecraft-studio';

describe('getAvailableLicenses', () => {
  it('returns a non-empty list of project names', () => {
    const licenses = getAvailableLicenses();
    expect(Array.isArray(licenses)).toBe(true);
    expect(licenses.length).toBeGreaterThan(0);
  });

  it('includes codecraft-studio', () => {
    expect(getAvailableLicenses()).toContain('codecraft-studio');
  });
});

describe('validateLicenseData', () => {
  it('accepts a well-formed license data object', () => {
    expect(validateLicenseData(codecraftStudioData)).toBe(true);
  });

  it('rejects null', () => {
    expect(validateLicenseData(null)).toBeFalsy();
  });

  it('rejects undefined', () => {
    expect(validateLicenseData(undefined)).toBeFalsy();
  });

  it('rejects a non-object primitive', () => {
    expect(validateLicenseData('not an object')).toBe(false);
    expect(validateLicenseData(42)).toBe(false);
  });

  it('rejects an object missing config', () => {
    const { config, ...rest } = codecraftStudioData;
    expect(validateLicenseData(rest)).toBe(false);
  });

  it('rejects an object missing backgroundText', () => {
    const { backgroundText, ...rest } = codecraftStudioData;
    expect(validateLicenseData(rest)).toBe(false);
  });

  it('rejects an object missing authors', () => {
    const { authors, ...rest } = codecraftStudioData;
    expect(validateLicenseData(rest)).toBe(false);
  });

  it('rejects an object missing organizations', () => {
    const { organizations, ...rest } = codecraftStudioData;
    expect(validateLicenseData(rest)).toBe(false);
  });

  it('rejects an object missing entityDetails', () => {
    const { entityDetails, ...rest } = codecraftStudioData;
    expect(validateLicenseData(rest)).toBe(false);
  });

  it('rejects an object missing modalAnimation', () => {
    const { modalAnimation, ...rest } = codecraftStudioData;
    expect(validateLicenseData(rest)).toBe(false);
  });

  it('rejects an empty object', () => {
    expect(validateLicenseData({})).toBe(false);
  });
});
