import { Investor, RawInvestorData } from './types';
import rawData from './vc-rank.json';

export function transformInvestorData(rawData: RawInvestorData[]): Investor[] {
  console.log('Transforming investor data:', rawData.length, 'items');

  return rawData.map((item, index) => {
    try {
      return {
        id: (index + 1).toString(),
        name: item["Fund Name"] || 'Unknown Fund',
        investments: item["Investments"] || '0',
        exits: item["Exits"] || '0',
        exitRate: item["ExitRate"] || '0%',
        contactPerson: item["Contact Person"] || 'Not Available',
        email: item["Email"] || 'Not Available',
        homepage: item["Homepage"] || 'Not Available',
        linkedin: item["LinkedIn "] || 'Not Available',
        facebook: item["Facebook "] || 'Not Available',
        founded: item["Founded"] || '0',
        description: item["Description"] || 'No description available',
        focuses: (item["Focuses"] || '').split(',').map(focus => focus.trim()).filter(focus => focus.length > 0),
        location: item["Location"] || 'Unknown',
        portfolio: (item["Portfolio"] || '').split(',').map(company => company.trim()).filter(company => company.length > 0)
      };
    } catch (error) {
      console.error('Error transforming investor at index', index, ':', error, item);
      return {
        id: (index + 1).toString(),
        name: 'Error Loading Fund',
        investments: '0',
        exits: '0',
        exitRate: '0%',
        contactPerson: 'Not Available',
        email: 'Not Available',
        homepage: 'Not Available',
        linkedin: 'Not Available',
        facebook: 'Not Available',
        founded: '0',
        description: 'Error loading fund data',
        focuses: [],
        location: 'Unknown',
        portfolio: []
      };
    }
  });
}

export const investors: Investor[] = transformInvestorData(rawData);