import { Label } from "@rights/ui/label";
import { Input } from "@rights/ui/input";
import { Checkbox } from "@rights/ui/checkbox";
import { ContractData } from "./contract";

interface ContractorStatusFormProps {
  contractData: ContractData;
  updateContractData: (field: string, value: any) => void;
}

const ContractorStatusForm = ({ contractData, updateContractData }: ContractorStatusFormProps) => {
  const statusOptions = [
    { id: "perform-for-others", label: "Contractor has the right to perform services for others" },
    { id: "control-methods", label: "Contractor controls means, manner, and method of work" },
    { id: "hire-assistants", label: "Contractor can hire assistants or subcontractors" },
    { id: "no-uniforms", label: "No uniforms required from Client" },
    { id: "contractor-provides-assistants", label: "Contractor provides all assistants" },
    { id: "no-training", label: "No training required from Client" },
    { id: "not-full-time", label: "Not required to devote full time to this work" },
  ];

  const insuranceOptions = [
    { id: "auto", label: "Automobile liability insurance" },
    { id: "general", label: "General liability insurance" },
  ];

  const toggleStatusOption = (optionId: string) => {
    const currentStatus = contractData.contractorStatus;
    const newStatus = currentStatus.includes(optionId)
      ? currentStatus.filter(id => id !== optionId)
      : [...currentStatus, optionId];
    updateContractData("contractorStatus", newStatus);
  };

  const toggleInsuranceOption = (optionId: string) => {
    const currentInsurance = contractData.insuranceTypes;
    const newInsurance = currentInsurance.includes(optionId)
      ? currentInsurance.filter(id => id !== optionId)
      : [...currentInsurance, optionId];
    updateContractData("insuranceTypes", newInsurance);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label className="text-base font-semibold">Independent Contractor Status (check all that apply)</Label>
        <div className="space-y-3">
          {statusOptions.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox
                id={option.id}
                checked={contractData.contractorStatus.includes(option.id)}
                onCheckedChange={() => toggleStatusOption(option.id)}
              />
              <Label htmlFor={option.id} className="text-sm leading-relaxed">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Label className="text-base font-semibold">Required Insurance Coverage</Label>
        <div className="space-y-3">
          {insuranceOptions.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox
                id={`insurance-${option.id}`}
                checked={contractData.insuranceTypes.includes(option.id)}
                onCheckedChange={() => toggleInsuranceOption(option.id)}
              />
              <Label htmlFor={`insurance-${option.id}`} className="text-sm">
                {option.label}
              </Label>
            </div>
          ))}
        </div>

        {contractData.insuranceTypes.includes("auto") && (
          <div className="space-y-2 ml-6">
            <Label htmlFor="autoInsuranceAmount">Automobile Insurance Minimum Amount</Label>
            <Input
              id="autoInsuranceAmount"
              value={contractData.autoInsuranceAmount}
              onChange={(e) => updateContractData("autoInsuranceAmount", e.target.value)}
              placeholder="e.g., $1,000,000"
            />
          </div>
        )}

        {contractData.insuranceTypes.includes("general") && (
          <div className="space-y-2 ml-6">
            <Label htmlFor="generalInsuranceAmount">General Liability Insurance Minimum Amount</Label>
            <Input
              id="generalInsuranceAmount"
              value={contractData.generalInsuranceAmount}
              onChange={(e) => updateContractData("generalInsuranceAmount", e.target.value)}
              placeholder="e.g., $1,000,000"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ContractorStatusForm;
