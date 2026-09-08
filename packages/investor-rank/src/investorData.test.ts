import { describe, expect, it } from 'vitest';
import { transformInvestorData } from './investorData';
import type { RawInvestorData } from './types';

function makeRaw(overrides: Partial<RawInvestorData> = {}): RawInvestorData {
  return {
    'Fund Name': 'Acme Ventures',
    'Investments': '120',
    'Exits': '30',
    'ExitRate': '25%',
    'Contact Person': 'Jane Doe',
    'Email': 'jane@acme.vc',
    'Homepage': 'https://acme.vc',
    'LinkedIn ': 'https://linkedin.com/company/acme',
    'Facebook ': 'https://facebook.com/acme',
    'Founded': '2010',
    'Description': 'An early-stage venture fund.',
    'Focuses': 'AI, Fintech, SaaS',
    'Location': 'San Francisco',
    'Portfolio': 'CompanyA, CompanyB',
    ...overrides,
  };
}

describe('transformInvestorData', () => {
  it('returns an empty array for empty input', () => {
    expect(transformInvestorData([])).toEqual([]);
  });

  it('assigns 1-based sequential ids', () => {
    const result = transformInvestorData([makeRaw(), makeRaw(), makeRaw()]);
    expect(result.map((r) => r.id)).toEqual(['1', '2', '3']);
  });

  it('maps all known fields through', () => {
    const [investor] = transformInvestorData([makeRaw()]);
    expect(investor).toMatchObject({
      name: 'Acme Ventures',
      investments: '120',
      exits: '30',
      exitRate: '25%',
      contactPerson: 'Jane Doe',
      email: 'jane@acme.vc',
      homepage: 'https://acme.vc',
      linkedin: 'https://linkedin.com/company/acme',
      facebook: 'https://facebook.com/acme',
      founded: '2010',
      description: 'An early-stage venture fund.',
      location: 'San Francisco',
    });
  });

  it('splits and trims the Focuses field into an array', () => {
    const [investor] = transformInvestorData([makeRaw({ Focuses: ' AI ,  Fintech,SaaS ' })]);
    expect(investor.focuses).toEqual(['AI', 'Fintech', 'SaaS']);
  });

  it('splits and trims the Portfolio field into an array', () => {
    const [investor] = transformInvestorData([makeRaw({ Portfolio: 'CompanyA,  CompanyB ,CompanyC' })]);
    expect(investor.portfolio).toEqual(['CompanyA', 'CompanyB', 'CompanyC']);
  });

  it('filters out empty entries produced by trailing/leading commas', () => {
    const [investor] = transformInvestorData([makeRaw({ Focuses: 'AI,,  ,Fintech' })]);
    expect(investor.focuses).toEqual(['AI', 'Fintech']);
  });

  it('returns an empty array for blank Focuses/Portfolio', () => {
    const [investor] = transformInvestorData([makeRaw({ Focuses: '', Portfolio: '' })]);
    expect(investor.focuses).toEqual([]);
    expect(investor.portfolio).toEqual([]);
  });

  it('falls back to defaults for missing/falsy fields', () => {
    const [investor] = transformInvestorData([
      makeRaw({
        'Fund Name': '',
        'Investments': '',
        'Exits': '',
        'ExitRate': '',
        'Contact Person': '',
        'Email': '',
        'Homepage': '',
        'LinkedIn ': '',
        'Facebook ': '',
        'Founded': '',
        'Description': '',
        'Location': '',
      }),
    ]);
    expect(investor).toMatchObject({
      name: 'Unknown Fund',
      investments: '0',
      exits: '0',
      exitRate: '0%',
      contactPerson: 'Not Available',
      email: 'Not Available',
      homepage: 'Not Available',
      linkedin: 'Not Available',
      facebook: 'Not Available',
      founded: '0',
      description: 'No description available',
      location: 'Unknown',
    });
  });

  it('recovers gracefully when an entry throws during mapping', () => {
    const badEntry = null as unknown as RawInvestorData;
    const result = transformInvestorData([makeRaw(), badEntry]);

    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('Acme Ventures');
    expect(result[1]).toMatchObject({
      id: '2',
      name: 'Error Loading Fund',
      description: 'Error loading fund data',
      focuses: [],
      portfolio: [],
    });
  });

  it('processes multiple rows independently', () => {
    const result = transformInvestorData([
      makeRaw({ 'Fund Name': 'Fund One' }),
      makeRaw({ 'Fund Name': 'Fund Two', Focuses: 'Health' }),
    ]);
    expect(result[0].name).toBe('Fund One');
    expect(result[1].name).toBe('Fund Two');
    expect(result[1].focuses).toEqual(['Health']);
  });
});
