/**
 * @fileoverview Dispute Resolution Form Component
 * 
 * A comprehensive form component for selecting and configuring dispute resolution methods
 * in employment and contractor agreements. Provides options for traditional court,
 * mediation, arbitration, and the specialized Rapid Ruling arbitration service.
 * 
 * @features
 * - Multiple dispute resolution options
 * - Rapid Ruling arbitration integration
 * - Customizable arbitration settings
 * - Cost and timeline information
 * - Legal compliance considerations
 * 
 * @props
 * - contractData: Current contract data object
 * - updateContractData: Function to update contract data
 * - contractType: Type of contract (independent-contractor, employee, co-founder)
 * 
 * @author vtempest
 * @version 1.0.0
 * @since 2024
 */

import React from 'react';
import { Label } from "@rights/ui/label";
import { Input } from "@rights/ui/input";
import { Textarea } from "@rights/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@rights/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@rights/ui/card";
import { Badge } from "@rights/ui/badge";
import { Info, AlertCircle, CheckCircle, Clock, DollarSign, Shield } from 'lucide-react';

interface DisputeResolutionFormProps {
  contractData: any;
  updateContractData: (field: string, value: any) => void;
  contractType: 'independent-contractor' | 'employee' | 'co-founder';
}

/**
 * Dispute Resolution Form Component
 * 
 * Provides comprehensive dispute resolution options for all contract types.
 * Includes traditional court, mediation, arbitration, and Rapid Ruling arbitration.
 * 
 * @param props - Component props
 * @returns {JSX.Element} The dispute resolution form
 */
