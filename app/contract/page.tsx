/**
 * @fileoverview Contractor Form Page
 * 
 * Main page for creating independent contractor, employee, and co-founder agreements.
 * Provides a unified interface for different types of employment contracts.
 * 
 * @features
 * - Tabbed interface for different agreement types
 * - Independent Contractor Agreement Builder
 * - Employee Agreement Editor
 * - Co-Founders Agreement Builder
 * - Responsive design
 * 
 * @author vtempest
 * @version 1.0.0
 * @since 2024
 */

"use client";

import React, { useState } from 'react';
import ContractBuilder from '@rights/contract-builder/ContractBuilder';
import EmploymentAgreementEditor from '@rights/contract-builder/EmployeeAgreement';
import CoFoundersForm from '@rights/contract-builder/CoFoundersForm';

/**
 * Contractor Form Page Component
 * 
 * Main page that provides access to contractor, employee, and co-founder agreement builders.
 * Uses a unified tab interface to switch between different agreement types.
 * 
 * @returns {JSX.Element} The main contractor form page
 */
export default function ContractorFormPage() {
  const [activeTab, setActiveTab] = useState<'contractor' | 'employee' | 'co-founder'>('contractor');

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4">
      <div className="max-w-6xl mx-auto">
      

        {/* Unified Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-1 rounded-lg bg-slate-800 p-1">
            <button
              onClick={() => setActiveTab('contractor')}
              className={`px-6 py-3 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'contractor'
                  ? 'bg-slate-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              Independent Contractor
            </button>
            <button
              onClick={() => setActiveTab('employee')}
              className={`px-6 py-3 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'employee'
                  ? 'bg-slate-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              Employee Agreement
            </button>
            <button
              onClick={() => setActiveTab('co-founder')}
              className={`px-6 py-3 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'co-founder'
                  ? 'bg-slate-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              Co-Founders Agreement
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg">
          {activeTab === 'contractor' ? (
            <ContractBuilder />
          ) : activeTab === 'employee' ? (
            <EmploymentAgreementEditor />
          ) : (
            <div className="p-6">
              <CoFoundersForm 
                contractData={{
                  clientName: "",
                  clientAddress: "",
                  contractorName: "",
                  contractorAddress: "",
                  contractType: "co-founder",
                  services: "",
                  useExhibitA: false,
                  paymentRates: "",
                  expenseType: "contractor-pays",
                  reimbursableExpenses: "",
                  contractorStatus: [],
                  insuranceTypes: [],
                  autoInsuranceAmount: "",
                  generalInsuranceAmount: "",
                  termEndDate: "",
                  terminationType: "reasonable-cause",
                  terminationNotice: "",
                  disputeResolution: "court",
                  confidentialityOther: "",
                  allowAssignment: false,
                  coFounders: [],
                  companyName: "",
                  jurisdiction: "",
                  initialFunding: "",
                  equityDistribution: [],
                  vestingSchedule: {
                    vestingPeriod: 4,
                    cliffPeriod: 1,
                    vestingType: "linear"
                  },
                  fundingThresholds: []
                }} 
                updateContractData={() => {}} 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 