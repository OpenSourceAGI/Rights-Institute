import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@rights/ui/card";
import { Button } from "@rights/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@rights/ui/tabs";
import ContractTypeSelector from "./ContractTypeSelector";
import BasicInfoForm from "./BasicInfoForm";
import ServicesForm from "./ServicesForm";
import PaymentForm from "./PaymentForm";
import ContractorStatusForm from "./ContractorStatusForm";
import LegalTermsForm from "./LegalTermsForm";
import DisputeResolutionForm from "./DisputeResolutionForm";
import NDAForm from "./NDAForm";
import SignatureForm from "./SignatureForm";
import ContractPreview from "./ContractPreview";
import { ContractData } from "./contract";
import { Eye } from "lucide-react";

const ContractBuilder = () => {
  const [activeTab, setActiveTab] = useState("basic");
  const [showPreview, setShowPreview] = useState(false);
  const [contractData, setContractData] = useState<ContractData>({
    contractType: "independent-contractor",
    clientName: "",
    clientAddress: "",
    contractorName: "",
    contractorAddress: "",
    services: "",
    useExhibitA: false,
    paymentRates: "",
    expenseType: "contractor-pays",
    reimbursableExpenses: "",
    contractorStatus: [],
    insuranceTypes: [],
    autoInsuranceAmount: "",
    generalInsuranceAmount: "",
    termEndDate: "",
    terminationType: "reasonable-cause",
    terminationNotice: "",
    disputeResolution: "court",
    confidentialityOther: "",
    allowAssignment: false,
    clientSignature: null,
    contractorSignature: null,
    signedDate: "",
  });

  const updateContractData = (field: string, value: any) => {
    setContractData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerateContract = () => {
    setShowPreview(true);
  };

  if (showPreview) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center py-10 px-2">
        <div className="w-full max-w-4xl">
          <ContractPreview 
            contractData={contractData} 
            onBack={() => setShowPreview(false)} 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center py-10 px-2">
      <Card className="w-full max-w-6xl bg-slate-900 border border-slate-800 shadow-xl rounded-2xl text-slate-100">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <img 
              src="https://i.imgur.com/sf1EHf9.jpeg" 
              alt="Contractor Agreement" 
              className="w-full max-w-4xl h-48 rounded-xl object-cover shadow-lg border-2 border-slate-700"
            />
          </div>
          <div className="flex justify-end">
            <Button onClick={handleGenerateContract} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 shadow">
              <Eye className="w-4 h-4" />
              Preview Contract
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-8 bg-slate-800 border border-slate-700 rounded-lg mb-6">
              <TabsTrigger value="basic" className="text-slate-200 data-[state=active]:bg-slate-900 data-[state=active]:text-blue-400">Basic Info</TabsTrigger>
              <TabsTrigger value="services" className="text-slate-200 data-[state=active]:bg-slate-900 data-[state=active]:text-blue-400">Services</TabsTrigger>
              <TabsTrigger value="payment" className="text-slate-200 data-[state=active]:bg-slate-900 data-[state=active]:text-blue-400">Payment</TabsTrigger>
              <TabsTrigger value="status" className="text-slate-200 data-[state=active]:bg-slate-900 data-[state=active]:text-blue-400">Status</TabsTrigger>
              <TabsTrigger value="legal" className="text-slate-200 data-[state=active]:bg-slate-900 data-[state=active]:text-blue-400">Legal Terms</TabsTrigger>
              <TabsTrigger value="dispute" className="text-slate-200 data-[state=active]:bg-slate-900 data-[state=active]:text-blue-400">Dispute Resolution</TabsTrigger>
              <TabsTrigger value="nda" className="text-slate-200 data-[state=active]:bg-slate-900 data-[state=active]:text-blue-400">NDA</TabsTrigger>
              <TabsTrigger value="signature" className="text-slate-200 data-[state=active]:bg-slate-900 data-[state=active]:text-blue-400">Signatures</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="mt-6">
              <BasicInfoForm 
                contractData={contractData} 
                updateContractData={updateContractData} 
              />
            </TabsContent>

            <TabsContent value="services" className="mt-6">
              <ServicesForm 
                contractData={contractData} 
                updateContractData={updateContractData} 
              />
            </TabsContent>

            <TabsContent value="payment" className="mt-6">
              <PaymentForm 
                contractData={contractData} 
                updateContractData={updateContractData} 
              />
            </TabsContent>

            <TabsContent value="status" className="mt-6">
              <ContractorStatusForm 
                contractData={contractData} 
                updateContractData={updateContractData} 
              />
            </TabsContent>

            <TabsContent value="legal" className="mt-6">
              <LegalTermsForm 
                contractData={contractData} 
                updateContractData={updateContractData} 
              />
            </TabsContent>

            <TabsContent value="dispute" className="mt-6">
              <DisputeResolutionForm 
                contractData={contractData} 
                updateContractData={updateContractData} 
                contractType="independent-contractor"
              />
            </TabsContent>

            <TabsContent value="nda" className="mt-6">
              <NDAForm 
                contractData={contractData} 
                updateContractData={updateContractData} 
              />
            </TabsContent>

            <TabsContent value="signature" className="mt-6">
              <SignatureForm 
                contractData={contractData} 
                updateContractData={updateContractData} 
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContractBuilder;