const DisputeResolutionForm: React.FC<DisputeResolutionFormProps> = ({ 
  contractData, 
  updateContractData, 
  contractType 
}) => {
  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  const getDisputeResolutionField = (field: string) => {
    return contractData.disputeResolution?.[field] || '';
  };

  const updateDisputeResolution = (field: string, value: any) => {
    const current = contractData.disputeResolution || {};
    updateContractData('disputeResolution', { ...current, [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Main Dispute Resolution Selection */}
      <div className="space-y-4 text-slate-100">
        <Label className="text-lg font-semibold text-slate-100">Dispute Resolution Method</Label>
        <RadioGroup
          value={getDisputeResolutionField('method')}
          
          onValueChange={(value) => updateDisputeResolution('method', value)}
        >
          <div className="grid gap-4">
            {/* Rapid Ruling Arbitration Option */}
            <Card className="border-2 bg-slate-900 text-slate-100 hover:border-purple-300 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <RadioGroupItem value="rapid-ruling" id="rapid-ruling" className="mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Label htmlFor="rapid-ruling" className="text-base font-medium cursor-pointer text-slate-100">
                        Rapid Ruling Arbitration
                      </Label>
                      <Badge variant="outline" className="text-xs bg-green-900/10 text-green-200">Recommended</Badge>

                      <Badge variant="outline" className="text-xs bg-purple-900/10 text-purple-200">Lowest Cp</Badge>
                    </div>
                    <p className="text-sm text-slate-200 mb-2">
                      100% online arbitration with Mediation and Civil Arbitration, Inc. d/b/a RapidRuling.
                      Resolves disputes in weeks instead of months with transparent cost structure.
                    </p>
                    <div className="flex items-center gap-4 text-xs text-slate-300">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>3-6 weeks</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        <span>$275-$1,200</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ADR Options */}
            <Card className="border-2 bg-slate-900 text-slate-100 hover:border-green-300 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <RadioGroupItem value="mediation" id="mediation" className="mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Label htmlFor="mediation" className="text-base font-medium cursor-pointer text-slate-100">
                        Alternative Dispute Resolution (ADR)
                      </Label>
                    </div>
                    <p className="text-sm text-slate-200 mb-2">
                      Voluntary process where a neutral mediator helps parties reach a mutually acceptable resolution.
                      Faster and less expensive than court.
                    </p>
                    <div className="flex items-center gap-4 text-xs text-slate-300">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>1-3 months</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        <span>$2K-$10K</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Custom Arbitration Option */}
            <Card className="border-2 bg-slate-900 text-slate-100 hover:border-orange-300 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <RadioGroupItem value="custom-arbitration" id="custom-arbitration" className="mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Label htmlFor="custom-arbitration" className="text-base font-medium cursor-pointer text-slate-100">
                        Custom Arbitration
                      </Label>
                      <Badge variant="outline" className="text-xs bg-orange-900/10 text-orange-200">Custom</Badge>
                    </div>
                    <p className="text-sm text-slate-200 mb-2">
                      Custom arbitration with specific rules, location, and arbitrator selection.
                      Flexible but requires more configuration.
                    </p>
                    <div className="flex items-center gap-4 text-xs text-slate-300">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>2-6 months</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        <span>$5K-$25K</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Traditional Court Option */}
            <Card className="border-2 bg-slate-900 text-slate-100 hover:border-blue-300 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <RadioGroupItem value="court" id="court" className="mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Label htmlFor="court" className="text-base font-medium cursor-pointer text-slate-100">
                        Traditional Court System
                      </Label>
                      <Badge variant="outline" className="text-xs bg-slate-800 text-slate-200">Standard</Badge>
                    </div>
                    <p className="text-sm text-slate-200 mb-2">
                      Resolve disputes through the traditional court system. Higher costs and longer timelines,
                      but provides full legal process and appeal rights.
                    </p>
                    <div className="flex items-center gap-4 text-xs text-slate-300">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>6-18 months</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        <span>$10K-$50K+</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </RadioGroup>
      </div>

      {/* Rapid Ruling Specific Configuration */}
      {getDisputeResolutionField('method') === 'rapid-ruling' && (
        <Card className="bg-purple-900/80 border-purple-700">
          <CardHeader>
            <CardTitle className="text-purple-100 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Rapid Ruling Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className=" p-4 rounded-lg border border-purple-700 bg-purple-900/60">
              <h4 className="font-semibold text-purple-100 mb-2">Cost Structure</h4>
              <div className="grid grid-cols-2 gap-4 text-sm text-purple-200">
                <div>
                  <strong>Filing Fees:</strong>
                  <ul className="mt-1 space-y-1 text-white">
                    <li>• Claims up to $50,000: $275</li>
                    <li>• Claims $50K-$100K: $400</li>
                    <li>• Claims $100K-$500K: $600</li>
                    <li>• Claims $500K-$1M: $900</li>
                    <li>• Claims $1M-$1.25M: $1,200</li>
                  </ul>
                </div>
                <div>
                  <strong>Additional Costs:</strong>
                  <ul className="mt-1 space-y-1 text-white">
                    <li>• Arbitrator: $300/hour</li>
                    <li>• Answer Fee: $75-$150</li>
                    <li>• Hearing Request: $500</li>
                    <li>• Motion Fees: $25-$350</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className=" p-4 rounded-lg border border-purple-700 bg-purple-900/60">
              <h4 className="font-semibold text-purple-100 mb-2">Process Timeline</h4>
              <div className="text-sm space-y-2 text-purple-200">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-300" />
                  <span>Initial case submission through eFile Portal</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-300" />
                  <span>Online hearing scheduling (video/phone)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-300" />
                  <span>Final decision within 21-30 days</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-300" />
                  <span>80% agreement rate</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <Label htmlFor="rapidRulingCompanyEmail" className="text-purple-100 font-medium">
                  Company Email for Service
                </Label>
                <Input
                  id="rapidRulingCompanyEmail"
                  type="email"
                  value={getDisputeResolutionField('rapidRulingCompanyEmail')}
                  onChange={(e) => updateDisputeResolution('rapidRulingCompanyEmail', e.target.value)}
                  placeholder="company@example.com"
                  className="mt-1 bg-purple-900/40 text-purple-100 border-purple-700 focus:border-purple-400"
                />
              </div>
              
              <div>
                <Label htmlFor="rapidRulingWorkerEmail" className="text-purple-100 font-medium">
                  {contractType === 'employee' ? 'Employee' : 'Contractor'} Email for Service
                </Label>
                <Input
                  id="rapidRulingWorkerEmail"
                  type="email"
                  value={getDisputeResolutionField('rapidRulingWorkerEmail')}
                  onChange={(e) => updateDisputeResolution('rapidRulingWorkerEmail', e.target.value)}
                  placeholder="worker@example.com"
                  className="mt-1 bg-purple-900/40 text-purple-100 border-purple-700 focus:border-purple-400"
                />
              </div>
            </div>

            <div className="bg-blue-900/80 p-3 rounded-lg border border-blue-700">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-200 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-100">
                  <strong>Rapid Ruling Clause:</strong> This will automatically include the complete Rapid Ruling 
                  arbitration clause in your contract, providing legally binding dispute resolution with 
                  transparent costs and expedited timelines.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Custom Arbitration Configuration */}
      {getDisputeResolutionField('method') === 'custom-arbitration' && (
        <Card className="bg-orange-900/80 border-orange-700">
          <CardHeader>
            <CardTitle className="text-orange-100">Custom Arbitration Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="arbitrationState" className="text-orange-100">State for Arbitration Law</Label>
                <select
                  id="arbitrationState"
                  value={getDisputeResolutionField('arbitrationState')}
                  onChange={(e) => updateDisputeResolution('arbitrationState', e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-orange-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 bg-orange-900/40 text-orange-100"
                >
                  <option value="">Select State...</option>
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <Label htmlFor="arbitrationCounty" className="text-orange-100">County for Arbitration</Label>
                <Input
                  id="arbitrationCounty"
                  value={getDisputeResolutionField('arbitrationCounty')}
                  onChange={(e) => updateDisputeResolution('arbitrationCounty', e.target.value)}
                  placeholder="e.g., Dallas County"
                  className="mt-1 bg-orange-900/40 text-orange-100 border-orange-700 focus:border-orange-400"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="arbitrationRules" className="text-orange-100">Arbitration Rules</Label>
              <Textarea
                id="arbitrationRules"
                value={getDisputeResolutionField('arbitrationRules')}
                onChange={(e) => updateDisputeResolution('arbitrationRules', e.target.value)}
                placeholder="Specify arbitration rules, procedures, and any special requirements..."
                rows={3}
                className="mt-1 bg-orange-900/40 text-orange-100 border-orange-700 focus:border-orange-400"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Traditional Court Configuration */}
      {getDisputeResolutionField('method') === 'court' && (
        <Card className="bg-blue-900/80 border-blue-700">
          <CardHeader>
            <CardTitle className="text-blue-100">Court Jurisdiction Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="courtState" className="text-blue-100">Governing Law State</Label>
                <select
                  id="courtState"
                  value={getDisputeResolutionField('courtState')}
                  onChange={(e) => updateDisputeResolution('courtState', e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-900/40 text-blue-100"
                >
                  <option value="">Select State...</option>
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <Label htmlFor="courtCounty" className="text-blue-100">Court County</Label>
                <Input
                  id="courtCounty"
                  value={getDisputeResolutionField('courtCounty')}
                  onChange={(e) => updateDisputeResolution('courtCounty', e.target.value)}
                  placeholder="e.g., Alameda County"
                  className="mt-1 bg-blue-900/40 text-blue-100 border-blue-700 focus:border-blue-400"
                />
              </div>
            </div>
            
            <div className="bg-yellow-900/80 p-3 rounded-lg border border-yellow-700">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-200 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-yellow-100">
                  <strong>Note:</strong> Traditional court proceedings typically involve higher costs, 
                  longer timelines, and more complex procedures. Consider mediation or arbitration 
                  for faster, more cost-effective dispute resolution.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Additional Dispute Resolution Terms */}
      <div className="space-y-3">
        <Label htmlFor="additionalDisputeTerms" className="text-slate-200">Additional Dispute Resolution Terms (Optional)</Label>
        <Textarea
          id="additionalDisputeTerms"
          value={getDisputeResolutionField('additionalTerms')}
          onChange={(e) => updateDisputeResolution('additionalTerms', e.target.value)}
          placeholder="Any additional terms, conditions, or procedures for dispute resolution..."
          rows={3}
          className="bg-slate-800 text-slate-100 border-slate-700 focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default DisputeResolutionForm; 