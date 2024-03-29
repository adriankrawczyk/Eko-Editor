import React from 'react';

interface DropdownProps {
  id: string;
  label: string;
  options: string[];
  defaultValue: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
interface ButtonProps {
  id: string;
  label: string;
  onClick: () => void;
}

interface ColorProps {
  id: string;
  label: string;
  defaultValue: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
interface PhotoProps {
  id: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export const renderCheckbox = ({ id, label, checked, onChange }: CheckboxProps) => {
  return (
    <div className='mb-4'>
      <div className='flex items-center'>
        <input id={id} type='checkbox' className='form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out' checked={checked} onChange={onChange} />
        <label htmlFor={id} className='ml-2 block text-sm font-medium text-gray-700'>
          {label}
        </label>
      </div>
    </div>
  );
};

export const renderDropdown = ({ id, label, options, defaultValue, onChange }: DropdownProps) => {
  const handleInputCreation = () => {
    const inputElement = document.getElementById(id) as HTMLInputElement;
    inputElement.value = defaultValue;
  };

  setTimeout(handleInputCreation, 0);
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

export const renderInput = ({ id, label, defaultValue, placeholder, onChange }: InputProps) => {
  const handleInputCreation = () => {
    const inputElement = document.getElementById(id) as HTMLInputElement;
    inputElement.value = defaultValue;
  };

  setTimeout(handleInputCreation, 0);
  return (
    <div className='mb-4'>
      <label htmlFor={id} className='block text-sm font-medium text-gray-700 mb-1'>
        {label}
      </label>
      <input id={id} className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' type='text' defaultValue={defaultValue} placeholder={placeholder} onChange={onChange} />
    </div>
  );
};
export const renderNumericInput = ({ id, label, defaultValue, placeholder, onChange, min, max }: NumericInputProps) => {
  const handleInputCreation = () => {
    const inputElement = document.getElementById(id) as HTMLInputElement;
    inputElement.value = defaultValue;
  };

  setTimeout(handleInputCreation, 0);

  return (
    <div className='mb-4'>
      <label htmlFor={id} className='block text-sm font-medium text-gray-700 mb-1'>
        {label}
      </label>
      <input id={id} className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' type='number' min={min} max={max} defaultValue={defaultValue} placeholder={placeholder} onChange={onChange} />
    </div>
  );
};

export const renderPhoto = ({ id, label, onChange }: PhotoProps) => {
  return (
    <div className='mb-4'>
      <label htmlFor={id} className='block text-sm font-medium text-gray-700 mb-1'>
        {label}
      </label>
      <input id={id} className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' type='file' accept='image/*' onChange={onChange} />
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

export const renderColorInput = ({ id, label, defaultValue, onChange }: ColorProps) => {
  const handleInputCreation = () => {
    const inputElement = document.getElementById(id) as HTMLInputElement;
    inputElement.value = defaultValue;
  };

  setTimeout(handleInputCreation, 0);
  return (
    <div className='mt-4'>
      <label htmlFor={id} className='block text-sm font-medium text-gray-700'>
        {label}
      </label>
      <input id={id} type='color' defaultValue={defaultValue} onChange={onChange} className='mb-4 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50' />
    </div>
  );
};

export const renderButton = ({ id, label, onClick }: ButtonProps): JSX.Element => {
  return (
    <div className='mb-4'>
      <button id={id} className='px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' onClick={onClick}>
        {label}
      </button>
    </div>
  );
};
