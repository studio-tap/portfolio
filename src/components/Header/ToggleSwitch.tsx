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
    <label
      className={`relative inline-flex items-center ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'} ${className}`}
    >
      <input
        aria-label={!label ? ariaLabel : undefined}
        checked={checked}
        className="peer sr-only"
        disabled={disabled}
        type="checkbox"
        onChange={(e) => onChange(e.target.checked)}
      />
      <div className="peer h-6 w-11 rounded-full bg-orange-bg after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-navy peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-focus dark:border-gray-600 dark:bg-gray-500 dark:peer-focus:ring-navy-focus" />
      {label && <span className="text-sm font-medium text-gray-900 dark:text-gray-300">{label}</span>}
    </label>
  );
};
