/**
 * @fileoverview Covers the startup-tools catalog. It is hand-maintained data
 * rendered straight into a public directory, so the invariants that matter are
 * the ones a bad paste breaks: a duplicate id that makes React drop a card, a
 * dead link, or a category that no filter button can select.
 */

import { describe, expect, it } from 'vitest';

import { categories, tools } from './tools';

describe('tools catalog', () => {
  it('is not empty', () => {
    expect(tools.length).toBeGreaterThan(0);
  });

  it('gives every tool the fields the grid renders', () => {
    for (const tool of tools) {
      expect(tool.id, tool.name).toBeTruthy();
      expect(tool.name, tool.name).toBeTruthy();
      expect(tool.description, tool.name).toBeTruthy();
      expect(tool.url, tool.name).toBeTruthy();
      expect(tool.category, tool.name).toBeTruthy();
      expect(tool.problem, tool.name).toBeTruthy();
    }
  });

  it('gives every tool a unique id, so no card is dropped on render', () => {
    const ids = tools.map((tool) => tool.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('lists every tool only once by name', () => {
    const names = tools.map((tool) => tool.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it('points every tool at an absolute http(s) url', () => {
    for (const tool of tools) {
      expect(() => new URL(tool.url), `${tool.name}: ${tool.url}`).not.toThrow();
      expect(tool.url, tool.name).toMatch(/^https?:\/\//);
    }
  });

  it('never leaves stray whitespace in a rendered field', () => {
    for (const tool of tools) {
      expect(tool.name, tool.name).toBe(tool.name.trim());
      expect(tool.category, tool.name).toBe(tool.category.trim());
      expect(tool.problem, tool.name).toBe(tool.problem.trim());
    }
  });
});

describe('categories', () => {
  it('is not empty', () => {
    expect(categories.length).toBeGreaterThan(0);
  });

  it('names each category only once', () => {
    const names = categories.map((category) => category.name ?? category);
    expect(new Set(names).size).toBe(names.length);
  });

  it('offers a filter for every category a tool actually uses', () => {
    const offered = new Set(
      categories.map((category) => category.name ?? category),
    );
    const used = new Set(tools.map((tool) => tool.category));

    for (const category of used) {
      expect(offered, `no filter offers "${category}"`).toContain(category);
    }
  });
});
