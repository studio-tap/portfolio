// Reactライブラリのインポート / コンポーネント作成に必要な基本機能を提供 / ES6 import構文
import { clsx } from 'clsx';
import React from 'react';
// clsxライブラリのインポート / 条件付きクラス名結合のためのユーティリティ / ES6 named import構文

// テキストスタイルのバリアント定義 / 各バリアントに対応するTailwind CSSクラスをマッピング / TypeScriptのオブジェクトリテラル + const assertion
const variants = {
  // 通常の本文用スタイル / 標準サイズ・行間・字間を定義 / オブジェクトのプロパティ定義
  'body-normal': 'text-s leading-normal tracking-tight',
  // ヘッダーナビゲーション用スタイル / 大きめサイズ・行間なし・字間詰め / オブジェクトのプロパティ定義
  'header-nav': 'text-xl leading-none tracking-tight',
  // ロゴテキスト用スタイル / 標準サイズ・行間なし・字間なし / オブジェクトのプロパティ定義
  'logo-text': 'text-s leading-none tracking-none',
  // Aboutセクションタイトル用スタイル / 中サイズ・広い行間・字間詰め / オブジェクトのプロパティ定義
  'about-title': 'text-m leading-loose tracking-tight',
  // カードメタ情報用スタイル / 標準サイズ・通常行間・字間詰め / オブジェクトのプロパティ定義
  'card-meta': 'text-s leading-normal tracking-tight',
  // カード技術タグ用スタイル / 小サイズ・行間なし・字間なし / オブジェクトのプロパティ定義
  'card-technology': 'text-xs leading-none tracking-none',
};

// バリアント型の定義 / variantsオブジェクトのキーを型として抽出 / TypeScript keyof演算子 + typeof演算子
type Variant = keyof typeof variants;

// 空行 / コードブロックの視覚的分離 / -

// 基本Propsの型定義 / ジェネリック型でコンポーネント要素を受け取る / TypeScript Generics + type alias
type BaseTypographyProps<C extends React.ElementType> = {
  // レンダリングする要素の指定 / 任意のHTML要素またはReactコンポーネントを受け入れ / TypeScript optional property
  as?: C;
  // スタイルバリアントの指定 / 事前定義されたバリアントから選択 / TypeScript optional property
  variant?: Variant;
  // 追加CSSクラス名の指定 / カスタムスタイルの上書き・追加用 / TypeScript optional property
  className?: string;
  // 子要素の指定 / 表示するテキストや要素を受け取る / TypeScript required property + React.ReactNode型
  children: React.ReactNode;
};

// 完全なProps型の定義 / 基本Propsとネイティブ要素のPropsを結合し、重複を除外 / TypeScript intersection type + Omit utility type
type TypographyProps<C extends React.ElementType> = BaseTypographyProps<C> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof BaseTypographyProps<C>>;

// Typographyコンポーネントのエクスポート / ジェネリック関数コンポーネントとして定義、デフォルトは<p>要素 / TypeScript Generics + arrow function + named export
export const Typography = <C extends React.ElementType = 'p'>({
  // レンダリング要素の受け取り / propsから分割代入で取得 / ES6 destructuring
  as,
  // バリアントの受け取り / デフォルト値は'body-normal' / ES6 destructuring + default parameter
  variant = 'body-normal',
  // 子要素の受け取り / 表示内容を取得 / ES6 destructuring
  children,
  // 追加クラス名の受け取り / カスタムスタイル用 / ES6 destructuring
  className,
  // その他のpropsの受け取り / ネイティブ要素の属性を全て受け入れ / ES6 rest parameter
  ...rest
}: TypographyProps<C>): React.ReactElement => {
  // 実際にレンダリングする要素の決定 / asが指定されていなければ'p'を使用 / 論理OR演算子
  const Component = as ?? 'p';
  // バリアントに対応するクラス名の取得 / variantsオブジェクトから該当スタイルを抽出 / オブジェクトのブラケット記法
  const variantClass = variants[variant];

  // JSXの返却開始 / コンポーネントの描画内容を定義 / JSX return statement
  return (
    // 動的コンポーネントのレンダリング / Componentに格納された要素を描画、clsxでクラス名を結合、残りのpropsを展開 / JSX + spread operator
    <Component
      className={clsx(variantClass, className)}
      {...rest}
    >
      {/* 子要素の描画 / propsで受け取った内容を表示 / JSX expression */}
      {children}
    </Component>
  );
};
