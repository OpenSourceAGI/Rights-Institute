import { Button } from "@rights/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@rights/ui/card";
import { ContractData } from "./contract";
import { Download, Edit } from "lucide-react";

interface EmployeePreviewProps {
  contractData: ContractData;
  onBack: () => void;
}

const EmployeePreview = ({ contractData, onBack }: EmployeePreviewProps) => {
  const handleDownload = () => {
    const element = document.getElementById('employee-contract-content');
    if (element) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Employee Agreement</title>
              <style>
                body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
                h1 { text-align: center; margin-bottom: 30px; }
                .section { margin-bottom: 20px; }
                .checkbox { margin-right: 5px; }
              </style>
            </head>
            <body>
              ${element.innerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Button onClick={onBack} variant="outline" className="flex items-center gap-2">
          <Edit className="w-4 h-4" />
          Back to Edit
        </Button>
        <Button onClick={handleDownload} className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Download/Print
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-center">Employee Agreement</CardTitle>
        </CardHeader>
        <CardContent>
          <div id="employee-contract-content" className="space-y-6 text-sm leading-relaxed">
            <p>
              This Employee Agreement (the "Agreement") is entered into between <strong>{contractData.clientName || "____________________"}</strong> ("Employer") with a principal place of business at <strong>{contractData.clientAddress || "____________________"}</strong> and <strong>{contractData.contractorName || "____________________"}</strong> ("Employee"), with a principal place of residence at <strong>{contractData.contractorAddress || "____________________"}</strong>.
            </p>

            <div className="section">
              <h3 className="font-bold mb-2">1. Employment Type and Position</h3>
              <p>Employee shall be employed as a <strong>{contractData.employeeType?.replace('-', ' ') || "____________________"}</strong> employee in the position of <strong>{contractData.services || "____________________"}</strong>.</p>
            </div>

            <div className="section">
              <h3 className="font-bold mb-2">2. Work Schedule</h3>
              <p>Employee shall work according to the following schedule: <strong>{contractData.workSchedule || "____________________"}</strong>.</p>
            </div>

            <div className="section">
              <h3 className="font-bold mb-2">3. Compensation</h3>
              <p>In consideration for the services to be performed by Employee, Employer agrees to pay Employee: <strong>{contractData.salary || "____________________"}</strong>.</p>
              <p>Employee shall be paid on a regular basis as determined by Employer's standard payroll schedule, subject to applicable tax and social security deductions.</p>
            </div>

            <div className="section">
              <h3 className="font-bold mb-2">4. Employee Benefits</h3>
              {contractData.benefits && contractData.benefits.length > 0 ? (
                <div>
                  <p>Employee shall be eligible for the following benefits:</p>
                  <ul className="ml-4 list-disc">
                    {contractData.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>Employee shall be eligible for benefits as determined by Employer's standard employee benefits program.</p>
              )}
            </div>

            <div className="section">
              <h3 className="font-bold mb-2">5. Probation Period</h3>
              <p>Employee shall serve a probation period of <strong>{contractData.probationPeriod || "____________________"}</strong> from the date of hire. During this period, either party may terminate the employment relationship with or without cause and with or without notice.</p>
            </div>

            <div className="section">
              <h3 className="font-bold mb-2">6. Duties and Responsibilities</h3>
              <p>Employee shall perform the following duties and responsibilities: <strong>{contractData.services || "____________________"}</strong>.</p>
              <p>Employee shall devote their full time, attention, and best efforts to the performance of their duties and shall not engage in any other business or employment without the prior written consent of Employer.</p>
            </div>

            <div className="section">
              <h3 className="font-bold mb-2">7. Term of Employment</h3>
              <p>This Agreement shall commence on the date of hire and shall continue until terminated by either party in accordance with the terms of this Agreement.</p>
              {contractData.termEndDate && (
                <p>This Agreement shall terminate on <strong>{contractData.termEndDate}</strong>, unless earlier terminated in accordance with the terms of this Agreement.</p>
              )}
            </div>

            <div className="section">
              <h3 className="font-bold mb-2">8. Termination</h3>
              {contractData.terminationType === "reasonable-cause" ? (
                <div>
                  <p>Employer may terminate this Agreement immediately for cause, including but not limited to:</p>
                  <ul className="ml-4 list-disc">
                    <li>Employee's failure to perform their duties satisfactorily</li>
                    <li>Employee's violation of Employer's policies or procedures</li>
                    <li>Employee's misconduct or violation of applicable laws</li>
                    <li>Employee's breach of this Agreement</li>
                  </ul>
                </div>
              ) : (
                <p>Either party may terminate this Agreement by giving <strong>{contractData.terminationNotice || "____"}</strong> days' written notice to the other party.</p>
              )}
            </div>

            <div className="section">
              <h3 className="font-bold mb-2">9. Confidentiality and Non-Disclosure</h3>
              <p>Employee acknowledges that during the course of employment, Employee may have access to confidential and proprietary information of Employer. Employee agrees to maintain the confidentiality of such information and not to disclose it to any third party without Employer's prior written consent.</p>
              <p>Confidential information includes, but is not limited to: business plans, customer lists, trade secrets, technical information, financial data, and any other information that Employer designates as confidential.</p>
            </div>

            <div className="section">
              <h3 className="font-bold mb-2">10. Intellectual Property</h3>
              <p>Employee acknowledges that all inventions, discoveries, improvements, and intellectual property created by Employee during the course of employment and relating to Employer's business shall be the sole and exclusive property of Employer. Employee hereby assigns to Employer all right, title, and interest in such intellectual property.</p>
            </div>

            <div className="section">
              <h3 className="font-bold mb-2">11. Non-Competition and Non-Solicitation</h3>
              <p>During the term of employment and for a period of one (1) year following termination, Employee shall not:</p>
              <ul className="ml-4 list-disc">
                <li>Engage in any business that competes with Employer's business</li>
                <li>Solicit or attempt to solicit any of Employer's customers or clients</li>
                <li>Solicit or attempt to solicit any of Employer's employees to leave their employment</li>
              </ul>
            </div>

            <div className="section">
              <h3 className="font-bold mb-2">12. Return of Property</h3>
              <p>Upon termination of employment, Employee shall immediately return all Employer property, including but not limited to: keys, access cards, equipment, documents, and any other materials belonging to Employer.</p>
            </div>

            <div className="section">
              <h3 className="font-bold mb-2">13. Governing Law</h3>
              <p>This Agreement shall be governed by and construed in accordance with the laws of the state in which Employee performs services for Employer.</p>
            </div>

            <div className="section">
              <h3 className="font-bold mb-2">14. Entire Agreement</h3>
              <p>This Agreement constitutes the entire agreement between the parties with respect to the subject matter hereof and supersedes all prior agreements, understandings, and negotiations, whether written or oral.</p>
            </div>

            <div className="section">
              <h3 className="font-bold mb-2">15. Signatures</h3>
              <p>This Agreement is effective as of <strong>{contractData.signedDate || "____________________"}</strong>.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                <div>
                  <h4 className="font-semibold mb-2">Employer Signature:</h4>
                  {contractData.clientSignature ? (
                    <div className="border border-gray-300 p-4 rounded">
                      <img 
                        src={contractData.clientSignature} 
                        alt="Employer Signature" 
                        className="max-w-full h-24 object-contain"
                      />
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 p-4 rounded h-24 flex items-center justify-center text-gray-500">
                      No signature provided
                    </div>
                  )}
                  <p className="text-sm mt-2"><strong>{contractData.clientName || "Employer Name"}</strong></p>
                  <p className="text-sm text-gray-600">Employer</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Employee Signature:</h4>
                  {contractData.contractorSignature ? (
                    <div className="border border-gray-300 p-4 rounded">
                      <img 
                        src={contractData.contractorSignature} 
                        alt="Employee Signature" 
                        className="max-w-full h-24 object-contain"
                      />
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 p-4 rounded h-24 flex items-center justify-center text-gray-500">
                      No signature provided
                    </div>
                  )}
                  <p className="text-sm mt-2"><strong>{contractData.contractorName || "Employee Name"}</strong></p>
                  <p className="text-sm text-gray-600">Employee</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeePreview; 