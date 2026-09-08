"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@rights/ui/card';
import { Button } from '@rights/ui/button';
import { Label } from '@rights/ui/label';
import { Input } from '@rights/ui/input';
import SignaturePadComponent from './SignaturePad';
import { ContractData } from './contract';
import { Calendar, CheckCircle } from 'lucide-react';

interface SignatureFormProps {
  contractData: ContractData;
  updateContractData: (field: string, value: any) => void;
}

const SignatureForm: React.FC<SignatureFormProps> = ({ contractData, updateContractData }) => {
  const handleClientSignatureChange = (signatureData: string | null) => {
    updateContractData('clientSignature', signatureData);
  };

  const handleContractorSignatureChange = (signatureData: string | null) => {
    updateContractData('contractorSignature', signatureData);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateContractData('signedDate', e.target.value);
  };

  const isFormComplete = () => {
    return contractData.clientSignature && 
           contractData.contractorSignature && 
           contractData.signedDate;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-slate-100 mb-2">
          Digital Signatures
        </h3>
        <p className="text-slate-300">
          Both parties must sign this agreement to make it legally binding
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Client Signature */}
        <SignaturePadComponent
          onSignatureChange={handleClientSignatureChange}
          label={`${contractData.clientName || 'Client'} Signature`}
          required={true}
        />

        {/* Contractor Signature */}
        <SignaturePadComponent
          onSignatureChange={handleContractorSignatureChange}
          label={`${contractData.contractorName || 'Contractor'} Signature`}
          required={true}
        />
      </div>

      {/* Date of Signing */}
      <Card className="bg-slate-900 border border-slate-800 shadow-lg">
        <CardHeader>
          <CardTitle className="text-slate-100 text-lg flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Date of Signing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="signedDate" className="text-slate-200">
              Date when both parties sign this agreement
            </Label>
            <Input
              id="signedDate"
              type="date"
              value={contractData.signedDate || ''}
              onChange={handleDateChange}
              className="bg-slate-800 border-slate-700 text-slate-100 focus:border-blue-500"
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Completion Status */}
      <Card className={`border-2 ${isFormComplete() ? 'border-green-600 bg-green-900/20' : 'border-slate-700 bg-slate-900'}`}>
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            {isFormComplete() ? (
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

      {/* Instructions */}
      <Card className="bg-slate-900/50 border border-slate-700">
        <CardContent className="pt-6">
          <h4 className="text-slate-200 font-semibold mb-3">Instructions:</h4>
          <ul className="text-slate-300 text-sm space-y-2">
            <li>• Use your mouse, finger, or stylus to sign in the designated areas</li>
            <li>• Both client and contractor signatures are required</li>
            <li>• Use the Clear button to start over if needed</li>
            <li>• Use the Undo button to remove the last stroke</li>
            <li>• The Download button allows you to save your signature as an image</li>
            <li>• Select the date when both parties will sign this agreement</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignatureForm; 