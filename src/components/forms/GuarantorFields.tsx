import React from 'react';
import type  { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { LoanFormData } from '../../types';

interface GuarantorFieldsProps {
  register: UseFormRegister<LoanFormData>;
  errors: FieldErrors<LoanFormData>;
}

const GuarantorFields: React.FC<GuarantorFieldsProps> = ({ register, errors }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Guarantors (2 required)</h3>
      
      {[0, 1].map((index) => (
        <div key={index} className="border rounded-lg p-4 space-y-4">
          <h4 className="font-medium text-gray-700">Guarantor {index + 1}</h4>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              {...register(`guarantors.${index}.name` as const, {
                required: 'Guarantor name is required',
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.guarantors?.[index]?.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.guarantors[index]?.name?.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ID Number *
            </label>
            <input
              type="text"
              {...register(`guarantors.${index}.idNumber` as const, {
                required: 'ID number is required',
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'ID number must contain only numbers',
                },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.guarantors?.[index]?.idNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.guarantors[index]?.idNumber?.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Number *
            </label>
            <input
              type="tel"
              {...register(`guarantors.${index}.contact` as const, {
                required: 'Contact number is required',
                pattern: {
                  value: /^[+]?[0-9\s-()]+$/,
                  message: 'Please enter a valid phone number',
                },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.guarantors?.[index]?.contact && (
              <p className="text-red-500 text-sm mt-1">
                {errors.guarantors[index]?.contact?.message}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GuarantorFields;