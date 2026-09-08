/**
 * @fileoverview Employment Agreement Editor Component
 * 
 * A comprehensive form component for creating and editing employment agreements.
 * Provides a user-friendly interface with real-time preview functionality.
 * 
 * @features
 * - Interactive form with conditional field display
 * - Real-time agreement preview
 * - Tabbed interface (Editor/Preview)
 * - Print functionality
 * - Responsive design
 * 
 * @props None - This is a self-contained component
 * 
 * @state
 * - formData: Object containing all form field values
 * 
 * @example
 * ```tsx
 * import EmploymentAgreexmsentEditor from './EmployeeAgreement';
 * * function App() {
 *   return (\
 *     <div>
 *       <EmploymentAgreementEditor />
 *     </div>
 *   );
 * }
 * ```
 * 
 * @author vtempest
 * @version 1.0.0
 * @since 2024
 */

import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@rights/ui/tabs';
import { Card, CardContent } from '@rights/ui/card';
import { RadioGroup, RadioGroupItem } from '@rights/ui/radio-group';
import { Label } from '@rights/ui/label';
import { Badge } from '@rights/ui/badge';
import { Clock, DollarSign, Edit, Eye, User, Calendar, CreditCard, Shield, Gavel, FileText, Contact, PenTool, CheckCircle } from 'lucide-react';
import SignaturePadComponent from './SignaturePad';

const TAB_CONFIG = [
  {
    value: 'editor',
    title: 'Editor',
    image: 'https://i.imgur.com/sYyAfOT.jpeg',
  },
  {
    value: 'preview',
    title: 'Preview',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  },
  {
    value: 'summary',
    title: 'Summary',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80',
  },
];

/**
 * Employment Agreement Editor Component
 * 
 * A comprehensive form for creating employment agreements with real-time preview.
 * Includes all necessary fields for a complete employment contract including
 * basic information, compensation, benefits, restrictions, and legal provisions.
 * 
 * @returns {JSX.Element} The employment agreement editor interface
 */
