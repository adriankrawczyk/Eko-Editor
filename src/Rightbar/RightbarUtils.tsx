import React from 'react';

interface DropdownProps {
  id: string;
  label: string;
  options: string[];
  defaultValue: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

interface InputProps {
  id: string;
  label: string;
  placeholder: string;
  defaultValue: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
interface NumericInputProps extends InputProps {
  min?: number;
  max?: number;
}

interface SliderProps {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface ColorProps {
  id: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const renderDropdown = ({ id, label, options, defaultValue, onChange }: DropdownProps) => {
  return (
    <div className='mb-4'>
      <label htmlFor={id} className='block text-sm font-medium text-gray-700 mb-1'>
        {label}
      </label>
      <select id={id} className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' onChange={onChange}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export const renderInput = ({ id, label, placeholder, onChange }: InputProps) => {
  return (
    <div className='mb-4'>
      <label htmlFor={id} className='block text-sm font-medium text-gray-700 mb-1'>
        {label}
      </label>
      <input id={id} className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' type='text' placeholder={placeholder} onChange={onChange} />
    </div>
  );
};
export const renderNumericInput = ({ id, label, defaultValue, placeholder, onChange, min, max }: NumericInputProps) => {
  return (
    <div className='mb-4'>
      <label htmlFor={id} className='block text-sm font-medium text-gray-700 mb-1'>
        {label}
      </label>
      <input id={id} className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' type='number' min={min} max={max} defaultValue={defaultValue} placeholder={placeholder} onChange={onChange} />
    </div>
  );
};

export const renderSlider = ({ id, label, min, max, step, onChange }: SliderProps) => {
  return (
    <div className='mt-4'>
      <label htmlFor={id} className='block text-sm font-medium text-gray-700 mb-1'>
        {label}
      </label>
      <input id={id} className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' type='range' min={min} max={max} step={step} onChange={onChange} />
    </div>
  );
};

export const renderColor = ({ id, label, onChange }: ColorProps) => {
  return (
    <div className='mb-4'>
      <label htmlFor={id} className='block text-sm font-medium text-gray-700 mb-1'>
        {label}
      </label>
      <input id={id} className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' type='color' onChange={onChange} />
    </div>
  );
};
