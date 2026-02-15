# Codex Review

## 対象
- プロジェクト: `/Users/tappei/Documents/doc/projects/studio-tap/portfolio/src`
- スキル: `codex-review`
- レビュー方式: 小出し（内容は本ファイルで統合管理）

## 統合レビュー結果

### Findings（重大度順）

#### 1. Critical: 外部URLを無検証で `href` に流している
- `work.url`（CMS入力値）をそのまま外部リンク化しており、`javascript:` などの不正スキームを防げていない。
- 参照:
  - `components/Work/WorkCard/WorkCardLink.tsx:15`
  - `components/Link/ExternalLink.tsx:9`
  - `components/Link/BaseLink.tsx:13`
- 推奨対応:
  - `new URL(url)` でパースし、`http:` / `https:` のみ許可。
  - 無効値はリンク非表示または安全なフォールバックへ。

#### 2. Warning: CMS由来HTMLをサニタイズせずに描画
- `html-react-parser` で `description` をそのまま描画しているため、入力源改ざん時のXSSリスクが残る。
- 参照:
  - `components/Work/WorkCard/WorkCardDescription.tsx:15`
- 推奨対応:
  - `sanitize-html` や `DOMPurify` による許可タグ/属性ベースのサニタイズを追加。

#### 3. Warning: データ取得失敗時のフォールバックなし
- トップページで `getWorks` 失敗時のハンドリングがなく、API障害時に500へ直行しやすい構造。
- 参照:
  - `app/page.tsx:12`
- 推奨対応:
  - `try/catch` と `error.tsx` / 代替UI / リトライ方針を明確化。

#### 4. Warning: テストコードを lint / TS チェック対象から除外
- テストが多い一方、静的検査対象外のため劣化検知力が落ちる。
- 参照:
  - `eslint.config.mjs:14`
  - `tsconfig.json:26`
- 推奨対応:
  - テストを lint 対象へ戻す。
  - 必要なら本番コードと別に `tsconfig.test.json` を切って検査する。

#### 5. Warning: 依存関係の脆弱性・更新状況をこの環境では判定できない
- `npm audit --json` / `npm outdated --json` の実行が、ネットワーク到達不可 (`ENOTFOUND registry.npmjs.org`) で失敗した。
- 参照（実行ログ要旨）:
  - `npm audit`: `request to https://registry.npmjs.org/-/npm/v1/security/advisories/bulk failed`
  - `npm outdated`: `request to https://registry.npmjs.org/... failed`
- 判定:
  - ローカルコード上の脆弱性有無は**未確定**（環境制約による）
- 推奨対応:
  - ネットワーク接続可能環境で `npm audit` / `npm outdated` を再実行。
  - CIに依存監査ジョブを追加して継続監視。

#### 6. Warning: テスト実行環境が欠けており、回帰検知が現状機能していない
- `npm run test -- --run` 実行時に `sh: vitest: command not found` となり、テストを実行できない。
- 参照（実行ログ要旨）:
  - `npm run -s test -- --run`: `sh: vitest: command not found`
- 推奨対応:
  - `npm ci` 実行済み環境でのテスト実行を必須化。
  - CIで `npm ci && npm run test` を必ず通す。

#### 7. Warning: 実装に対して未テストのUIコンポーネントが多い
- 実装 `.tsx` と `.test.tsx` の対応を比較すると、以下が未テストだった。
- 未テスト対象:
  - `components/About/AboutImage.tsx`
  - `components/Header/Header.tsx`
  - `components/Header/HeaderLogo.tsx`
  - `components/Header/HeaderNav.tsx`
  - `components/Header/HeaderNavigationItem.tsx`
  - `components/Link/BaseLink.tsx`
  - `components/Link/ExternalLink.tsx`
  - `components/Work/WorksMasonry.tsx`
  - `components/icons/HamburgerIcon.tsx`
  - `components/icons/IconBase.tsx`
  - `components/icons/LogoIcon.tsx`
  - `components/icons/MoonIcon.tsx`
  - `components/icons/SunIcon.tsx`
  - `components/icons/ThemeIcon.tsx`
  - `components/layout/MainInner.tsx`
  - `components/providers/ThemeProvider.tsx`
- リスク:
  - 主要ナビゲーション、外部リンク、テーマ切替周辺で回帰が入りやすい。
- 推奨対応:
  - 優先度順に `Header`, `ExternalLink`, `WorksMasonry`, `HamburgerIcon` から追加。

#### 8. Info: Tailwindクラスのtypo疑い
- `item-center` は `items-center` の誤記に見え、意図したレイアウトにならない可能性がある。
- 参照:
  - `components/Header/Header.tsx:47`

#### 9. Info: テストは「表示確認」中心で、異常系/防御系の検証が薄い
- 既存テストはレンダリング・クラス適用中心で、セキュリティや異常入力の観点が少ない。
- 例:
  - `WorkCardLink`: 不正URLスキーム（`javascript:`）の拒否テストがない。
  - `WorkCardDescription`: 危険HTML入力時の防御テストがない。
- 推奨対応:
  - 仕様ベースの失敗系テストを追加（不正URL、空/壊れたデータ、予期しない型）。

---

## 10項目チェック（統合判定）

1. セキュリティ
- 判定: **要対応あり**
- 理由: URLスキーム無検証、HTMLサニタイズ未実施。

2. 正確性（バグ・ロジックエラー）
- 判定: **軽微な問題あり**
- 理由: クラス名typo疑い。

3. エラーハンドリング
- 判定: **要改善**
- 理由: API失敗時の明確なフォールバック不足。

4. パフォーマンス
- 判定: **問題なし（確認範囲）**

5. 並行処理・状態管理
- 判定: **問題なし（確認範囲）**

6. テスト
- 判定: **要改善**
- 理由: 実行環境不足・未テストコンポーネント多め・異常系不足。

7. 依存関係
- 判定: **未確定（環境制約）**
- 理由: ネットワーク到達不可で `npm audit` / `npm outdated` 未判定。

8. 保守性・可読性
- 判定: **概ね良好**

9. 規約・一貫性
- 判定: **軽微な不整合あり**
- 理由: テスト運用と検査設定の一貫性に課題。

10. そのほか
- 判定: **問題なし（確認範囲）**

---

## 次回レビュー予定（第3弾）
- 具体的な修正提案パッチ（URL検証・HTMLサニタイズ・エラーハンドリング）
- テスト追加方針（優先コンポーネント順）
- CI向け品質ゲート（lint/test/audit）の最小構成案
