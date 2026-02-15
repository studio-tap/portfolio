import nextPlugin from '@next/eslint-plugin-next';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

const eslintConfig = [
  // ========================================
  // 除外設定
  // ========================================
  {
    ignores: [
      '**/*.test.ts',
      '**/*.test.tsx',
      '**/*.spec.ts',
      '**/*.spec.tsx',
      '.next/**',
      'out/**',
      'dist/**',
      'build/**',
      'node_modules/**',
      'coverage/**',
      '*.config.js',
      '*.config.ts',
      '*.config.mjs',
      'next-env.d.ts',  // Next.js自動生成ファイル
    ],
  },

  // ========================================
  // TypeScript設定（型情報を使用）
  // ========================================
  ...tseslint.configs.recommendedTypeChecked,

  // ========================================
  // カスタムルール
  // ========================================
  {
    // 型情報を使用するルールのためのパーサー設定
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',  // tsconfig.jsonのパス
        tsconfigRootDir: import.meta.dirname,  // プロジェクトルート
      },
    },

    plugins: {
      '@next/next': nextPlugin,
      'react': reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
      'import': importPlugin,
      'unused-imports': unusedImports,
    },
    rules: {
      // Next.js推奨ルール
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,

      // ========================================
      // 1. エラー検出系（必須）
      // ========================================

      // console.log等の使用を制限
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error'], // warn/errorは許可
        },
      ],

      // debugger文の使用を禁止
      'no-debugger': 'error',

      // alert/confirm/promptの使用を制限
      'no-alert': 'warn',

      // eval()の使用を禁止
      // XSS攻撃等のセキュリティリスクを防ぐ
      'no-eval': 'error',

      // 暗黙のeval()を禁止
      // setTimeout/setIntervalでの文字列実行を防ぐ
      'no-implied-eval': 'error',

      // varの使用を禁止
      'no-var': 'error',

      // 再代入しない変数はconstを強制
      'prefer-const': 'error',

      // ===と!==の使用を強制
      'eqeqeq': ['error', 'always'],

      // if/for等の波括弧を強制
      'curly': ['error', 'all'],

      // 定義前の変数・関数の使用を禁止
      'no-use-before-define': [
        'error',
        {
          functions: false, // 関数宣言は巻き上げOK
          classes: true, // クラスは禁止
          variables: true, // 変数は禁止
        },
      ],

      // 外側のスコープの変数を隠す変数を検出
      'no-shadow': 'warn',

      // 関数の引数の再代入を禁止
      'no-param-reassign': [
        'warn',
        {
          props: false, // プロパティの変更は許可（Reactのstate等）
        },
      ],

      // return文での代入を禁止
      'no-return-assign': 'error',

      // Error以外のthrowを禁止
      'no-throw-literal': 'error',

      // 空のブロックを禁止
      'no-empty': 'error',

      // 到達不可能なコードを検出
      'no-unreachable': 'error',

      // switch文のfallthrough検出
      'no-fallthrough': 'error',

      // switch文の重複case検出
      'no-duplicate-case': 'error',

      // 常に真/偽の条件式を検出(if (true))
      'no-constant-condition': 'error',

      // オブジェクトの重複キーを検出
      'no-dupe-keys': 'error',

      // 関数の重複引数を検出
      'no-dupe-args': 'error',

      // ========================================
      // 2. TypeScript専用（型安全）
      // ========================================

      // any型の使用を警告
      '@typescript-eslint/no-explicit-any': 'warn',

      // 未使用変数の検出（unused-importsに任せる）
      '@typescript-eslint/no-unused-vars': 'off',

      // type importの統一
      // import { User } → import type { User }
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
        },
      ],

      // 副作用のあるtype importを禁止
      '@typescript-eslint/no-import-type-side-effects': 'error',

      // type exportの統一
      '@typescript-eslint/consistent-type-exports': 'error',

      // 安全でない代入を禁止
      // any型からの代入を検出
      '@typescript-eslint/no-unsafe-assignment': 'error',

      // 安全でない関数呼び出しを禁止
      // any型の関数呼び出しを検出
      '@typescript-eslint/no-unsafe-call': 'error',

      // 安全でないプロパティアクセスを禁止
      // any型のプロパティアクセスを検出
      '@typescript-eslint/no-unsafe-member-access': 'error',

      // 安全でない返り値を禁止
      // any型の返り値を検出
      '@typescript-eslint/no-unsafe-return': 'error',

      // 安全でない引数を禁止
      // any型の引数を検出
      '@typescript-eslint/no-unsafe-argument': 'error',

      // Promiseの未処理を禁止
      // await忘れを検出
      '@typescript-eslint/no-floating-promises': 'error',

      // Promiseの誤用を禁止
      // if文でのPromise使用等を検出
      '@typescript-eslint/no-misused-promises': 'error',

      // オプショナルチェーン(?.)の使用を推奨
      // a && a.b → a?.b
      '@typescript-eslint/prefer-optional-chain': 'error',

      // Nullish Coalescing(??)の使用を推奨
      // a !== null && a !== undefined ? a : b → a ?? b
      '@typescript-eslint/prefer-nullish-coalescing': 'error',

      // !演算子の使用を警告
      // value! は型安全性を損なう
      '@typescript-eslint/no-non-null-assertion': 'warn',

      // 不要な型アサーションを禁止
      // const x: string = 'hello' as string → 不要
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',

      // 不要な条件式を警告
      // 常に真/偽の条件式を検出
      '@typescript-eslint/no-unnecessary-condition': 'warn',

      // as constの使用を推奨
      // const x = 'hello' as const
      '@typescript-eslint/prefer-as-const': 'error',

      // ========================================
      // 3. 未使用コード削除
      // ========================================

      // 未使用importを削除
      'unused-imports/no-unused-imports': 'error',

      // 未使用変数を警告
      // _で始まる変数/引数は無視
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      // ========================================
      // 4. React専用
      // ========================================

      // Hooksのルール違反を検出
      // useStateをif文内で呼ぶ等
      'react-hooks/rules-of-hooks': 'error',

      // useEffectの依存配列チェック
      'react-hooks/exhaustive-deps': 'warn',

      // 自己閉じタグを強制
      // <div></div> → <div />
      'react/self-closing-comp': 'error',

      // 不要な波括弧を削除
      // <div className={"foo"} → <div className="foo"
      'react/jsx-curly-brace-presence': [
        'warn',
        {
          props: 'never',
          children: 'never'
        }
      ],

      // JSX属性の順序
      // アルファベット順、コールバックは最後
      'react/jsx-sort-props': [
        'warn',
        {
          callbacksLast: true,
          shorthandFirst: false,
          ignoreCase: true,
          reservedFirst: true,
        },
      ],

      // 関数コンポーネントの定義方法を統一
      // アロー関数を強制
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],

      // React importを不要に（React 17+）
      'react/react-in-jsx-scope': 'off',

      // PropTypesの使用を無効化（TypeScript使用時）
      'react/prop-types': 'off',

      // target="_blank"の安全性チェック
      // rel="noopener noreferrer"を強制
      'react/jsx-no-target-blank': 'error',

      // map内のkey属性チェック
      'react/jsx-key': 'error',

      // コンポーネント名はPascalCase
      'react/jsx-pascal-case': 'error',

      // boolean属性の省略形を推奨
      // <Component disabled={true} → <Component disabled
      'react/jsx-boolean-value': ['warn', 'never'],

      // フラグメントの省略形を推奨
      // <React.Fragment> → <>
      'react/jsx-fragments': ['warn', 'syntax'],

      // ========================================
      // 5. import文整理
      // ========================================

      // import文の順序を統一
      // Node.js標準 → 外部ライブラリ → 内部モジュール → 相対パス → 型import
      'import/order': [
        'error',
        {
          'groups': [
            'builtin', // Node.js標準
            'external', // 外部ライブラリ
            'internal', // 内部モジュール
            ['parent', 'sibling'], // 相対パス
            'index',
            'object',
            'type', // 型import
          ],
          'newlines-between': 'always', // グループ間に空行
          'alphabetize': { order: 'asc', caseInsensitive: true },
        },
      ],

      // 重複importを禁止
      // import { a } from 'x'; import { b } from 'x'; → まとめる
      'import/no-duplicates': 'error',

      // ========================================
      // 6. コード品質（任意）
      // ========================================

      // 循環的複雑度の制限
      // if/for等の分岐が多すぎる関数を検出
      'complexity': ['warn', 20],

      // ネストの深さ制限
      // if/for等のネストが深すぎるコードを検出
      'max-depth': ['warn', 6],

      // ファイルの行数制限
      // 1000行を超えるファイルを警告
      'max-lines': [
        'warn',
        {
          max: 1000,
          skipBlankLines: true,
          skipComments: true
        }
      ],

      // 関数の行数制限
      // 50行を超える関数を警告
      'max-lines-per-function': [
        'warn',
        {
          max: 50,
          skipBlankLines: true,
          skipComments: true
        }
      ],

      // 関数の引数数制限
      // 4個を超える引数を警告
      'max-params': ['warn', 4],

      // ========================================
      // 7. アクセシビリティ
      // ========================================

      // img要素のalt属性を強制
      'jsx-a11y/alt-text': 'error',

      // a要素の適切な使用を強制
      // href属性のないa要素を検出
      'jsx-a11y/anchor-is-valid': 'error',

      // クリックイベントにキーボード対応を強制
      // onClickがある要素にonKeyDown等も必要
      'jsx-a11y/click-events-have-key-events': 'warn',

      // labelとinputの関連付けを強制
      'jsx-a11y/label-has-associated-control': 'warn',

      // インタラクティブ要素にroleを強制
      'jsx-a11y/no-static-element-interactions': 'warn',

      // aria属性の適切な使用を強制
      'jsx-a11y/aria-props': 'error',

      // aria-*属性の値を検証
      'jsx-a11y/aria-proptypes': 'error',

      // 無効なaria-*属性を検出
      'jsx-a11y/aria-unsupported-elements': 'error',

      // roleの適切な使用を強制
      'jsx-a11y/role-has-required-aria-props': 'error',

      // roleの値を検証
      'jsx-a11y/role-supports-aria-props': 'error',
    },
  },

  // Prettierとの競合回避
  prettierConfig,
];

export default eslintConfig;
