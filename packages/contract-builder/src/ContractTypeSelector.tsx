"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@rights/ui/card';
import { Button } from '@rights/ui/button';
import { ContractData } from './contract';
import { UserCheck, Users, Building2, ArrowRight } from 'lucide-react';

interface ContractTypeSelectorProps {
  contractData: ContractData;
  updateContractData: (field: string, value: any) => void;
}

const ContractTypeSelector: React.FC<ContractTypeSelectorProps> = ({ 
  contractData, 
  updateContractData 
}) => {
  const contractTypes = [
    {
      id: "independent-contractor",
      title: "Independent Contractor",
      description: "For freelancers, consultants, and service providers working on a project basis",
      icon: UserCheck,
      features: [
        "Project-based work",
        "Flexible payment terms",
        "Independent work control",
        "No employee benefits",
        "Tax responsibility on contractor"
      ],
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20"
    },
    {
      id: "employee",
      title: "Employee Agreement",
      description: "For full-time, part-time, or temporary employees with benefits and protections",
      icon: Building2,
      features: [
        "Regular salary/wages",
        "Employee benefits",
        "Tax withholding by employer",
        "Work schedule requirements",
        "Employment protections"
      ],
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20"
    },
    {
      id: "co-founder",
      title: "Co-Founders Agreement",
      description: "For startup founders with equity sharing, vesting schedules, and shared ownership",
      icon: Users,
      features: [
        "Equity distribution",
        "Vesting schedules",
        "Shared decision making",
        "Intellectual property rights",
        "Exit provisions"
      ],
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20"
    }
  ];

  const handleTypeSelect = (type: string) => {
    updateContractData('contractType', type);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-100 mb-4">
          Choose Contract Type
        </h2>
        <p className="text-slate-300 max-w-2xl mx-auto">
          Select the type of agreement that best fits your relationship. Each type has different legal implications, tax considerations, and benefits.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contractTypes.map((type) => (
          <Card 
            key={type.id}
            className={`relative cursor-pointer transition-all duration-300 hover:scale-105 ${
              contractData.contractType === type.id 
                ? `${type.bgColor} ${type.borderColor} border-2` 
                : 'bg-slate-900 border-slate-800 hover:border-slate-700'
            }`}
            onClick={() => handleTypeSelect(type.id)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${type.color}`}>
                  <type.icon className="w-6 h-6 text-white" />
                </div>
                {contractData.contractType === type.id && (
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
              <CardTitle className="text-slate-100 text-xl">
                {type.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-300 text-sm leading-relaxed">
                {type.description}
              </p>
              
              <div className="space-y-2">
                <h4 className="text-slate-200 font-semibold text-sm">Key Features:</h4>
                <ul className="space-y-1">
                  {type.features.map((feature, index) => (
                    <li key={index} className="text-slate-400 text-sm flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-slate-500 rounded-full mt-2 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Button 
                className={`w-full mt-4 bg-gradient-to-r ${type.color} hover:opacity-90 transition-opacity`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleTypeSelect(type.id);
                }}
              >
                Select {type.title}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {contractData.contractType && (
        <Card className="bg-slate-900/50 border border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <div>
                <h3 className="text-green-400 font-semibold">
                  {contractTypes.find(t => t.id === contractData.contractType)?.title} Selected
                </h3>
                <p className="text-slate-300 text-sm">
                  You can now proceed to fill out the specific details for this contract type.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ContractTypeSelector; 