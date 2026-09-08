import { Label } from "@rights/ui/label";
import { Input } from "@rights/ui/input";
import { Textarea } from "@rights/ui/textarea";
import { Button } from "@rights/ui/button";
import { ContractData } from "./contract";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BasicInfoFormProps {
  contractData: ContractData;
  updateContractData: (field: string, value: any) => void;
  onTabChange?: (tab: string) => void;
}

const BasicInfoForm = ({ contractData, updateContractData, onTabChange }: BasicInfoFormProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="clientName">Client Name</Label>
          <Input
            id="clientName"
            value={contractData.clientName}
            onChange={(e) => updateContractData("clientName", e.target.value)}
            placeholder="Enter client/company name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contractorName">Contractor Name</Label>
          <Input
            id="contractorName"
            value={contractData.contractorName}
            onChange={(e) => updateContractData("contractorName", e.target.value)}
            placeholder="Enter contractor name"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="clientAddress">Client Business Address</Label>
          <Textarea
            id="clientAddress"
            value={contractData.clientAddress}
            onChange={(e) => updateContractData("clientAddress", e.target.value)}
            placeholder="Enter complete business address"
            rows={3}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contractorAddress">Contractor Business Address</Label>
          <Textarea
            id="contractorAddress"
            value={contractData.contractorAddress}
            onChange={(e) => updateContractData("contractorAddress", e.target.value)}
            placeholder="Enter complete business address"
            rows={3}
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center pt-6 border-t border-slate-700">
        <Button 
          onClick={() => onTabChange?.("basic")} 
          variant="outline" 
          className="bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700"
          disabled
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        <Button 
          onClick={() => onTabChange?.("services")} 
          className="bg-blue-600 hover:bg-blue-700"
        >
          Next: Services
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default BasicInfoForm;
