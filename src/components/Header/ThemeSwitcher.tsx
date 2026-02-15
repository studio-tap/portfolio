// Client Component宣言（Next.js App Router）
// このコンポーネントはブラウザで実行される
'use client';

// next-themesのuseThemeフックをインポート
import { useTheme } from 'next-themes';
// Reactのフックをインポート
import React, { useEffect, useState } from 'react';

// トグルスイッチコンポーネント
import { ToggleSwitch } from './ToggleSwitch';

// アイコンコンポーネント
import { MoonIcon } from '@/components/icons/MoonIcon';
import { SunIcon } from '@/components/icons/SunIcon';

// ThemeSwitcherコンポーネント
// 目的: ライトモードとダークモードを切り替えるUI
// 役割: next-themesを使用したテーマ切り替え機能を提供
// 使用箇所: Header
export const ThemeSwitcher = (): React.ReactElement => {
  // next-themesのフックを使用
  // setTheme: テーマを設定する関数
  // resolvedTheme: 実際に適用されているテーマ（'light' or 'dark'）
  const { setTheme, resolvedTheme } = useTheme();
  // コンポーネントがマウントされたかどうかの状態
  // SSR時はテーマが確定しないため、マウント後にトグルを有効化
  const [mounted, setMounted] = useState(false);

  // コンポーネントがマウントされた後に`mounted`状態をtrueに設定
  // これにより、SSRとクライアントサイドのハイドレーション時の不一致を防ぎ、
  // クライアントサイドでテーマが解決された後にトグルスイッチが有効になる
  useEffect(() => {
    setMounted(true);
  }, []);

  // 現在のテーマがダークモードかどうかを判定
  // resolvedThemeはSSR時にはundefinedになる可能性があるため、その場合はデフォルトでライトモードとして扱う
  // これにより、SSR時には常にライトモードの見た目で初期描画され、ハイドレーション後に正しいテーマが適用される
  const isDarkMode = resolvedTheme === 'dark';

  // トグルスイッチの変更イベントハンドラー
  // checkedがtrue（ON）の場合、テーマを'dark'に設定
  // checkedがfalse（OFF）の場合、テーマを'light'に設定
  const handleToggleChange = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light');
  };

  return (
    <div className="flex items-center">
      {/* 太陽アイコン（ライトモード） */}
      <SunIcon />

      {/* トグルスイッチ */}
      <ToggleSwitch
        ariaLabel="ダークモード切り替え"
        checked={isDarkMode}
        className="mx-1"
        disabled={!mounted}
        variant="theme"
        onChange={handleToggleChange}
      />

      {/* 月アイコン（ダークモード） */}
      <MoonIcon />
    </div>
  );
};
