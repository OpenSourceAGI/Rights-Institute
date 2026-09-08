import { Button } from "@rights/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@rights/ui/card";
import { ContractData } from "./contract";
import { Download, Edit } from "lucide-react";

interface ContractPreviewProps {
  contractData: ContractData;
  onBack: () => void;
}

const ContractPreview = ({ contractData, onBack }: ContractPreviewProps) => {
  const handleDownload = () => {
    const element = document.getElementById('contract-content');
    if (element) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Independent Contractor Agreement</title>
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
          <CardTitle className="text-center">Independent Contractor Agreement</CardTitle>
        </CardHeader>
        <CardContent>
          <div id="contract-content" className="space-y-6 text-sm leading-relaxed">
            <p>
              This Agreement is made between <strong>{contractData.clientName || "____________________"}</strong> ("Client") with a principal place of business at <strong>{contractData.clientAddress || "____________________"}</strong> and <strong>{contractData.contractorName || "____________________"}</strong> ("Contractor"), with a principal place of business at <strong>{contractData.contractorAddress || "____________________"}</strong>.
            </p>

            <div className="section">
              <h3 className="font-bold mb-2">1. Services to Be Performed</h3>
              {contractData.useExhibitA ? (
                <p>Contractor agrees to perform the services described in Exhibit A, which is attached to this Agreement.</p>
              ) : (
                <p>Contractor agrees to perform the following services: <strong>{contractData.services || "____________________"}</strong></p>
              )}
            </div>

            <div className="section">
              <h3 className="font-bold mb-2">2. Payment</h3>
              <p>In consideration for the services to be performed by Contractor, Client agrees to pay Contractor at the following rates: <strong>{contractData.paymentRates || "____________________"}</strong>.</p>
              <p>Contractor shall be paid within a reasonable time after Contractor submits an invoice to Client. The invoice should include the following: an invoice number, the dates covered by the invoice, and a summary of the work performed.</p>
            </div>

            <div className="section">
              <h3 className="font-bold mb-2">3. Expenses</h3>
              {contractData.expenseType === "contractor-pays" ? (
                <p>Contractor shall be responsible for all expenses incurred while performing services under this Agreement. This includes automobile, truck, and other travel expenses; vehicle maintenance and repair costs; vehicle and other license fees and permits; insurance premiums; road, fuel, and other taxes; fines; radio, pager, or cell phone expenses; meals; and all salary, expenses, and other compensation paid to employees or contract personnel the Contractor hires to complete the work under this Agreement.</p>
              ) : (
                <div>
                  <p>Client shall reimburse Contractor for the following expenses that are attributable directly to work performed under this Agreement: <strong>{contractData.reimbursableExpenses || "____________________"}</strong>.</p>
                  <p>Contractor shall submit an itemized statement of Contractor's expenses. Client shall pay Contractor within 30 days after receipt of each statement.</p>
                </div>
              )}
            </div>

            <div className="section">
              <h3 className="font-bold mb-2">4. Vehicles and Equipment</h3>
              <p>Contractor will furnish all vehicles, equipment, tools, and materials used to provide the services required by this Agreement. Client will not require Contractor to rent or purchase any equipment, product, or service as a condition of entering into this Agreement.</p>
            </div>

            <div className="section">
              <h3 className="font-bold mb-2">5. Independent Contractor Status</h3>
              <p>Contractor is an independent contractor, and neither Contractor nor Contractor's employees or contract personnel are, or shall be deemed, Client's employees. In its capacity as an independent contractor, Contractor agrees and represents, and Client agrees, as follows [Check all that apply]</p>
              <div className="ml-4 space-y-1">
                <div><span className="checkbox">[{contractData.contractorStatus.includes("perform-for-others") ? "X" : " "}]</span> Contractor has the right to perform services for others during the term of this Agreement.</div>
                <div><span className="checkbox">[{contractData.contractorStatus.includes("control-methods") ? "X" : " "}]</span> Contractor has the sole right to control and direct the means, manner, and method by which the services required by this Agreement will be performed. Contractor shall select the routes taken, starting and quitting times, days of work, and order the work is performed.</div>
                <div><span className="checkbox">[{contractData.contractorStatus.includes("hire-assistants") ? "X" : " "}]</span> Contractor has the right to hire assistants as subcontractors or to use employees to provide the services required by this Agreement.</div>
                <div><span className="checkbox">[{contractData.contractorStatus.includes("no-uniforms") ? "X" : " "}]</span> Neither Contractor nor Contractor's employees or contract personnel shall be required to wear any uniforms provided by Client.</div>
                <div><span className="checkbox">[{contractData.contractorStatus.includes("contractor-provides-assistants") ? "X" : " "}]</span> The services required by this Agreement shall be performed by Contractor, Contractor's employees, or contract personnel, and Client shall not hire, supervise, or pay any assistants to help Contractor.</div>
                <div><span className="checkbox">[{contractData.contractorStatus.includes("no-training") ? "X" : " "}]</span> Neither Contractor nor Contractor's employees or contract personnel shall receive any training from Client in the professional skills necessary to perform the services required by this Agreement.</div>
                <div><span className="checkbox">[{contractData.contractorStatus.includes("not-full-time") ? "X" : " "}]</span> Neither Contractor nor Contractor's employees or contract personnel shall be required by Client to devote full time to the performance of the services required by this Agreement.</div>
              </div>
            </div>

            <div className="section">
              <h3 className="font-bold mb-2">6. Business Licenses, Permits, and Certificates</h3>
              <p>Contractor represents and warrants that Contractor and Contractor's employees and contract personnel will comply with all federal, state, and local laws requiring drivers and other licenses, business permits, and certificates required to carry out the services to be performed under this Agreement.</p>
            </div>

            <div className="section">
              <h3 className="font-bold mb-2">7. State and Federal Taxes</h3>
              <p>Client will not:</p>
              <ul className="ml-4 list-disc">
                <li>withhold FICA (Social Security and Medicare taxes) from Contractor's payments or make FICA payments on Contractor's behalf</li>
                <li>make state or federal unemployment compensation contributions on Contractor's behalf, or</li>
                <li>withhold state or federal income tax from Contractor's payments.</li>
              </ul>
              <p>Contractor shall pay all taxes incurred while performing services under this Agreement—including all applicable income taxes and, if Contractor is not a corporation, self-employment (Social Security) taxes. Upon demand, Contractor shall provide Client with proof that such payments have been made.</p>
            </div>

            <div className="section">
              <h3 className="font-bold mb-2">8. Fringe Benefits</h3>
              <p>Contractor understands that neither Contractor nor Contractor's employees or contract personnel are eligible to participate in any employee pension, health, vacation pay, sick pay, or other fringe benefit plan of Client.</p>
            </div>

            <div className="section">
              <h3 className="font-bold mb-2">9. Unemployment Compensation</h3>
              <p>Client shall make no state or federal unemployment compensation payments on behalf of Contractor or Contractor's employees or contract personnel. Contractor will not be entitled to these benefits in connection with work performed under this Agreement.</p>
            </div>

            <div className="section">
              <h3 className="font-bold mb-2">10. Workers' Compensation</h3>
              <p>Client shall not obtain workers' compensation insurance on behalf of Contractor or Contractor's employees. If Contractor hires employees to perform any work under this Agreement, Contractor will cover them with workers' compensation insurance to the extent required by law and provide Client with a certificate of workers' compensation insurance before the employees begin the work.</p>
            </div>

            <div className="section">
              <h3 className="font-bold mb-2">11. Insurance</h3>
              <p>Client shall not provide insurance coverage of any kind for Contractor or Contractor's employees or contract personnel. Contractor shall obtain the following insurance coverage and maintain it during the entire term of this Agreement:</p>
              <div className="ml-4 space-y-1">
                <div><span className="checkbox">[{contractData.insuranceTypes.includes("auto") ? "X" : " "}]</span> Automobile liability insurance for each vehicle used in the performance of this Agreement -- including owned, non-owned (for example, owned by Contractor's employees), leased, or hired vehicles -- in the minimum amount of <strong>${contractData.autoInsuranceAmount || "_____"}</strong> combined single limit per occurrence for bodily injury and property damage.</div>
                <div><span className="checkbox">[{contractData.insuranceTypes.includes("general") ? "X" : " "}]</span> Comprehensive or commercial general liability insurance coverage in the minimum amount of <strong>${contractData.generalInsuranceAmount || "_____"}</strong> combined single limit, including coverage for bodily injury, personal injury, broad form property damage, contractual liability, and cross-liability.</div>
              </div>
              <p>Before commencing any work, Contractor shall provide Client with proof of this insurance and with proof that Client has been made an additional insured under the policies.</p>
            </div>

            <div className="section">
              <h3 className="font-bold mb-2">12. Indemnification</h3>
              <p>Contractor shall indemnify and hold Client harmless from any loss or liability arising from performing services under this Agreement.</p>
            </div>

            <div className="section">
              <h3 className="font-bold mb-2">13. Term of Agreement</h3>
              <p>This agreement will become effective when signed by both parties and will terminate on the earlier of:</p>
              <ul className="ml-4 list-disc">
                <li>the date Contractor completes the services required by this Agreement</li>
                {contractData.termEndDate && <li><strong>{contractData.termEndDate}</strong>, or</li>}
                <li>the date a party terminates the Agreement as provided below.</li>
              </ul>
            </div>

            <div className="section">
              <h3 className="font-bold mb-2">14. Terminating the Agreement</h3>
              {contractData.terminationType === "reasonable-cause" ? (
                <div>
                  <p>With reasonable cause, either Client or Contractor may terminate this Agreement, effective immediately upon giving written notice.</p>
                  <p>Reasonable cause includes:</p>
                  <ul className="ml-4 list-disc">
                    <li>a material violation of this Agreement, or</li>
                    <li>any act exposing the other party to liability to others for personal injury or property damage.</li>
                  </ul>
                </div>
              ) : (
                <p>Either party may terminate this Agreement at any time by giving <strong>{contractData.terminationNotice || "____"}</strong> days' written notice to the other party of the intent to terminate.</p>
              )}
            </div>

            <div className="section">
              <h3 className="font-bold mb-2">15. Exclusive Agreement</h3>
              <p>This is the entire Agreement between Contractor and Client.</p>
            </div>

            <div className="section">
              <h3 className="font-bold mb-2">16. Modifying the Agreement</h3>
              <p>This Agreement may be modified only by a writing signed by both parties.</p>
            </div>

            <div className="section">
              <h3 className="font-bold mb-2">17. Resolving Disputes</h3>
              {contractData.disputeResolution === "court" ? (
                <p>If a dispute arises under this Agreement, any party may take the matter to California state court, jurisdiction of the county of Alameda.</p>
              ) : (
                <p>If a dispute arises under this Agreement, the parties agree to first try to resolve the dispute with the help of a mutually agreed-upon mediator in Alameda County, CA. Any costs and fees other than attorney fees associated with the mediation shall be shared equally by the parties. If it proves impossible to arrive at a mutually satisfactory solution through mediation, the parties agree to submit the dispute to a mutually agreed-upon arbitrator in Alameda County, CA. Judgment upon the award rendered by the arbitrator may be entered in any court having jurisdiction to do so. Costs of arbitration, including attorney fees, will be allocated by the arbitrator.</p>
              )}
            </div>

            <div className="section">
              <h3 className="font-bold mb-2">18. Signatures</h3>
              <p>This Agreement is effective as of <strong>{contractData.signedDate || "____________________"}</strong>.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                <div>
                  <h4 className="font-semibold mb-2">Client Signature:</h4>
                  {contractData.clientSignature ? (
                    <div className="border border-gray-300 p-4 rounded">
                      <img 
                        src={contractData.clientSignature} 
                        alt="Client Signature" 
                        className="max-w-full h-24 object-contain"
                      />
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 p-4 rounded h-24 flex items-center justify-center text-gray-500">
                      No signature provided
                    </div>
                  )}
                  <p className="text-sm mt-2"><strong>{contractData.clientName || "Client Name"}</strong></p>
                  <p className="text-sm text-gray-600">Client</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Contractor Signature:</h4>
                  {contractData.contractorSignature ? (
                    <div className="border border-gray-300 p-4 rounded">
                      <img 
                        src={contractData.contractorSignature} 
                        alt="Contractor Signature" 
                        className="max-w-full h-24 object-contain"
                      />
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 p-4 rounded h-24 flex items-center justify-center text-gray-500">
                      No signature provided
                    </div>
                  )}
                  <p className="text-sm mt-2"><strong>{contractData.contractorName || "Contractor Name"}</strong></p>
                  <p className="text-sm text-gray-600">Contractor</p>
                </div>
              </div>
            </div>

            <div className="section">
              <h3 className="font-bold mb-2">18. Non-Disclosure Agreement</h3>
              <p>Contractor acknowledges that it will be necessary for Client to disclose certain confidential and proprietary information to Contractor in order for Contractor to perform duties under this Agreement. Contractor acknowledges that disclosure to a third party or misuse of this proprietary or confidential information would irreparably harm Client. Accordingly, Contractor will not disclose or use, either during or after the term of this Agreement, any proprietary or confidential information of Client without Client's prior written permission except to the extent necessary to perform services on Client's behalf.</p>
              
              <h4 className="font-semibold mt-4 mb-2">Definition of Confidential Information</h4>
              <p>Confidential information includes:</p>
              <ul className="ml-4 list-disc">
                <li>the written, printed, graphic, or electronically recorded materials furnished by Client for Contractor to use</li>
                <li>any written or tangible information stamped "confidential," "proprietary," or with a similar legend, or any information that Client makes reasonable efforts to maintain the secrecy of</li>
                <li>business or marketing plans or strategies, customer lists, operating procedures, trade secrets, design formulas, know-how and processes, computer programs and inventories, discoveries, and improvements of any kind, sales projections, and pricing information</li>
                <li>information belonging to customers and suppliers of Client about whom Contractor gained knowledge as a result of Contractor's services to Client</li>
                {contractData.confidentialityOther && contractData.confidentialityOther.split(', ').map((info, index) => (
                  <li key={index}>{info}</li>
                ))}
              </ul>

              {contractData.ndaDuration && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Duration of Confidentiality Obligations</h4>
                  <p>The confidentiality obligations under this Agreement shall survive the termination of this Agreement and continue for a period of <strong>{contractData.ndaDuration}</strong>.</p>
                </div>
              )}

              {contractData.permittedDisclosures && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Permitted Disclosures</h4>
                  <p>The confidentiality obligations shall not apply to: {contractData.permittedDisclosures}</p>
                </div>
              )}

              {contractData.returnPeriod && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Return of Materials</h4>
                  <p>Upon termination of Contractor's services to Client, or at Client's request, Contractor shall deliver to Client all materials in Contractor's possession relating to Client's business within <strong>{contractData.returnPeriod}</strong>.</p>
                </div>
              )}

              {contractData.ndaRemedies && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Remedies for Breach</h4>
                  <p>In the event of a breach of this confidentiality provision, the following remedies shall be available: {contractData.ndaRemedies}</p>
                </div>
              )}

              <p className="mt-4">Contractor acknowledges that any breach or threatened breach of this confidentiality provision will result in irreparable harm to Client for which damages would be an inadequate remedy. Therefore, Client shall be entitled to equitable relief, including an injunction, in the event of such breach or threatened breach. Such equitable relief shall be in addition to Client's rights and remedies otherwise available at law.</p>
            </div>

            <div className="section">
              <h3 className="font-bold mb-2">19. Proprietary Information</h3>
              <div className="ml-4 space-y-2">
                <p><strong>A.</strong> The product of all work performed under this Agreement ("Work Product"), including without limitation all notes, reports, documentation, drawings, computer programs, inventions, creations, works, devices, models, work-in-progress and deliverables will be the sole property of the Client, and Contractor hereby assigns to the Client all right, title and interest therein, including but not limited to all audiovisual, literary, moral rights and other copyrights, patent rights, trade secret rights and other proprietary rights therein. Contractor retains no right to use the Work Product and agree not to challenge the validity of the Client's ownership in the Work Product.</p>
                <p><strong>B.</strong> Contractor hereby assigns to the Client all right, title, and interest in any and all photographic images and videos or audio recordings made by the Client during Contractor's work for them, including, but not limited to, any royalties, proceeds, or other benefits derived from such photographs or recordings.</p>
                <p><strong>C.</strong> The Client will be entitled to use Contractor's name and/or likeness use in advertising and other materials.</p>
              </div>
            </div>

            <div className="section">
              <h3 className="font-bold mb-2">20. No Partnership</h3>
              <p>This Agreement does not create a partnership relationship. Contractor does not have authority to enter into contracts on Client's behalf.</p>
            </div>

            <div className="section">
              <h3 className="font-bold mb-2">21. Assignment and Delegation</h3>
              {contractData.allowAssignment ? (
                <p>Either Contractor or Client may assign rights and may delegate duties under this Agreement.</p>
              ) : (
                <p>Contractor may not assign or subcontract any rights or delegate any of its duties under this Agreement without Client's prior written approval.</p>
              )}
            </div>

            <div className="section">
              <h3 className="font-bold mb-2">22. Applicable Law</h3>
              <p>This Agreement will be governed by California law, without giving effect to conflict of laws principles.</p>
            </div>

            <div className="section mt-12">
              <h3 className="font-bold mb-4">Signatures</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p><strong>Client/Owner:</strong></p>
                  <div className="mt-4 space-y-4">
                    <div>_________________________________________________________<br />Printed Name</div>
                    <div>_________________________________________________________<br />Signature</div>
                    <div>_________________________________________________________<br />Date</div>
                  </div>
                </div>
                <div>
                  <p><strong>Contractor:</strong></p>
                  <div className="mt-4 space-y-4">
                    <div>_________________________________________________________<br />Printed Name</div>
                    <div>_________________________________________________________<br />Signature</div>
                    <div>_________________________________________________________<br />Date</div>
                    <div>_________________________________________________________<br />Taxpayer ID Number</div>
                  </div>
                </div>
              </div>
            </div>

            {contractData.useExhibitA && (
              <div className="section">
                <p><strong>Attachments:</strong> ___X___ Exhibit A: Additional Description of Services to be Performed</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContractPreview;
