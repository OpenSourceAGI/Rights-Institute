import { describe, expect, it } from 'vitest';
import {
  DEFAULT_AUTHORS,
  DEFAULT_BACKGROUND_TEXT_CONFIG,
  DEFAULT_LICENSE_CONFIG,
  DEFAULT_ORGANIZATIONS,
  ENTITY_DETAILS,
  MODAL_ANIMATION_CONFIG,
} from './customize-license';

describe('DEFAULT_LICENSE_CONFIG', () => {
  it('has the expected shape', () => {
    expect(DEFAULT_LICENSE_CONFIG).toMatchObject({
      defaultYear: expect.any(String),
      defaultProjectName: expect.any(String),
      defaultProjectId: expect.any(String),
      defaultHashKey: expect.any(String),
      defaultAppName: expect.any(String),
    });
  });
});

describe('DEFAULT_BACKGROUND_TEXT_CONFIG', () => {
  it('has numeric shine timing values', () => {
    expect(typeof DEFAULT_BACKGROUND_TEXT_CONFIG.shineDuration).toBe('number');
    expect(typeof DEFAULT_BACKGROUND_TEXT_CONFIG.shineDelay).toBe('number');
    expect(DEFAULT_BACKGROUND_TEXT_CONFIG.shineDuration).toBeGreaterThan(0);
  });

  it('has non-empty text', () => {
    expect(DEFAULT_BACKGROUND_TEXT_CONFIG.text).toBeTruthy();
  });
});

describe('DEFAULT_AUTHORS', () => {
  it('is a non-empty array of well-formed authors', () => {
    expect(DEFAULT_AUTHORS.length).toBeGreaterThan(0);
    for (const author of DEFAULT_AUTHORS) {
      expect(author.name).toBeTruthy();
      expect(author.email).toMatch(/@/);
      expect(author.role).toBeTruthy();
    }
  });

  it('has an entry in ENTITY_DETAILS for every author', () => {
    for (const author of DEFAULT_AUTHORS) {
      expect(ENTITY_DETAILS[author.name]).toBeDefined();
      expect(ENTITY_DETAILS[author.name].type).toBe('Individual');
    }
  });
});

describe('DEFAULT_ORGANIZATIONS', () => {
  it('is a non-empty array of well-formed organizations', () => {
    expect(DEFAULT_ORGANIZATIONS.length).toBeGreaterThan(0);
    for (const org of DEFAULT_ORGANIZATIONS) {
      expect(org.name).toBeTruthy();
      expect(org.contact).toMatch(/@/);
      expect(org.role).toBeTruthy();
    }
  });

  it('has an entry in ENTITY_DETAILS for every organization', () => {
    for (const org of DEFAULT_ORGANIZATIONS) {
      expect(ENTITY_DETAILS[org.name]).toBeDefined();
      expect(ENTITY_DETAILS[org.name].type).toBe('Organization');
    }
  });
});

describe('ENTITY_DETAILS', () => {
  it('gives every entity at least one project', () => {
    for (const entity of Object.values(ENTITY_DETAILS)) {
      expect(entity.projects.length).toBeGreaterThan(0);
    }
  });

  it('keys each entity by its own name', () => {
    for (const [key, entity] of Object.entries(ENTITY_DETAILS)) {
      expect(entity.name).toBe(key);
    }
  });

  it('gives every project a non-negative star count', () => {
    for (const entity of Object.values(ENTITY_DETAILS)) {
      for (const project of entity.projects) {
        expect(project.stars).toBeGreaterThanOrEqual(0);
      }
    }
  });
});

describe('MODAL_ANIMATION_CONFIG', () => {
  it('has positive numeric timings and layer counts', () => {
    expect(MODAL_ANIMATION_CONFIG.pulseDuration).toBeGreaterThan(0);
    expect(MODAL_ANIMATION_CONFIG.layerDelay).toBeGreaterThan(0);
    expect(MODAL_ANIMATION_CONFIG.gradientLayers).toBeGreaterThan(0);
    expect(Number.isInteger(MODAL_ANIMATION_CONFIG.gradientLayers)).toBe(true);
  });
});
