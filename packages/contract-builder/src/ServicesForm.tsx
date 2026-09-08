
import { Label } from "@rights/ui/label";
import { Textarea } from "@rights/ui/textarea";
import { ContractData } from "./contract";

interface ServicesFormProps {
  contractData: ContractData;
  updateContractData: (field: string, value: any) => void;
}

const ServicesForm = ({ contractData, updateContractData }: ServicesFormProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="useExhibitA"
            checked={contractData.useExhibitA}
            onChange={(e) => updateContractData("useExhibitA", e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
          <Label htmlFor="useExhibitA">
            Use Exhibit A for detailed service description (check if services are complex)
          </Label>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="services">
          {contractData.useExhibitA ? "Brief Service Summary" : "Detailed Services Description"}
        </Label>
        <Textarea
          id="services"
          value={contractData.services}
          onChange={(e) => updateContractData("services", e.target.value)}
          placeholder={
            contractData.useExhibitA
              ? "Brief overview of services (detailed description will be in Exhibit A)"
              : "Describe in detail all services to be performed by the contractor"
          }
          rows={6}
        />
      </div>

      {contractData.useExhibitA && (
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> When using Exhibit A, you'll need to create a separate detailed document 
            describing all services to be performed and attach it to this agreement.
          </p>
        </div>
      )}
    </div>
  );
};

export default ServicesForm;
