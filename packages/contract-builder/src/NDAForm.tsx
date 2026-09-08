"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@rights/ui/card';
import { Label } from '@rights/ui/label';
import { Input } from '@rights/ui/input';
import { Textarea } from '@rights/ui/textarea';
import { ContractData } from './contract';
import { Shield, Clock, FileText, AlertTriangle, Plus, X } from 'lucide-react';
import { Button } from '@rights/ui/button';

interface NDAFormProps {
  contractData: ContractData;
  updateContractData: (field: string, value: any) => void;
}

const NDAForm: React.FC<NDAFormProps> = ({ contractData, updateContractData }) => {
  const handleAddConfidentialInfo = () => {
    const newInfo = prompt('Enter confidential information category (e.g., Trade Secrets, Customer Lists):');
    if (newInfo && newInfo.trim()) {
      const currentInfo = contractData.confidentialityOther ? contractData.confidentialityOther.split(', ') : [];
      const updatedInfo = [...currentInfo, newInfo.trim()];
      updateContractData('confidentialityOther', updatedInfo.join(', '));
    }
  };

  const handleRemoveConfidentialInfo = (index: number) => {
    const currentInfo = contractData.confidentialityOther ? contractData.confidentialityOther.split(', ') : [];
    const updatedInfo = currentInfo.filter((_, i) => i !== index);
    updateContractData('confidentialityOther', updatedInfo.join(', '));
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-slate-100 mb-2">
          Non-Disclosure Agreement
        </h3>
        <p className="text-slate-300">
          Define confidentiality terms, protected information, and disclosure restrictions
        </p>
      </div>

      {/* Confidential Information Definition */}
      <Card className="bg-slate-900 border border-slate-800">
        <CardHeader>
          <CardTitle className="text-slate-100 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Definition of Confidential Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-slate-200">Confidential Information Includes:</Label>
            <div className="space-y-2">
              {(contractData.confidentialityOther ? contractData.confidentialityOther.split(', ') : []).map((info, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex-1 bg-slate-800 border border-slate-700 rounded px-3 py-2 text-slate-200">
                    {info}
                  </div>
                  <Button
                    type="button"
                    onClick={() => handleRemoveConfidentialInfo(index)}
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
                onClick={handleAddConfidentialInfo}
                variant="outline"
                className="w-full bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Confidential Information Category
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* NDA Duration */}
      <Card className="bg-slate-900 border border-slate-800">
        <CardHeader>
          <CardTitle className="text-slate-100 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Duration of Confidentiality Obligations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="ndaDuration" className="text-slate-200">
              Confidentiality Period After Contract Termination
            </Label>
            <Input
              id="ndaDuration"
              value={contractData.ndaDuration || ''}
              onChange={(e) => updateContractData('ndaDuration', e.target.value)}
              placeholder="e.g., 5 years, 10 years, indefinitely"
              className="bg-slate-800 border-slate-700 text-slate-100 focus:border-blue-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Permitted Disclosures */}
      <Card className="bg-slate-900 border border-slate-800">
        <CardHeader>
          <CardTitle className="text-slate-100 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Permitted Disclosures
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="permittedDisclosures" className="text-slate-200">
              Exceptions to Confidentiality (Optional)
            </Label>
            <Textarea
              id="permittedDisclosures"
              value={contractData.permittedDisclosures || ''}
              onChange={(e) => updateContractData('permittedDisclosures', e.target.value)}
              placeholder="e.g., Information already in public domain, information required by law, information independently developed"
              rows={4}
              className="bg-slate-800 border-slate-700 text-slate-100 focus:border-blue-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Return of Materials */}
      <Card className="bg-slate-900 border border-slate-800">
        <CardHeader>
          <CardTitle className="text-slate-100 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Return of Confidential Materials
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="returnPeriod" className="text-slate-200">
              Time Period for Return of Materials
            </Label>
            <Input
              id="returnPeriod"
              value={contractData.returnPeriod || ''}
              onChange={(e) => updateContractData('returnPeriod', e.target.value)}
              placeholder="e.g., 30 days, immediately upon termination"
              className="bg-slate-800 border-slate-700 text-slate-100 focus:border-blue-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Remedies */}
      <Card className="bg-slate-900 border border-slate-800">
        <CardHeader>
          <CardTitle className="text-slate-100 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Remedies for Breach
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="ndaRemedies" className="text-slate-200">
              Available Remedies (Optional)
            </Label>
            <Textarea
              id="ndaRemedies"
              value={contractData.ndaRemedies || ''}
              onChange={(e) => updateContractData('ndaRemedies', e.target.value)}
              placeholder="e.g., Injunctive relief, monetary damages, attorney fees"
              rows={3}
              className="bg-slate-800 border-slate-700 text-slate-100 focus:border-blue-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Standard NDA Provisions */}
      <Card className="bg-slate-900/50 border border-slate-700">
        <CardContent className="pt-6">
          <h4 className="text-slate-200 font-semibold mb-3">Standard NDA Provisions Included:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div className="text-slate-400">• Definition of confidential information</div>
            <div className="text-slate-400">• Non-disclosure obligations</div>
            <div className="text-slate-400">• Non-use restrictions</div>
            <div className="text-slate-400">• Return of materials</div>
            <div className="text-slate-400">• Permitted disclosures</div>
            <div className="text-slate-400">• Duration of obligations</div>
            <div className="text-slate-400">• Remedies for breach</div>
            <div className="text-slate-400">• Injunctive relief</div>
            <div className="text-slate-400">• Survival of obligations</div>
            <div className="text-slate-400">• Governing law</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NDAForm; 