const EmploymentAgreementEditor = () => {
  const [formData, setFormData] = useState({
    // Basic Information
    employer_name: '',
    employer_type: '',
    employer_business_state: '',
    employer_business_type: '',
    employee_name: '',
    employer_describe_business: '',
    employee_position: '',
    
    // Term and Termination
    employment_start_date: '',
    termination_notice_days: '',
    severance_payment_available: '',
    severance_amount: '',
    
    // Compensation
    employee_salary_amount: '',
    salary_installments: '',
    salary_installments_other: '',
    employee_signing_bonus: '',
    employee_sign_in_bonus_days: '',
    employee_signing_bonus_amount: '',
    employee_duration_return_bonus: '',
    employee_bonus_eligibility: '',
    include_bonus_in_agreement: '',
    employee_bonus_award: '',
    benefits1: false,
    benefits2: false,
    benefits3: false,
    other_nonmonetary_benefits: '',
    employee_eligible_stock_options: '',
    employee_stock_qualify_years: '',
    
    // Other sections
    employee_property_return_days: '',
    employee_nonsolicitation_included: '',
    employee_nonsolicitation_years: '',
    noncompetition_restriction_included: '',
    employee_noncompetition_restriction_years: '',
    employee_noncompetition_restriction_miles: '',
    fidelity_bond_provision: '',
    death_during_employment_provision: '',
    death_compensation_amount: '',
    compensation_payment_duration: '',
    
    // Confidentiality
    employee_confidentiality_obligations_time_limit: '',
    confidentiality_duration: '',
    
    // Dispute Resolution
    resolve_dispute_arbitration: '',
    state_for_dispute_arbitration: '',
    county_name_for_arbitration: '',
    state_arbitration_hold: '',
    no_arbitration_law_state: '',
    no_arbitration_forum_county: '',
    no_arbitration_forum_state: '',
    dispute_resolution_method: 'rapid-ruling',
    rapid_ruling_company_email: '',
    rapid_ruling_employee_email: '',
    court_state: '',
    court_county: '',
    
    // Contact Information
    employer_contact_name: '',
    employer_address_street_address: '',
    employer_address_city: '',
    employer_address_state: '',
    employer_address_zip: '',
    employer_address_email: '',
    employee_address_street_address: '',
    employee_address_city: '',
    employee_address_state: '',
    employee_address_zip: '',
    employee_address_email: '',
    
    // Signing
    employer_signing_signer_name: '',
    employer_signing_signer_title: '',
    signed_date: '',
    employer_signature: null,
    employee_signature: null
  });

  const [currentTab, setCurrentTab] = useState('editor');

  const currentTabConfig = TAB_CONFIG.find(tab => tab.value === currentTab) || TAB_CONFIG[0];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (field, checked) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked
    }));
  };

  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  const businessTypes = [
    'Corporation', 'Limited Liability Company', 'General Partnership', 
    'Limited Liability Partnership', 'Limited Partnership'
  ];

  const renderSection = (title, children, icon = null, bgColor = "bg-slate-900") => (
    <div className={`mb-8 p-6 ${bgColor} rounded-lg border border-slate-700 shadow-sm`}>
      <h3 className="text-lg font-semibold mb-4 text-slate-100 flex items-center gap-2">
        {icon && <span className="text-slate-200">{icon}</span>}
        {title}
      </h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );

  const renderInput = (field, label, type = 'text', options = {}) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
      <label className="font-medium text-slate-200">{label}</label>
      <div className="md:col-span-2">
        <input
          type={type}
          value={formData[field] || ''}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className="w-full px-3 py-2 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-800 text-slate-100"
          {...options}
        />
      </div>
    </div>
  );

  const renderSelect = (field, label, options) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
      <label className="font-medium text-slate-200">{label}</label>
      <div className="md:col-span-2">
        <select
          value={formData[field] || ''}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className="w-full px-3 py-2 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-800 text-slate-100"
        >
          <option value="">Select...</option>
          {options.map(option => (
            <option key={option} value={option.toLowerCase().replace(/\s+/g, '_')}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  const renderRadio = (field, label, options) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
      <label className="font-medium text-slate-200">{label}</label>
      <div className="md:col-span-2 space-y-2">
        {options.map(option => (
          <label key={option} className="flex items-center text-slate-100">
            <input
              type="radio"
              name={field}
              value={option.toLowerCase()}
              checked={formData[field] === option.toLowerCase()}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="mr-2 accent-blue-500"
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );

  const renderCheckbox = (field, label) => (
    <div className="flex items-center">
      <input
        type="checkbox"
        checked={formData[field] || false}
        onChange={(e) => handleCheckboxChange(field, e.target.checked)}
        className="mr-2 accent-blue-500"
      />
      <label className="font-medium text-slate-200">{label}</label>
    </div>
  );

  const renderTextarea = (field, label) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
      <label className="font-medium text-slate-200">{label}</label>
      <div className="md:col-span-2">
        <textarea
          value={formData[field] || ''}
          onChange={(e) => handleInputChange(field, e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-800 text-slate-100"
        />
      </div>
    </div>
  );

  const shouldShowField = (dependencies) => {
    if (!dependencies) return true;
    
    for (const [field, expectedValue] of Object.entries(dependencies)) {
      if (formData[field] !== expectedValue) {
        return false;
      }
    }
    return true;
  };

  const formatBusinessType = (type) => {
    const typeMap = {
      'corporation': 'corporation',
      'limited_liability_company': 'limited liability company',
      'general_partnership': 'general partnership',
      'limited_liability_partnership': 'limited liability partnership',
      'limited_partnership': 'limited partnership'
    };
    return typeMap[type] || type;
  };

  const formatState = (stateCode) => {
    return stateCode ? stateCode.charAt(0).toUpperCase() + stateCode.slice(1) : '';
  };

  const getSectionNumber = () => {
    let num = 10;
    if (formData.employee_nonsolicitation_included === 'yes') num++;
    if (formData.noncompetition_restriction_included === 'yes') num++;
    if (formData.fidelity_bond_provision === 'yes') num++;
    if (formData.death_during_employment_provision === 'yes') num++;
    return num;
  };

  const generatePreview = () => {
    const employerName = formData.employer_name || '[EMPLOYER NAME]';
    const employeeName = formData.employee_name || '[EMPLOYEE NAME]';
    const businessDescription = formData.employer_describe_business || '[BUSINESS DESCRIPTION]';
    const position = formData.employee_position || '[POSITION]';
    const startDate = formData.employment_start_date || '[START DATE]';
    const notificationDays = formData.termination_notice_days || '[DAYS]';
    const salary = formData.employee_salary_amount ? `$${Number(formData.employee_salary_amount).toLocaleString()}` : '[SALARY AMOUNT]';
    const returnDays = formData.employee_property_return_days || '[DAYS]';

    return (
      <div className="max-w-none text-slate-100">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-100">EMPLOYMENT AGREEMENT</h1>
        </div>

        <p>
          This employment agreement is between <strong>{employerName}</strong>
          {formData.employer_type === 'individual' && ', an individual'}
          {formData.employer_type === 'business' && formData.employer_business_type && (
            <span>, a(n) {formatState(formData.employer_business_state)} {formatBusinessType(formData.employer_business_type)}</span>
          )}
          {' '}(the "<strong>Company</strong>") and <strong>{employeeName}</strong>, an individual (the "<strong>Employee</strong>").
        </p>

        <p>The Company is engaged in the business of {businessDescription}.</p>

        <p>The Company desires to employ the Employee, and the Employee wishes to enter into that employment, as set forth in this agreement.</p>

        <p>The parties therefore agree as follows:</p>

        <h2><strong>1. EMPLOYMENT.</strong></h2>
        <ul>
          <li>
            <strong>(a) Position</strong>. The Company hereby employs the Employee in the position of <strong>{position}</strong> and the Employee hereby accepts this employment as of the effective date (as defined in section 25, the <strong>"Effective Date"</strong>). During his or her employment with the Company, the Employee shall devote his or her best efforts and substantially all of his or her business time and attention (except for vacation periods and reasonable periods of illness or other incapacities permitted by the Company's general employment policies) to the business of the Company.
          </li>
          <li>
            <strong>(b) Duties.</strong> The Employee shall perform duties that are customarily associated with his or her then-current title, consistent with the {formData.employer_business_type === 'limited_liability_company' ? 'operating agreement' : formData.employer_business_type === 'corporation' ? 'bylaws' : 'organizing documents'} of the Company and as required by the Company. The Employee shall perform his or her duties at any place or places as the Company reasonably designates.
          </li>
          <li>
            <strong>(c) Company Policies.</strong> The employment relationship between the parties will also be governed by the general employment policies and practices of the Company. If any terms of this agreement differ from or conflict with the Company's general employment policies or practices, this agreement will control.
          </li>
          <li>
            <strong>(d) At-Will Status.</strong> THE EMPLOYEE ACKNOWLEDGES THAT EMPLOYMENT WITH THE COMPANY IS FOR AN UNSPECIFIED DURATION AND CONSTITUTES "AT-WILL" EMPLOYMENT. THE EMPLOYEE FURTHER ACKNOWLEDGES THAT THIS EMPLOYMENT RELATIONSHIP MAY BE TERMINATED AT ANY TIME, WITH OR WITHOUT GOOD CAUSE OR FOR ANY OR NO CAUSE, AT THE OPTION OF EITHER THE COMPANY OR THE EMPLOYEE, WITH OR WITHOUT NOTICE.
          </li>
        </ul>

        <h2><strong>2. TERM AND TERMINATION.</strong></h2>
        <ul>
          <li>
            <strong>(a) Term.</strong> The term of this agreement will begin on <strong>{startDate}</strong> and continue until terminated by either party in accordance with subsection (b) or by law. The period during which the Employee is employed under this agreement is referred to as the "<strong>Employment Period</strong>."
          </li>
          <li>
            <strong>(b) Termination.</strong> Either party may, at any time, with or without cause, terminate this agreement by giving <strong>{notificationDays}</strong> days' written notice to the other party. If requested by the Company, the Employee shall continue to render his or her services pursuant to this agreement during this notice period, and will be paid his or her regular compensation until the last day of the Employee's employment (the <strong>"Termination Date"</strong>).
            {formData.severance_payment_available === 'yes' && formData.severance_amount && (
              <span> On the Termination Date, the Company shall pay the Employee a severance allowance of ${Number(formData.severance_amount).toLocaleString()}. Any amounts outstanding or owed by the Employee to the Company may be deducted from this severance allowance.</span>
            )}
          </li>
        </ul>

        <h2><strong>3. COMPENSATION.</strong></h2>
        <p>The Employee will be compensated for his or her services as follows:</p>
        <ul>
          <li>
            <strong>(a) Base Salary.</strong> The Company shall pay the Employee an annual base salary of <strong>{salary}</strong> (the <strong>"Salary"</strong>), payable in equal {formData.salary_installments === 'other' ? formData.salary_installments_other || '[FREQUENCY]' : formData.salary_installments || 'monthly'} installments at the end of each period during the Employment Period. The Salary may be subject to increases, as those may be determined from time to time by the Company.
          </li>
          
          {formData.employee_signing_bonus === 'yes' && (
            <li>
              <strong>(b) Signing Bonus.</strong> Within {formData.employee_sign_in_bonus_days || '[DAYS]'} days of the effective date, the Employee shall receive a sign-on bonus of ${formData.employee_signing_bonus_amount ? Number(formData.employee_signing_bonus_amount).toLocaleString() : '[AMOUNT]'}. If the Employee is terminated for cause or if the Employee terminates employment within {formData.employee_duration_return_bonus || '[YEARS]'} year(s) of the Effective Date, the Employee must make a pro-rated repayment of the sign-on bonus.
            </li>
          )}
          
          {formData.employee_bonus_eligibility === 'yes' && (
            <li>
              <strong>({formData.employee_signing_bonus === 'yes' ? 'c' : 'b'}) Incentive Compensation.</strong> In accordance with the Company's practices, policies, and procedures, the Employee may be eligible for a discretionary bonus award {formData.include_bonus_in_agreement === 'yes' && formData.employee_bonus_award ? formData.employee_bonus_award : ''} (the <strong>"Bonus"</strong>"). The Bonus, if any, will be based on the performance of the Company and the Employee and will be subject to typical payroll deductions and withholdings. A Bonus is not guaranteed compensation.
            </li>
          )}
          
          <li>
            <strong>({(formData.employee_signing_bonus === 'yes' && formData.employee_bonus_eligibility === 'yes') ? 'd' : (formData.employee_signing_bonus === 'yes' || formData.employee_bonus_eligibility === 'yes') ? 'c' : 'b'}) Other Nonmonetary Benefits.</strong> The Employee is entitled to certain other nonmonetary benefits, including vacation days, sick days, holidays, and paid time off, and {[
              formData.benefits1 && 'medical plan',
              formData.benefits2 && 'dental plan',
              formData.benefits3 && formData.other_nonmonetary_benefits && `other: ${formData.other_nonmonetary_benefits}`
            ].filter(Boolean).join(' and ') || 'standard benefits'}, in accordance with Company policies, which may be amended from time to time.
          </li>
          
          {formData.employee_eligible_stock_options === 'yes' && (
            <li>
              <strong>Stock Options.</strong> After {formData.employee_stock_qualify_years || '[YEARS]'} full year(s) of employment, the Employee will be considered for participation in the Company's stock option plan in accordance with the terms of that plan.
            </li>
          )}
          
          <li>
            <strong>Withholding.</strong> All sums payable to the Employee under this agreement will be reduced by federal, state, local, and other withholdings and similar taxes and payments required by applicable law.
          </li>
        </ul>

        <h2><strong>8. RETURN OF PROPERTY.</strong></h2>
        <p>
          Within <strong>{returnDays}</strong> days of the expiration or earlier termination of this agreement, the Employee shall return to the Company, retaining no copies or notes, all Company products, samples, models, property, and documents relating to the Company's business including reports, abstracts, lists, correspondence, information, computer files, computer disks, and other materials and copies of those materials obtained by the Employee during and in connection with his or her work with the Company.
        </p>

        {formData.employee_nonsolicitation_included === 'yes' && (
          <>
            <h2><strong>10. NONSOLICITATION.</strong></h2>
            <p>
              During the Employment Period and for a period of <strong>{formData.employee_nonsolicitation_years || '[YEARS]'}</strong> year(s) after, the employee may not:
            </p>
            <ul>
              <li>(a) canvass or solicit the business of (or procure or assist in the canvassing or soliciting of) any client, customer, or employee of the Company who is known to the Employee because of his or her association with the Company during the Employment Period for the purposes of competing with the Company;</li>
              <li>(b) accept (or procure the acceptance of) business from a client, customer, or employee of the Company known to the Employee because of his or her association with the Company during the Employment Period for purposes of competing with the Company. However, the Company may consent to this competition in writing; or</li>
              <li>(c) otherwise contact, approach, or solicit (or procure the contacting, approaching, or soliciting of) an entity known to the Employee because of his or her association with the Company before the Effective Date in a way that could be detrimental to the Company.</li>
            </ul>
          </>
        )}

        {formData.noncompetition_restriction_included === 'yes' && (
          <>
            <h2><strong>11. NONCOMPETITION.</strong></h2>
            <p>
              At the end of the Employment Period, by expiration or termination, the Employee may not engage, own, manage, control, operate, be employed by, participate in, or be connected with the ownership, management, operation, or control of a business similar to the type of business conducted by the Company for a period of <strong>{formData.employee_noncompetition_restriction_years || '[YEARS]'}</strong> years and within <strong>{formData.employee_noncompetition_restriction_miles || '[MILES]'}</strong> miles from the present location(s) of the Company's business.
            </p>
          </>
        )}

        <div className="mt-8 pt-8 border-t">
          <p className="text-center font-semibold">[SIGNATURE PAGE FOLLOWS]</p>
          <p>Each party is signing this agreement on the date stated opposite that party's signature.</p>
          
          <div className="mt-6">
            <table className="w-full border-collapse">
              <tbody>
                <tr>
                  <td className="py-4"></td>
                  <td className="py-4 font-semibold">{employerName}</td>
                </tr>
                <tr>
                  <td className="py-4">Date:______________________________</td>
                  <td className="py-4">By:____________________________________________________________</td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    Name: {formData.employer_signing_signer_name || '[SIGNER NAME]'}<br/>
                    Title: {formData.employer_signing_signer_title || '[SIGNER TITLE]'}
                  </td>
                </tr>
                <tr>
                  <td className="py-4">Date:______________________________</td>
                  <td className="py-4">By:____________________________________________________________</td>
                </tr>
                <tr>
                  <td></td>
                  <td>Name: {employeeName}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const FormEditor = () => (
    <div className="space-y-6">
      {renderSection("Basic Information", [
        renderInput('employer_name', 'Employer Name'),
        renderRadio('employer_type', 'Employer Type', ['Business', 'Individual']),
        
        shouldShowField({ employer_type: 'business' }) && renderSelect('employer_business_state', 'State of Organization', states),
        shouldShowField({ employer_type: 'business' }) && renderSelect('employer_business_type', 'Business Type', businessTypes),
        
        renderInput('employee_name', 'Employee Name'),
        renderTextarea('employer_describe_business', 'Business Description'),
        renderInput('employee_position', 'Employee Position/Title')
      ].filter(Boolean), null, "bg-slate-900")}

      {renderSection("Employment Terms", [
        renderInput('employment_start_date', 'Start Date', 'date'),
        renderInput('termination_notice_days', 'Termination Notice (Days)', 'number'),
        renderRadio('severance_payment_available', 'Severance Payment Available?', ['Yes', 'No']),
        
        shouldShowField({ severance_payment_available: 'yes' }) && renderInput('severance_amount', 'Severance Amount ($)', 'number')
      ].filter(Boolean), null, "bg-slate-800")}

      {renderSection("Compensation", [
        renderInput('employee_salary_amount', 'Annual Base Salary ($)', 'number'),
        renderRadio('salary_installments', 'Payment Frequency', ['Monthly', 'Weekly', 'Semi-monthly', 'Biweekly', 'Bimonthly', 'Other']),
        
        shouldShowField({ salary_installments: 'other' }) && renderInput('salary_installments_other', 'Other Payment Frequency'),
        
        renderRadio('employee_signing_bonus', 'Include Signing Bonus?', ['Yes', 'No']),
        
        shouldShowField({ employee_signing_bonus: 'yes' }) && renderInput('employee_sign_in_bonus_days', 'Days to Receive Signing Bonus', 'number'),
        shouldShowField({ employee_signing_bonus: 'yes' }) && renderInput('employee_signing_bonus_amount', 'Signing Bonus Amount ($)', 'number'),
        shouldShowField({ employee_signing_bonus: 'yes' }) && renderInput('employee_duration_return_bonus', 'Years to Return Bonus if Leaving Early', 'number'),
        
        renderRadio('employee_bonus_eligibility', 'Eligible for Other Bonuses?', ['Yes', 'No']),
        
        shouldShowField({ employee_bonus_eligibility: 'yes' }) && renderRadio('include_bonus_in_agreement', 'Define Bonus in Agreement?', ['Yes', 'No']),
        shouldShowField({ employee_bonus_eligibility: 'yes', include_bonus_in_agreement: 'yes' }) && renderTextarea('employee_bonus_award', 'Bonus Description'),
        
        <div key="benefits" className="space-y-2">
          <label className="font-medium text-slate-200">Benefits (check all that apply):</label>
          <div className="space-y-2">
            {renderCheckbox('benefits1', 'Medical')}
            {renderCheckbox('benefits2', 'Dental')}
            {renderCheckbox('benefits3', 'Other')}
          </div>
        </div>,
        
        shouldShowField({ benefits3: true }) && renderInput('other_nonmonetary_benefits', 'Other Benefits Description'),
        
        renderRadio('employee_eligible_stock_options', 'Eligible for Stock Options?', ['Yes', 'No']),
        shouldShowField({ employee_eligible_stock_options: 'yes' }) && renderInput('employee_stock_qualify_years', 'Years to Qualify for Stock Options', 'number')
      ].filter(Boolean), null, "bg-slate-900")}

      {renderSection("Property and Confidentiality", [
        renderInput('employee_property_return_days', 'Days to Return Company Property'),
        renderRadio('employee_confidentiality_obligations_time_limit', 'Time Limit on Confidentiality?', ['Yes', 'No']),
        
        shouldShowField({ employee_confidentiality_obligations_time_limit: 'yes' }) && renderSelect('confidentiality_duration', 'Confidentiality Duration', ['First', 'Second', 'Third', 'Fourth', 'Fifth'])
      ].filter(Boolean), null, "bg-slate-800")}

      {renderSection("Restrictions", [
        renderRadio('employee_nonsolicitation_included', 'Include Non-solicitation Clause?', ['Yes', 'No']),
        shouldShowField({ employee_nonsolicitation_included: 'yes' }) && renderInput('employee_nonsolicitation_years', 'Non-solicitation Period (Years)'),
        
        renderRadio('noncompetition_restriction_included', 'Include Non-competition Clause?', ['Yes', 'No']),
        shouldShowField({ noncompetition_restriction_included: 'yes' }) && renderInput('employee_noncompetition_restriction_years', 'Non-competition Period (Years)'),
        shouldShowField({ noncompetition_restriction_included: 'yes' }) && renderInput('employee_noncompetition_restriction_miles', 'Non-competition Distance (Miles)', 'number')
      ].filter(Boolean), null, "bg-slate-900")}

      {renderSection("Additional Provisions", [
        renderRadio('fidelity_bond_provision', 'Include Fidelity Bond?', ['Yes', 'No']),
        renderRadio('death_during_employment_provision', 'Include Death Benefit?', ['Yes', 'No']),
        
        shouldShowField({ death_during_employment_provision: 'yes' }) && renderInput('death_compensation_amount', 'Death Compensation Amount ($)', 'number'),
        shouldShowField({ death_during_employment_provision: 'yes' }) && renderInput('compensation_payment_duration', 'Days to Pay Death Benefit')
      ].filter(Boolean), null, "bg-slate-800")}

      {renderSection("Dispute Resolution", [
        <div key="dispute-method" className="space-y-4">
          <label className="font-medium text-slate-100">Dispute Resolution Method</label>
          <RadioGroup
            value={formData.dispute_resolution_method}
            onValueChange={(value) => handleInputChange('dispute_resolution_method', value)}
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
                        <Badge variant="outline" className="text-xs bg-purple-900/10 text-purple-200">Premium</Badge>
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
                        <Badge variant="outline" className="text-xs bg-green-900/10 text-green-200">Recommended</Badge>
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
        </div>,
        
        // Rapid Ruling Configuration
        shouldShowField({ dispute_resolution_method: 'rapid-ruling' }) && (
          <div key="rapid-ruling-config" className="bg-purple-900/80 p-4 rounded-lg border border-purple-700">
            <h4 className="font-semibold text-purple-100 mb-3">Rapid Ruling Configuration</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderInput('rapid_ruling_company_email', 'Company Email for Service', 'email')}
              {renderInput('rapid_ruling_employee_email', 'Employee Email for Service', 'email')}
            </div>
            <div className="mt-3 text-sm text-purple-100">
              <strong>Includes:</strong> 100% online arbitration, 21-30 day resolution, transparent cost structure ($275-$1,200 filing fees)
            </div>
          </div>
        ),
        
        // Traditional Court Configuration
        shouldShowField({ dispute_resolution_method: 'court' }) && (
          <div key="court-config" className="bg-blue-900/80 p-4 rounded-lg border border-blue-700">
            <h4 className="font-semibold text-blue-100 mb-3">Court Jurisdiction Settings</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderSelect('court_state', 'Governing Law State', states)}
              {renderInput('court_county', 'Court County')}
            </div>
          </div>
        )
      ].filter(Boolean), null, "bg-slate-800")}

      {renderSection("Contact Information", [
        <div key="employer-contact" className="space-y-4">
          <h4 className="font-semibold text-slate-100">Employer Contact Information</h4>
          {renderInput('employer_contact_name', 'Contact Name/Title')}
          {renderInput('employer_address_street_address', 'Street Address')}
          {renderInput('employer_address_city', 'City')}
          {renderSelect('employer_address_state', 'State', states)}
          {renderInput('employer_address_zip', 'ZIP Code')}
          {renderInput('employer_address_email', 'Email', 'email')}
        </div>,
        
        <div key="employee-contact" className="space-y-4">
          <h4 className="font-semibold text-slate-100">Employee Contact Information</h4>
          {renderInput('employee_address_street_address', 'Street Address')}
          {renderInput('employee_address_city', 'City')}
          {renderSelect('employee_address_state', 'State', states)}
          {renderInput('employee_address_zip', 'ZIP Code')}
          {renderInput('employee_address_email', 'Email', 'email')}
        </div>
      ], null, "bg-slate-900")}

      {renderSection("Signatures", [
        <div key="signatures" className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-slate-100 mb-2">
              Digital Signatures
            </h3>
            <p className="text-slate-300">
              Both parties must sign this agreement to make it legally binding
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Employer Signature */}
            <SignaturePadComponent
              onSignatureChange={(signature) => handleInputChange('employer_signature', signature)}
              label={`${formData.employer_name || 'Employer'} Signature`}
              required={true}
            />

            {/* Employee Signature */}
            <SignaturePadComponent
              onSignatureChange={(signature) => handleInputChange('employee_signature', signature)}
              label={`${formData.employee_name || 'Employee'} Signature`}
              required={true}
            />
          </div>

          {/* Date of Signing */}
          <Card className="bg-slate-900 border border-slate-700 shadow-sm">
            <CardContent className="p-6">
              <div className="space-y-2">
                <Label htmlFor="signed_date" className="text-slate-100 font-medium">
                  Date of Signing
                </Label>
                <input
                  id="signed_date"
                  type="date"
                  value={formData.signed_date || ''}
                  onChange={(e) => handleInputChange('signed_date', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-800 text-slate-100"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Completion Status */}
          <Card className={`border-2 ${(formData.employer_signature && formData.employee_signature && formData.signed_date) ? 'border-green-600 bg-green-900/40' : 'border-slate-700 bg-slate-900'}`}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                {(formData.employer_signature && formData.employee_signature && formData.signed_date) ? (
                  <>
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <div>
                      <h4 className="text-green-200 font-semibold">Agreement Ready for Execution</h4>
                      <p className="text-slate-200 text-sm">
                        All signatures and dates have been captured. The agreement is ready to be finalized.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-6 h-6 border-2 border-slate-400 rounded-full" />
                    <div>
                      <h4 className="text-slate-100 font-semibold">Signatures Required</h4>
                      <p className="text-slate-300 text-sm">
                        Please complete all signatures and provide the signing date to finalize the agreement.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      ], null, "bg-slate-800")}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-0 bg-slate-900">
      {/* Header Image with Frosted Glass Card */}
      <div className="relative w-full h-64 md:h-80 lg:h-96 flex items-center justify-center">
        <img
          src={currentTabConfig.image}
          alt={currentTabConfig.title + ' Header'}
          className="w-full h-full object-cover rounded-b-2xl shadow-lg border-b-2 border-slate-700"
        />
        {/* Frosted Glass Card */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-8 py-4 rounded-2xl shadow-xl bg-slate-900/80 backdrop-blur-md border border-slate-700 min-w-[220px] text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-100 drop-shadow-lg">{currentTabConfig.title}</h2>
        </div>
      </div>

      {/* Tabs below the image */}
      <div className="w-full flex justify-center mt-4">
        <div className="flex gap-4 bg-slate-900/80 rounded-xl shadow px-4 py-2 backdrop-blur-md border border-slate-700">
          {TAB_CONFIG.map(tab => (
            <button
              key={tab.value}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors focus:outline-none ${currentTab === tab.value ? 'bg-blue-600 text-white shadow' : 'bg-transparent text-slate-200 hover:bg-blue-900'}`}
              onClick={() => setCurrentTab(tab.value)}
            >
              {tab.value === 'editor' && <Edit className="w-4 h-4" />}
              {tab.value === 'preview' && <Eye className="w-4 h-4" />}
              {tab.value === 'summary' && <User className="w-4 h-4" />}
              {tab.title}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-8">
        {currentTab === 'editor' && (
          <>
            <FormEditor />
            <div className="mt-6 flex justify-center">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Generate Agreement
              </button>
            </div>
          </>
        )}
        {currentTab === 'preview' && (
          <div className="bg-slate-900 border rounded-lg p-8 shadow-sm text-slate-100">
            <div className="max-w-none text-slate-100">
              {generatePreview()}
            </div>
          </div>
        )}
        {currentTab === 'summary' && (
          <div className="bg-slate-900 border rounded-lg p-8 shadow-sm text-slate-100 text-center">
            <h3 className="text-xl font-bold mb-4">Agreement Summary</h3>
            <p className="text-slate-300">This is a placeholder for a summary or analytics view of the agreement. You can customize this section as needed.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmploymentAgreementEditor;