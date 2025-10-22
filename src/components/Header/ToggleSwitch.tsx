import React from 'react';

type ToggleSwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
};

export const ToggleSwitch = ({
  checked,
  onChange,
  label,
  className,
  ariaLabel,
  disabled = false,
}: ToggleSwitchProps): React.ReactElement => {
  return (
    <label className={`relative inline-flex items-center ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'} ${className}`}>
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        aria-label={ariaLabel}
        disabled={disabled}
      />
      <div className="w-11 h-6 bg-orange-bg dark:bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-focus dark:peer-focus:ring-navy-focus rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-navy"></div>
      {label && (
        <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
          {label}
        </span>
      )}
    </label>
  );
};