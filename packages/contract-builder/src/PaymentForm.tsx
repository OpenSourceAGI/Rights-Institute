import { Label } from "@rights/ui/label";
import { Input } from "@rights/ui/input";
import { Textarea } from "@rights/ui/textarea";
import { ContractData } from "./contract";

interface PaymentFormProps {
  contractData: ContractData;
  updateContractData: (field: string, value: any) => void;
}

const PaymentForm = ({ contractData, updateContractData }: PaymentFormProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="paymentRates">Payment Rates</Label>
        <Textarea
          id="paymentRates"
          value={contractData.paymentRates}
          onChange={(e) => updateContractData("paymentRates", e.target.value)}
          placeholder="e.g., $50 per hour, $5,000 per project, etc."
          rows={3}
        />
      </div>

      <div className="space-y-4">
        <Label>Expense Responsibility</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="contractor-pays"
              name="expenseType"
              value="contractor-pays"
              checked={contractData.expenseType === "contractor-pays"}
              onChange={(e) => updateContractData("expenseType", e.target.value)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
            />
            <Label htmlFor="contractor-pays">
              Contractor pays all expenses (travel, equipment, etc.)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="client-pays"
              name="expenseType"
              value="client-pays"
              checked={contractData.expenseType === "client-pays"}
              onChange={(e) => updateContractData("expenseType", e.target.value)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
            />
            <Label htmlFor="client-pays">
              Client reimburses specific expenses
            </Label>
          </div>
        </div>
      </div>

      {contractData.expenseType === "client-pays" && (
        <div className="space-y-2">
          <Label htmlFor="reimbursableExpenses">Reimbursable Expenses</Label>
          <Textarea
            id="reimbursableExpenses"
            value={contractData.reimbursableExpenses}
            onChange={(e) => updateContractData("reimbursableExpenses", e.target.value)}
            placeholder="List the specific expenses that client will reimburse"
            rows={3}
          />
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
