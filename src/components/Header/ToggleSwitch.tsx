import { clsx } from 'clsx';
import React from 'react';

// トグルスイッチのバリエーション型定義
type ToggleSwitchVariant = 'theme' | 'default';

// バリエーションごとのスタイル定義
const variantStyles = {
  // テーマ切り替え用（オレンジ/ネイビー）
  theme: {
    unchecked: 'bg-orange-bg',
    checked: 'peer-checked:bg-navy',
    focus: 'peer-focus:ring-orange-focus dark:peer-focus:ring-navy-focus',
  },
  // デフォルト（汎用的なグレー/ブルー）
  default: {
    unchecked: 'bg-gray-300',
    checked: 'peer-checked:bg-blue-500',
    focus: 'peer-focus:ring-blue-300',
  },
};

// ToggleSwitchコンポーネントのProps型定義
type ToggleSwitchProps = {
  checked: boolean;
  // トグルに割り当てる関数を指定(返り値なし)
  onChange: (checked: boolean) => void;
  // スタイルのバリエーション
  variant?: ToggleSwitchVariant;
  // トグルlabel
  label?: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  // SSR時、トグルの無効化
  disabled?: boolean;
};


export const ToggleSwitch = ({
  checked,
  onChange,
  variant = 'default',
  label,
  className,
  ariaLabel,
  disabled = false,
}: ToggleSwitchProps): React.ReactElement => {
  // バリエーションに応じたスタイルを取得
  const styles = variantStyles[variant];
  return (
    <label
      className={clsx(
        'relative inline-flex items-center',
        disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
        className
      )}
    >
      <input
        aria-label={!label ? ariaLabel : undefined}
        checked={checked}
        className="peer sr-only"
        disabled={disabled}
        type="checkbox"
        onChange={(e) => onChange(e.target.checked)}
      />
      <div
        className={clsx(
          // 基本スタイル
          'peer h-6 w-11 rounded-full',
          // バリエーションごとの背景色
          styles.unchecked,
          styles.checked,
          // つまみのスタイル
          'after:absolute after:left-[2px] after:top-[2px]',
          'after:h-5 after:w-5 after:rounded-full',
          'after:border after:border-gray-300 after:bg-white',
          'after:transition-all after:content-[\'\']',
          // チェック時のつまみの動き
          'peer-checked:after:translate-x-full',
          'peer-checked:after:border-white',
          // フォーカス時のスタイル
          'peer-focus:outline-none peer-focus:ring-4',
          styles.focus,
          // ダークモード時のスタイル
          'dark:border-gray-600 dark:bg-gray-500'
        )}
      />
      {label && <span className="text-sm font-medium text-gray-900 dark:text-gray-300">{label}</span>}
    </label>
  );
};
