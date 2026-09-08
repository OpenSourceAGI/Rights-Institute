"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@rights/ui/card';
import { Label } from '@rights/ui/label';
import { Input } from '@rights/ui/input';
import { Textarea } from '@rights/ui/textarea';
import { Button } from '@rights/ui/button';
import { ContractData, CoFounderData, VestingSchedule, FundingThreshold } from './contract';
import { Users, Percent, Calendar, DollarSign, Plus, X, TrendingUp, Shield, CheckCircle } from 'lucide-react';
import SignaturePadComponent from './SignaturePad';

interface CoFoundersFormProps {
  contractData: ContractData;
  updateContractData: (field: string, value: any) => void;
}

const CoFoundersForm: React.FC<CoFoundersFormProps> = ({ contractData, updateContractData }) => {
  const [newCoFounder, setNewCoFounder] = useState({
    name: '',
    role: '',
    equityPercentage: 0,
    initialResponsibilities: ''
  });

  const handleAddCoFounder = () => {
    if (newCoFounder.name && newCoFounder.role && newCoFounder.equityPercentage > 0) {
      const currentCoFounders = contractData.coFounders || [];
      updateContractData('coFounders', [...currentCoFounders, { ...newCoFounder }]);
      setNewCoFounder({ name: '', role: '', equityPercentage: 0, initialResponsibilities: '' });
    }
  };

  const handleRemoveCoFounder = (index: number) => {
    const currentCoFounders = contractData.coFounders || [];
    const newCoFounders = currentCoFounders.filter((_, i) => i !== index);
    updateContractData('coFounders', newCoFounders);
  };

  const handleAddFundingThreshold = () => {
    const amount = prompt('Enter funding amount (e.g., $250,000):');
    const compensation = prompt('Enter compensation at this threshold:');
    if (amount && compensation) {
      const currentThresholds = contractData.fundingThresholds || [];
      updateContractData('fundingThresholds', [...currentThresholds, {
        amount: amount.trim(),
        compensation: compensation.trim(),
        benefits: []
      }]);
    }
  };

  const totalEquity = (contractData.coFounders || []).reduce((sum, cf) => sum + cf.equityPercentage, 0);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <img 
            src="https://i.imgur.com/EHLfpFb.jpeg" 
            alt="Co-Founders Agreement" 
            className="w-full max-w-4xl h-48 rounded-xl object-cover shadow-lg border-2 border-slate-700"
          />
        </div>
      </div>

      {/* Company Information */}
      <Card className="bg-slate-900 border border-slate-800">
        <CardHeader>
          <CardTitle className="text-slate-100 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Company Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-slate-200">Company Name</Label>
              <Input
                id="companyName"
                value={contractData.companyName || ''}
                onChange={(e) => updateContractData('companyName', e.target.value)}
                placeholder="e.g., TechStartup Inc."
                className="bg-slate-800 border-slate-700 text-slate-100 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jurisdiction" className="text-slate-200">Jurisdiction</Label>
              <Input
                id="jurisdiction"
                value={contractData.jurisdiction || ''}
                onChange={(e) => updateContractData('jurisdiction', e.target.value)}
                placeholder="e.g., Delaware, USA"
                className="bg-slate-800 border-slate-700 text-slate-100 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="initialFunding" className="text-slate-200">Initial Funding Target</Label>
            <Input
              id="initialFunding"
              value={contractData.initialFunding || ''}
              onChange={(e) => updateContractData('initialFunding', e.target.value)}
              placeholder="e.g., $250,000"
              className="bg-slate-800 border-slate-700 text-slate-100 focus:border-blue-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Co-Founders */}
      <Card className="bg-slate-900 border border-slate-800">
        <CardHeader>
          <CardTitle className="text-slate-100 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Co-Founders
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Existing Co-Founders */}
          {(contractData.coFounders || []).map((coFounder, index) => (
            <div key={index} className="bg-slate-800 border border-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-slate-200 font-semibold">{coFounder.name}</h4>
                <Button
                  type="button"
                  onClick={() => handleRemoveCoFounder(index)}
                  variant="outline"
                  size="sm"
                  className="bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div><span className="text-slate-400">Role:</span> {coFounder.role}</div>
                <div><span className="text-slate-400">Equity:</span> {coFounder.equityPercentage}%</div>
                <div><span className="text-slate-400">Responsibilities:</span> {coFounder.initialResponsibilities}</div>
              </div>
            </div>
          ))}

          {/* Add New Co-Founder */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <h4 className="text-slate-200 font-semibold mb-3">Add New Co-Founder</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-slate-300 text-sm">Name</Label>
                <Input
                  value={newCoFounder.name}
                  onChange={(e) => setNewCoFounder(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Co-Founder Name"
                  className="bg-slate-700 border-slate-600 text-slate-100"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-slate-300 text-sm">Role</Label>
                <Input
                  value={newCoFounder.role}
                  onChange={(e) => setNewCoFounder(prev => ({ ...prev, role: e.target.value }))}
                  placeholder="e.g., CEO, CTO, CMO"
                  className="bg-slate-700 border-slate-600 text-slate-100"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-slate-300 text-sm">Equity Percentage</Label>
                <Input
                  type="number"
                  value={newCoFounder.equityPercentage}
                  onChange={(e) => setNewCoFounder(prev => ({ ...prev, equityPercentage: Number(e.target.value) }))}
                  placeholder="e.g., 33.33"
                  className="bg-slate-700 border-slate-600 text-slate-100"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-slate-300 text-sm">Initial Responsibilities</Label>
                <Input
                  value={newCoFounder.initialResponsibilities}
                  onChange={(e) => setNewCoFounder(prev => ({ ...prev, initialResponsibilities: e.target.value }))}
                  placeholder="e.g., Product development, fundraising"
                  className="bg-slate-700 border-slate-600 text-slate-100"
                />
              </div>
            </div>
            <Button
              type="button"
              onClick={handleAddCoFounder}
              className="w-full mt-3 bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Co-Founder
            </Button>
          </div>

          {/* Equity Summary */}
          {totalEquity > 0 && (
            <div className={`p-3 rounded-lg ${totalEquity === 100 ? 'bg-green-500/10 border border-green-500/20' : 'bg-yellow-500/10 border border-yellow-500/20'}`}>
              <div className="flex items-center justify-between">
                <span className="text-slate-200 font-medium">Total Equity Allocated:</span>
                <span className={`font-bold ${totalEquity === 100 ? 'text-green-400' : 'text-yellow-400'}`}>
                  {totalEquity}%
                </span>
              </div>
              {totalEquity !== 100 && (
                <p className="text-yellow-400 text-sm mt-1">
                  {totalEquity < 100 ? `${100 - totalEquity}% remaining` : `${totalEquity - 100}% over-allocated`}
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Vesting Schedule */}
      <Card className="bg-slate-900 border border-slate-800">
        <CardHeader>
          <CardTitle className="text-slate-100 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Vesting Schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-200">Vesting Period (years)</Label>
              <Input
                type="number"
                value={contractData.vestingSchedule?.vestingPeriod || 4}
                onChange={(e) => updateContractData('vestingSchedule', {
                  ...contractData.vestingSchedule,
                  vestingPeriod: Number(e.target.value)
                })}
                className="bg-slate-800 border-slate-700 text-slate-100"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-200">Cliff Period (months)</Label>
              <Input
                type="number"
                value={contractData.vestingSchedule?.cliffPeriod || 12}
                onChange={(e) => updateContractData('vestingSchedule', {
                  ...contractData.vestingSchedule,
                  cliffPeriod: Number(e.target.value)
                })}
                className="bg-slate-800 border-slate-700 text-slate-100"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-200">Vesting Type</Label>
              <select
                value={contractData.vestingSchedule?.vestingType || 'cliff-then-linear'}
                onChange={(e) => updateContractData('vestingSchedule', {
                  ...contractData.vestingSchedule,
                  vestingType: e.target.value
                })}
                className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-md px-3 py-2"
              >
                <option value="cliff-then-linear">Cliff then Linear</option>
                <option value="linear">Linear</option>
                <option value="milestone">Milestone-based</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Funding Thresholds */}
      <Card className="bg-slate-900 border border-slate-800">
        <CardHeader>
          <CardTitle className="text-slate-100 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Funding-Based Compensation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {(contractData.fundingThresholds || []).map((threshold, index) => (
            <div key={index} className="bg-slate-800 border border-slate-700 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-slate-400 text-sm">Funding Amount:</span>
                    <div className="text-slate-200 font-medium">{threshold.amount}</div>
                  </div>
                  <div>
                    <span className="text-slate-400 text-sm">Compensation:</span>
                    <div className="text-slate-200 font-medium">{threshold.compensation}</div>
                  </div>
                </div>
                <Button
                  type="button"
                  onClick={() => {
                    const newThresholds = (contractData.fundingThresholds || []).filter((_, i) => i !== index);
                    updateContractData('fundingThresholds', newThresholds);
                  }}
                  variant="outline"
                  size="sm"
                  className="bg-red-500/10 border-red-500/20 text-red-400"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
          
          <Button
            type="button"
            onClick={handleAddFundingThreshold}
            variant="outline"
            className="w-full bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Funding Threshold
          </Button>
        </CardContent>
      </Card>

      {/* Dispute Resolution */}
      <Card className="bg-slate-900 border border-slate-800">
        <CardHeader>
          <CardTitle className="text-slate-100 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Dispute Resolution
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Label className="text-slate-200">Dispute Resolution Method</Label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="cofounder_dispute_method"
                  value="rapid-ruling"
                  checked={contractData.disputeResolution === 'rapid-ruling'}
                  onChange={(e) => updateContractData('disputeResolution', e.target.value)}
                  className="mr-2"
                />
                <span className="text-slate-200">Rapid Ruling Arbitration</span>
                <span className="text-slate-400 text-sm ml-2">(3-6 weeks, $275-$1,200)</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="cofounder_dispute_method"
                  value="mediation"
                  checked={contractData.disputeResolution === 'mediation'}
                  onChange={(e) => updateContractData('disputeResolution', e.target.value)}
                  className="mr-2"
                />
                <span className="text-slate-200">Alternative Dispute Resolution (ADR)</span>
                <span className="text-slate-400 text-sm ml-2">(1-3 months, $2K-$10K)</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="cofounder_dispute_method"
                  value="arbitration"
                  checked={contractData.disputeResolution === 'arbitration'}
                  onChange={(e) => updateContractData('disputeResolution', e.target.value)}
                  className="mr-2"
                />
                <span className="text-slate-200">Custom Arbitration</span>
                <span className="text-slate-400 text-sm ml-2">(2-6 months, $5K-$25K)</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="cofounder_dispute_method"
                  value="court"
                  checked={contractData.disputeResolution === 'court'}
                  onChange={(e) => updateContractData('disputeResolution', e.target.value)}
                  className="mr-2"
                />
                <span className="text-slate-200">Traditional Court System</span>
                <span className="text-slate-400 text-sm ml-2">(6-18 months, $10K-$50K+)</span>
              </label>
            </div>
          </div>

          {/* Rapid Ruling Configuration */}
          {contractData.disputeResolution === 'rapid-ruling' && (
            <div className="bg-purple-500/10 border border-purple-500/20 p-4 rounded-lg">
              <h4 className="text-purple-300 font-semibold mb-3">Rapid Ruling Configuration</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-slate-300 text-sm">Company Email for Service</Label>
                  <Input
                    value={contractData.rapidRulingCompanyEmail || ''}
                    onChange={(e) => updateContractData('rapidRulingCompanyEmail', e.target.value)}
                    placeholder="company@example.com"
                    className="bg-slate-700 border-slate-600 text-slate-100"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-slate-300 text-sm">Co-Founder Email for Service</Label>
                  <Input
                    value={contractData.rapidRulingCoFounderEmail || ''}
                    onChange={(e) => updateContractData('rapidRulingCoFounderEmail', e.target.value)}
                    placeholder="cofounder@example.com"
                    className="bg-slate-700 border-slate-600 text-slate-100"
                  />
                </div>
              </div>
              <div className="mt-3 text-sm text-purple-300">
                <strong>Includes:</strong> 100% online arbitration, 21-30 day resolution, transparent cost structure
              </div>
            </div>
          )}

          {/* Custom Arbitration Configuration */}
          {contractData.disputeResolution === 'arbitration' && (
            <div className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-lg">
              <h4 className="text-orange-300 font-semibold mb-3">Custom Arbitration Settings</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-slate-300 text-sm">State for Arbitration Law</Label>
                  <select
                    value={contractData.arbitrationState || ''}
                    onChange={(e) => updateContractData('arbitrationState', e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 text-slate-100 rounded-md px-3 py-2"
                  >
                    <option value="">Select State...</option>
                    <option value="California">California</option>
                    <option value="New York">New York</option>
                    <option value="Delaware">Delaware</option>
                    <option value="Texas">Texas</option>
                    <option value="Florida">Florida</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <Label className="text-slate-300 text-sm">County for Arbitration</Label>
                  <Input
                    value={contractData.arbitrationCounty || ''}
                    onChange={(e) => updateContractData('arbitrationCounty', e.target.value)}
                    placeholder="e.g., San Francisco County"
                    className="bg-slate-700 border-slate-600 text-slate-100"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Traditional Court Configuration */}
          {contractData.disputeResolution === 'court' && (
            <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg">
              <h4 className="text-blue-300 font-semibold mb-3">Court Jurisdiction Settings</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-slate-300 text-sm">Governing Law State</Label>
                  <select
                    value={contractData.governingState || ''}
                    onChange={(e) => updateContractData('governingState', e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 text-slate-100 rounded-md px-3 py-2"
                  >
                    <option value="">Select State...</option>
                    <option value="California">California</option>
                    <option value="New York">New York</option>
                    <option value="Delaware">Delaware</option>
                    <option value="Texas">Texas</option>
                    <option value="Florida">Florida</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <Label className="text-slate-300 text-sm">Court County</Label>
                  <Input
                    value={contractData.courtCounty || ''}
                    onChange={(e) => updateContractData('courtCounty', e.target.value)}
                    placeholder="e.g., San Francisco County"
                    className="bg-slate-700 border-slate-600 text-slate-100"
                  />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Information Card */}
      <Card className="bg-slate-900/50 border border-slate-700">
        <CardContent className="pt-6">
          <h4 className="text-slate-200 font-semibold mb-3">Co-Founders Agreement Features:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div className="text-slate-400">• 4-year vesting with 1-year cliff</div>
            <div className="text-slate-400">• Good leaver/bad leaver provisions</div>
            <div className="text-slate-400">• Intellectual property assignment</div>
            <div className="text-slate-400">• Non-compete and non-solicitation</div>
            <div className="text-slate-400">• Funding-based compensation</div>
            <div className="text-slate-400">• Dispute resolution process</div>
            <div className="text-slate-400">• Death and incapacity clauses</div>
            <div className="text-slate-400">• Amendment and termination procedures</div>
          </div>
        </CardContent>
      </Card>

      {/* Signatures */}
      <Card className="bg-slate-900 border border-slate-800">
        <CardHeader>
          <CardTitle className="text-slate-100 text-lg">
            Digital Signatures
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-slate-300">
            All co-founders must sign this agreement to make it legally binding
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Company Signature */}
            <SignaturePadComponent
              onSignatureChange={(signature) => updateContractData('companySignature', signature)}
              label={`${contractData.companyName || 'Company'} Signature`}
              required={true}
            />

            {/* Co-Founders Signatures */}
            {(contractData.coFounders || []).map((coFounder, index) => (
              <SignaturePadComponent
                key={index}
                onSignatureChange={(signature) => {
                  const signatures = contractData.coFounderSignatures || {};
                  signatures[coFounder.name] = signature;
                  updateContractData('coFounderSignatures', signatures);
                }}
                label={`${coFounder.name} Signature`}
                required={true}
              />
            ))}
          </div>

          {/* Date of Signing */}
          <Card className="bg-slate-800 border border-slate-700">
            <CardContent className="p-4">
              <div className="space-y-2">
                <Label htmlFor="signedDate" className="text-slate-200">
                  Date of Signing
                </Label>
                <Input
                  id="signedDate"
                  type="date"
                  value={contractData.signedDate || ''}
                  onChange={(e) => updateContractData('signedDate', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-slate-100"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Completion Status */}
          <Card className={`border-2 ${(contractData.companySignature && contractData.signedDate) ? 'border-green-600 bg-green-900/20' : 'border-slate-700 bg-slate-900'}`}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                {(contractData.companySignature && contractData.signedDate) ? (
                  <>
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <div>
                      <h4 className="text-green-400 font-semibold">Agreement Ready for Execution</h4>
                      <p className="text-slate-300 text-sm">
                        All signatures and dates have been captured. The agreement is ready to be finalized.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-6 h-6 border-2 border-slate-600 rounded-full" />
                    <div>
                      <h4 className="text-slate-300 font-semibold">Signatures Required</h4>
                      <p className="text-slate-400 text-sm">
                        Please complete all signatures and provide the signing date to finalize the agreement.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoFoundersForm; 