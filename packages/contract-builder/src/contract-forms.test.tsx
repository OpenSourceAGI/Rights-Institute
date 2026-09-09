/**
 * @fileoverview Covers the contract-builder form steps. Every field here ends
 * up in a legal document a user signs, so what matters is that each control is
 * labeled, reflects the data it was given, and reports edits back through the
 * single `updateContractData(field, value)` seam the builder collects state on.
 */

import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import type { ContractData } from './contract';
import BasicInfoForm from './BasicInfoForm';
import ServicesForm from './ServicesForm';
import ContractTypeSelector from './ContractTypeSelector';

/** A blank contract, with only the fields these steps read filled in. */
const contract = (overrides: Partial<ContractData> = {}): ContractData =>
  ({
    clientName: '',
    clientAddress: '',
    contractorName: '',
    contractorAddress: '',
    contractType: 'independent-contractor',
    services: '',
    useExhibitA: false,
    paymentRates: '',
    expenseType: 'contractor-pays',
    reimbursableExpenses: '',
    contractorStatus: [],
    insuranceTypes: [],
    autoInsuranceAmount: '',
    generalInsuranceAmount: '',
    termEndDate: '',
    terminationType: 'no-cause',
    terminationNotice: '',
    disputeResolution: 'court',
    confidentialityOther: '',
    allowAssignment: false,
    ...overrides,
  }) as ContractData;

describe('BasicInfoForm', () => {
  it('labels every party field', () => {
    render(
      <BasicInfoForm contractData={contract()} updateContractData={vi.fn()} />,
    );
    for (const label of [
      'Client Name',
      'Contractor Name',
      'Client Business Address',
      'Contractor Business Address',
    ]) {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    }
  });

  it('shows the values it was given', () => {
    render(
      <BasicInfoForm
        contractData={contract({
          clientName: 'Acme Inc',
          contractorName: 'Jane Doe',
        })}
        updateContractData={vi.fn()}
      />,
    );
    expect(screen.getByLabelText('Client Name')).toHaveValue('Acme Inc');
    expect(screen.getByLabelText('Contractor Name')).toHaveValue('Jane Doe');
  });

  it.each([
    ['Client Name', 'clientName'],
    ['Contractor Name', 'contractorName'],
    ['Client Business Address', 'clientAddress'],
    ['Contractor Business Address', 'contractorAddress'],
  ])('reports an edit to %s under the %s field', (label, field) => {
    const updateContractData = vi.fn();
    render(
      <BasicInfoForm
        contractData={contract()}
        updateContractData={updateContractData}
      />,
    );

    fireEvent.change(screen.getByLabelText(label), {
      target: { value: 'typed' },
    });

    expect(updateContractData).toHaveBeenCalledWith(field, 'typed');
  });

  it('advances to the services step', () => {
    const onTabChange = vi.fn();
    render(
      <BasicInfoForm
        contractData={contract()}
        updateContractData={vi.fn()}
        onTabChange={onTabChange}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /Next: Services/ }));
    expect(onTabChange).toHaveBeenCalledWith('services');
  });

  it('disables Previous on the first step', () => {
    render(
      <BasicInfoForm contractData={contract()} updateContractData={vi.fn()} />,
    );
    expect(screen.getByRole('button', { name: /Previous/ })).toBeDisabled();
  });

  it('does not throw when no tab handler is wired', () => {
    render(
      <BasicInfoForm contractData={contract()} updateContractData={vi.fn()} />,
    );
    expect(() =>
      fireEvent.click(screen.getByRole('button', { name: /Next: Services/ })),
    ).not.toThrow();
  });
});

describe('ServicesForm', () => {
  it('asks for a detailed description by default', () => {
    render(
      <ServicesForm contractData={contract()} updateContractData={vi.fn()} />,
    );
    expect(
      screen.getByLabelText('Detailed Services Description'),
    ).toBeInTheDocument();
  });

  it('asks for only a summary once Exhibit A is in play', () => {
    render(
      <ServicesForm
        contractData={contract({ useExhibitA: true })}
        updateContractData={vi.fn()}
      />,
    );
    expect(screen.getByLabelText('Brief Service Summary')).toBeInTheDocument();
  });

  it('explains what Exhibit A means once it is checked', () => {
    const { rerender } = render(
      <ServicesForm contractData={contract()} updateContractData={vi.fn()} />,
    );
    expect(screen.queryByText(/separate detailed document/)).toBeNull();

    rerender(
      <ServicesForm
        contractData={contract({ useExhibitA: true })}
        updateContractData={vi.fn()}
      />,
    );
    expect(screen.getByText(/separate detailed document/)).toBeInTheDocument();
  });

  it('reports the Exhibit A toggle', () => {
    const updateContractData = vi.fn();
    render(
      <ServicesForm
        contractData={contract()}
        updateContractData={updateContractData}
      />,
    );

    fireEvent.click(screen.getByRole('checkbox'));
    expect(updateContractData).toHaveBeenCalledWith('useExhibitA', true);
  });

  it('reports the services text', () => {
    const updateContractData = vi.fn();
    render(
      <ServicesForm
        contractData={contract()}
        updateContractData={updateContractData}
      />,
    );

    fireEvent.change(screen.getByLabelText('Detailed Services Description'), {
      target: { value: 'Build the thing' },
    });
    expect(updateContractData).toHaveBeenCalledWith('services', 'Build the thing');
  });

  it('shows the services text it was given', () => {
    render(
      <ServicesForm
        contractData={contract({ services: 'Design work' })}
        updateContractData={vi.fn()}
      />,
    );
    expect(
      screen.getByLabelText('Detailed Services Description'),
    ).toHaveValue('Design work');
  });
});

describe('ContractTypeSelector', () => {
  it('offers all three relationship types', () => {
    render(
      <ContractTypeSelector
        contractData={contract()}
        updateContractData={vi.fn()}
      />,
    );
    for (const title of [
      'Independent Contractor',
      'Employee Agreement',
      'Co-Founders Agreement',
    ]) {
      expect(screen.getByText(title)).toBeInTheDocument();
    }
  });

  it('explains what each type implies', () => {
    render(
      <ContractTypeSelector
        contractData={contract()}
        updateContractData={vi.fn()}
      />,
    );
    expect(screen.getByText('Tax responsibility on contractor')).toBeInTheDocument();
    expect(screen.getByText('Employee benefits')).toBeInTheDocument();
    expect(screen.getByText('Vesting schedules')).toBeInTheDocument();
  });

  it('records the type the user picks', () => {
    const updateContractData = vi.fn();
    render(
      <ContractTypeSelector
        contractData={contract()}
        updateContractData={updateContractData}
      />,
    );

    fireEvent.click(screen.getByText('Co-Founders Agreement'));
    expect(updateContractData).toHaveBeenCalledWith(
      'contractType',
      'co-founder',
    );
  });
});
