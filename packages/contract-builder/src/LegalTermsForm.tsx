import { Label } from "@rights/ui/label";
import { Input } from "@rights/ui/input";
import { Textarea } from "@rights/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@rights/ui/radio-group";
import { Checkbox } from "@rights/ui/checkbox";
import { ContractData } from "./contract";
interface LegalTermsFormProps {
  contractData: ContractData;
  updateContractData: (field: string, value: any) => void;
}

const LegalTermsForm = ({ contractData, updateContractData }: LegalTermsFormProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="termEndDate">Contract End Date (optional)</Label>
        <Input
          id="termEndDate"
          type="date"
          value={contractData.termEndDate}
          onChange={(e) => updateContractData("termEndDate", e.target.value)}
        />
      </div>

      <div className="space-y-4">
        <Label>Contract Termination</Label>
        <RadioGroup
          value={contractData.terminationType}
          onValueChange={(value) => updateContractData("terminationType", value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="reasonable-cause" id="reasonable-cause" />
            <Label htmlFor="reasonable-cause">
              Either party may terminate with reasonable cause
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="notice-period" id="notice-period" />
            <Label htmlFor="notice-period">
              Either party may terminate with written notice
            </Label>
          </div>
        </RadioGroup>

        {contractData.terminationNotice && (
          <div className="space-y-2 ml-6">
            <Label htmlFor="terminationNotice">Notice Period (in days)</Label>
            <Input
              id="terminationNotice"
              value={contractData.terminationNotice}
              onChange={(e) => updateContractData("terminationNotice", e.target.value)}
              placeholder="e.g., 30"
            />
          </div>
        )}
      </div>

      <div className="space-y-4">
        <Label>Dispute Resolution</Label>
        <RadioGroup
          value={contractData.disputeResolution}
          onValueChange={(value) => updateContractData("disputeResolution", value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="court" id="court" />
            <Label htmlFor="court">
              California state court (Alameda County jurisdiction)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="mediation-arbitration" id="mediation-arbitration" />
            <Label htmlFor="mediation-arbitration">
              Mediation first, then arbitration if needed
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confidentialityOther">Additional Confidential Information (optional)</Label>
        <Textarea
          id="confidentialityOther"
          value={contractData.confidentialityOther}
          onChange={(e) => updateContractData("confidentialityOther", e.target.value)}
          placeholder="Any additional types of confidential information specific to your business"
          rows={3}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="allowAssignment"
          checked={contractData.allowAssignment}
          onCheckedChange={(checked) => updateContractData("allowAssignment", checked)}
        />
        <Label htmlFor="allowAssignment">
          Allow assignment and delegation of rights/duties (if unchecked, prior written approval required)
        </Label>
      </div>
    </div>
  );
};

export default LegalTermsForm;
