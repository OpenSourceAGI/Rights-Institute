export interface Investor {
  id: string;
  name: string;
  investments: string;
  exits: string;
  exitRate: string;
  contactPerson: string;
  email: string;
  homepage: string;
  linkedin: string;
  facebook: string;
  founded: string;
  description: string;
  focuses: string[];
  location: string;
  portfolio: string[];
}

export interface RawInvestorData {
  "Fund Name": string;
  "Investments": string;
  "Exits": string;
  "ExitRate": string;
  "Contact Person": string;
  "Email": string;
  "Homepage": string;
  "LinkedIn ": string;
  "Facebook ": string;
  "Founded": string;
  "Description": string;
  "Focuses": string;
  "Location": string;
  "Portfolio": string;
} 