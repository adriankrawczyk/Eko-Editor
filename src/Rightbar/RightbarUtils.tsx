interface DropdownProps {
  label: string;
  options: string[];
  defaultValue: string;
}

interface InputProps {
  label: string;
  placeholder: string;
}

interface SliderProps {
  label: string;
  min: number;
  max: number;
  step: number;
}

interface ColorProps {
  label: string;
}

export const renderDynamicDropdown = ({ label, options, defaultValue }: DropdownProps) => {
  return (
    <div className='mb-4'>
      <label className='block text-sm font-medium text-gray-700 mb-1'>{label}</label>
      <select className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export const renderDynamicInput = ({ label, placeholder }: InputProps) => {
  return (
    <div className='mb-4'>
      <label className='block text-sm font-medium text-gray-700 mb-1'>{label}</label>
      <input className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' type='text' placeholder={placeholder} />
    </div>
  );
};

export const renderDynamicSlider = ({ label, min, max, step }: SliderProps) => {
  return (
    <div className='mt-4'>
      <label className='block text-sm font-medium text-gray-700 mb-1'>{label}</label>
      <input className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' type='range' min={min} max={max} step={step} />
    </div>
  );
};

export const renderDynamicColor = ({ label }: ColorProps) => {
  return (
    <div className='mb-4'>
      <label className='block text-sm font-medium text-gray-700 mb-1'>{label}</label>
      <input className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' type='color' />
    </div>
  );
};
