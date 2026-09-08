"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@rights/ui/card';
import { Label } from '@rights/ui/label';
import { Input } from '@rights/ui/input';
import { Textarea } from '@rights/ui/textarea';
import { ContractData } from './contract';
import { Calendar, DollarSign, Shield, Clock, Plus, X } from 'lucide-react';
import { Button } from '@rights/ui/button';

interface EmployeeFormProps {
  contractData: ContractData;
  updateContractData: (field: string, value: any) => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ contractData, updateContractData }) => {
  const handleBenefitAdd = () => {
    const newBenefit = prompt('Enter benefit (e.g., Health Insurance, 401k, PTO):');
    if (newBenefit && newBenefit.trim()) {
      const currentBenefits = contractData.benefits || [];
      updateContractData('benefits', [...currentBenefits, newBenefit.trim()]);
    }
  };

  const handleBenefitRemove = (index: number) => {
    const currentBenefits = contractData.benefits || [];
    const newBenefits = currentBenefits.filter((_, i) => i !== index);
    updateContractData('benefits', newBenefits);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-slate-100 mb-2">
          Employee Agreement Details
        </h3>
        <p className="text-slate-300">
          Define the employment terms, compensation, and benefits for this position
        </p>
      </div>

      {/* Employment Type */}
      <Card className="bg-slate-900 border border-slate-800">
        <CardHeader>
          <CardTitle className="text-slate-100 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Employment Type
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['full-time', 'part-time', 'temporary'].map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={type}
                  name="employeeType"
                  value={type}
                  checked={contractData.employeeType === type}
                  onChange={(e) => updateContractData('employeeType', e.target.value)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                />
                <Label htmlFor={type} className="text-slate-200 capitalize">
                  {type.replace('-', ' ')}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compensation */}
      <Card className="bg-slate-900 border border-slate-800">
        <CardHeader>
          <CardTitle className="text-slate-100 flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Compensation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="salary" className="text-slate-200">
              Annual Salary or Hourly Rate
            </Label>
            <Input
              id="salary"
              value={contractData.salary || ''}
              onChange={(e) => updateContractData('salary', e.target.value)}
              placeholder="e.g., $50,000 annually or $25/hour"
              className="bg-slate-800 border-slate-700 text-slate-100 focus:border-blue-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Work Schedule */}
      <Card className="bg-slate-900 border border-slate-800">
        <CardHeader>
          <CardTitle className="text-slate-100 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Work Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="workSchedule" className="text-slate-200">
              Work Schedule and Hours
            </Label>
            <Textarea
              id="workSchedule"
              value={contractData.workSchedule || ''}
              onChange={(e) => updateContractData('workSchedule', e.target.value)}
              placeholder="e.g., Monday-Friday, 9 AM - 5 PM, 40 hours per week"
              rows={3}
              className="bg-slate-800 border-slate-700 text-slate-100 focus:border-blue-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Probation Period */}
      <Card className="bg-slate-900 border border-slate-800">
        <CardHeader>
          <CardTitle className="text-slate-100 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Probation Period
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="probationPeriod" className="text-slate-200">
              Probation Period Duration
            </Label>
            <Input
              id="probationPeriod"
              value={contractData.probationPeriod || ''}
              onChange={(e) => updateContractData('probationPeriod', e.target.value)}
              placeholder="e.g., 90 days, 6 months"
              className="bg-slate-800 border-slate-700 text-slate-100 focus:border-blue-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Benefits */}
      <Card className="bg-slate-900 border border-slate-800">
        <CardHeader>
          <CardTitle className="text-slate-100 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Employee Benefits
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-slate-200">Benefits Package</Label>
            <div className="space-y-2">
              {(contractData.benefits || []).map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex-1 bg-slate-800 border border-slate-700 rounded px-3 py-2 text-slate-200">
                    {benefit}
                  </div>
                  <Button
                    type="button"
                    onClick={() => handleBenefitRemove(index)}
                    variant="outline"
                    size="sm"
                    className="bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={handleBenefitAdd}
                variant="outline"
                className="w-full bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Benefit
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* NDA Section */}
      <Card className="bg-slate-900 border border-slate-800">
        <CardHeader>
          <CardTitle className="text-slate-100 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Non-Disclosure Agreement
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-slate-200">Include NDA Provisions</Label>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="includeNDA"
                checked={contractData.includeNDA || false}
                onChange={(e) => updateContractData('includeNDA', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
              />
              <Label htmlFor="includeNDA" className="text-slate-200">
                Include comprehensive NDA provisions in this employment agreement
              </Label>
            </div>
          </div>
          
          {contractData.includeNDA && (
            <div className="space-y-4 mt-4 p-4 bg-slate-800 rounded-lg">
              <div className="space-y-2">
                <Label htmlFor="ndaDuration" className="text-slate-200">NDA Duration</Label>
                <Input
                  id="ndaDuration"
                  value={contractData.ndaDuration || ''}
                  onChange={(e) => updateContractData('ndaDuration', e.target.value)}
                  placeholder="e.g., 5 years, 10 years, indefinitely"
                  className="bg-slate-700 border-slate-600 text-slate-100"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ndaRemedies" className="text-slate-200">Remedies for Breach</Label>
                <Textarea
                  id="ndaRemedies"
                  value={contractData.ndaRemedies || ''}
                  onChange={(e) => updateContractData('ndaRemedies', e.target.value)}
                  placeholder="e.g., Injunctive relief, monetary damages, attorney fees"
                  rows={2}
                  className="bg-slate-700 border-slate-600 text-slate-100"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Common Benefits Suggestions */}
      <Card className="bg-slate-900/50 border border-slate-700">
        <CardContent className="pt-6">
          <h4 className="text-slate-200 font-semibold mb-3">Common Employee Benefits:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div className="text-slate-400">• Health Insurance</div>
            <div className="text-slate-400">• Dental Insurance</div>
            <div className="text-slate-400">• Vision Insurance</div>
            <div className="text-slate-400">• 401(k) Retirement Plan</div>
            <div className="text-slate-400">• Paid Time Off (PTO)</div>
            <div className="text-slate-400">• Sick Leave</div>
            <div className="text-slate-400">• Parental Leave</div>
            <div className="text-slate-400">• Professional Development</div>
            <div className="text-slate-400">• Gym Membership</div>
            <div className="text-slate-400">• Commuter Benefits</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeForm; 