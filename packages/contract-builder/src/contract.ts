export interface ContractData {
  clientName: string;
  clientAddress: string;
  contractorName: string;
  contractorAddress: string;
  contractType: "independent-contractor" | "employee" | "co-founder";
  services: string;
  useExhibitA: boolean;
  paymentRates: string;
  expenseType: "contractor-pays" | "client-pays" | "shared";
  reimbursableExpenses: string;
  contractorStatus: string[];
  insuranceTypes: string[];
  autoInsuranceAmount: string;
  generalInsuranceAmount: string;
  termEndDate: string;
  terminationType: "reasonable-cause" | "no-cause" | "mutual";
  terminationNotice: string;
  disputeResolution: "court" | "arbitration" | "mediation" | "rapid-ruling";
  confidentialityOther: string;
  allowAssignment: boolean;
  clientSignature?: string | null;
  contractorSignature?: string | null;
  coFounderSignatures?: string[];
  companySignature?: string | null;
  signedDate?: string;
  
  // NDA Specific
  includeNDA?: boolean;
  ndaDuration?: string;
  permittedDisclosures?: string;
  returnPeriod?: string;
  ndaRemedies?: string;
  
  // Employee Specific
  employerName?: string;
  employerType?: "business" | "individual";
  employeeName?: string;
  employeePosition?: string;
  businessDescription?: string;
  employmentStartDate?: string;
  terminationNoticeDays?: string;
  employeeSalary?: string;
  salaryFrequency?: "weekly" | "biweekly" | "semi-monthly" | "monthly";
  includeSigningBonus?: boolean;
  signingBonusAmount?: string;
  signingBonusDays?: string;
  includePerformanceBonus?: boolean;
  performanceBonusDescription?: string;
  medicalBenefits?: boolean;
  dentalBenefits?: boolean;
  stockOptions?: boolean;
  stockOptionsYears?: string;
  includeSeverance?: boolean;
  severanceAmount?: string;
  includeNonCompetition?: boolean;
  nonCompetitionYears?: string;
  nonCompetitionMiles?: string;
  governingState?: string;
  
  // Dispute Resolution Fields
  rapidRulingCompanyEmail?: string;
  rapidRulingCoFounderEmail?: string;
  arbitrationState?: string;
  arbitrationCounty?: string;
  courtCounty?: string;
  
  // Existing Employee Fields
  employeeType?: "full-time" | "part-time" | "temporary";
  salary?: string;
  benefits?: string[];
  probationPeriod?: string;
  workSchedule?: string;
  coFounders?: CoFounderData[];
  companyName?: string;
  jurisdiction?: string;
  initialFunding?: string;
  equityDistribution?: EquityDistribution[];
  vestingSchedule?: VestingSchedule;
  fundingThresholds?: FundingThreshold[];
}

export interface CoFounderData {
  name: string;
  role: string;
  equityPercentage: number;
  initialResponsibilities: string;
}

export interface EquityDistribution {
  coFounderName: string;
  percentage: number;
  shares: number;
}

export interface VestingSchedule {
  vestingPeriod: number;
  cliffPeriod: number;
  vestingType: "linear" | "cliff-then-linear" | "milestone";
  milestones?: VestingMilestone[];
}

export interface VestingMilestone {
  description: string;
  equityPercentage: number;
  conditions: string;
}

export interface FundingThreshold {
  amount: string;
  compensation: string;
  benefits: string[];
} 