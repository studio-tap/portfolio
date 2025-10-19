# 開発ログ

## 2025-07-27

### プロジェクトセットアップとVercelへのデプロイ
Dockerを使用してNext.jsの開発環境を構築した。`docker-compose.yml`と`Dockerfile`を適切に設定し、コンテナ内で`create-next-app`を実行。これにより、Next.jsの初期プロジェクトが作成され、Welcomeページが無事に表示された。

その後、Next.jsの開発元であるVercelについて学習。Vercelが提供するサーバーレスのホスティングプラットフォームの利点（Next.jsへの最適化、パフォーマンス、優れた開発体験など）を、従来のレンタルサーバーと比較しながら理解を深めた。

学習の一環として、作成したNext.jsプロジェクトをGitHubリポジトリ経経由でVercelにデプロイし、正常に公開されていることを確認した。

### コンポーネント設計思想の確立
今後の開発方針として、Reactのコンポーネント設計について議論を開始した。

まず、UI設計手法であるAtomic Designについて検討。その概念は理解しつつも、化学由来の命名が直感的でない点や、各要素の粒度の区別が曖昧であるという課題が挙げられた。

そこで、これまでのWeb制作経験で培われたCSS設計（`base`, `layout`, `project`, `component`, `utility`）の考え方を応用し、より実践的で分かりやすい独自のコンポーネント設計ルールを模索することにした。

議論の結果、以下の様なディレクトリ構成と粒度のルールを仮説として立てた。これは、Atomic Designの思想の良い部分を取り入れつつ、命名の分かりにくさを解消することを目的としている。

#### コンポーネントのカテゴリ（`src/components`直下）
*   `/base`: グローバルなスタイルや基本的なHTML要素をラップするコンポーネント。
*   `/layout`: ヘッダーやフッターなど、ページの骨格を定義するコンポーネント。
*   `/ui`: 主要なUIを構成するコンポーネント群。粒度ごとのサブディレクトリを持つ。
*   `/feature`: 特定の機能に特化した、再利用性の低いコンポーネント。
*   `/utility`: 汎用的なヘルパーコンポーネント。

#### UIコンポーネントの粒度（`src/components/ui`配下）
*   **Atom（原子）**: `Button`, `Input`など、UIの最小単位。
*   **Module（モジュール）**: `SearchForm`など、複数のAtomを組み合わせた機能単位。
*   **Block（ブロック）**: `Header`など、ModuleやAtomを組み合わせたより複雑なセクション。

この設計思想を元に、今後の開発を進めていく方針を確認した。

## 2025-07-28

### 開発ログのルール確認
`DEVELOPMENT_LOG.md`に会話の記録を残すルールを再確認した。

### ディレクトリ構造の修正
`create-next-app`の実行によって意図せず生成された`src/app/src`という深い階層構造を修正。Next.jsプロジェクトのルートを`portfolio/src`に設定し直し、`docker-compose.yml`のパスも合わせて更新した。これにより、より標準的で管理しやすいディレクトリ構造になった。

### コンポーネント設計に関する再検討
ディレクトリ構造の議論から派生し、コンポーネント設計について再度検討を行った。Atomic DesignがUIのデザイン論であるのに対し、開発側の視点（再利用性、疎結合）をより重視した設計の必要性を確認。その中で、Feature-Based, Fractal-Based, Page-Basedなど、複数の有名なディレクトリ構造パターンについて学習し、それぞれの長所と短所を理解した。最終的に、Next.jsの標準的な構成である`src`をプロジェクトルートとすることに決定した。

### 動作確認とデプロイ設定
一連のディレクトリ構造の修正後、`docker-compose down`と`docker-compose up -d --build`を実行し、ローカル環境でNext.jsのWelcomeページが正常に表示されることを確認した。その後、変更内容を`git add .`でステージングし、「2025-07-28: ディレクトリ構造の全面的な見直しと正常化」というメッセージでコミット、リモートリポジトリへプッシュした。最後に、Vercelのプロジェクト設定において、Root Directoryを新しいプロジェクトルートである`src`に変更し、再デプロイを行うことで、本番環境にも変更を反映させた。

### コンポーネント設計の再々検討と方針転換
コンポーネント設計について再度議論を行った。ユーザーはAtomic Designに納得せず、汎用性、UI/ロジックの分離、明確な粒度を重視した独自の5段階ディレクトリ構造（`component`, `module`, `object`, `feature`, `page`）を提案した。

この提案に対し、私は各カテゴリの定義の厳密さ、特に「見た目だけ」のコンポーネントの維持の難しさや、`module`/`object`の役割の曖昧さ、過剰な抽象化による複雑性などの課題を指摘した。

議論の結果、ユーザーは「componentにロジックを含まない」ことの難しさや、自身の「非スタンドアロン」「スタンドアロン」の概念がReactのコンポーネント開発と完全にマッチしない可能性を認識した。

最終的に、概念的な議論を一旦中断し、実際にページを構築しながらReactでの最適な実装方法を探索する方針に転換することで合意した。

### Next.js App Routerの基本分析
Next.jsのWelcomeページがブラウザに表示されるまでのロジックとレンダリングの仕組みを分析した。`src/app/layout.tsx`がアプリケーション全体の骨格とメタデータを定義し、`src/app/page.tsx`がルートURLのコンテンツを定義していることを確認した。Next.jsがこれらをサーバーサイドでレンダリングし、HTMLとしてブラウザに送信するプロセスを理解した。

また、Next.js App Routerにおけるルーティングとレイアウトの概念について深く掘り下げた。具体的には、`layout.tsx`のネスト、`template.tsx`との違い、`page.tsx`の役割、フォルダ名によるルーティング定義、そしてグループルートによる共通レイアウトの適用方法について理解を理解した。最後に、`Metadata`のような型と`Link`のようなランタイム値のインポートの違い、そして共通インポートをまとめるプラクティスについて議論した。

さらに、`layout.tsx`のインポートブロックについて詳細に分析し、`Metadata`が型定義であること、`Geist`や`Geist_Mono`がフォントローダー関数であることを確認した。Next.js App Routerでよく使われる型（`React.ReactNode`, `LayoutProps`など）についても理解を深めた。最後に、`Metadata`のような型と`Link`のようなランタイム値のインポートの違い、そして共通インポートをまとめるプラクティスについて議論した。

## 2025-08-03

### フォント比較ページの作成とDocker環境のトラブルシューティング

別の開発環境からの作業を開始。まず、ローカルにクローンした3つのコーディングフォント（`HackGen NF`, `Moralerspace`, `PlemolJP NF`）を比較・検討するための専用ページを作成することにした。

静的アセットの慣例に従い、`src/public/fonts`ディレクトリを作成し、そこにフォントファイルを配置。その後、Next.js App Routerの機能を利用して、`/app/lab/font/page.tsx`という新しいルートを作成した。このページでは、CSSの`@font-face`ルールを用いて各フォントを動的に読み込み、サンプルテキスト（アルファベット、記号、日本語）を複数のウェイトで表示させることで、視覚的な比較を可能にしている。

しかし、開発サーバーを起動しようとした際にDockerデーモンが実行されていない問題が発覚。ユーザーが最近経験したマルウェア誤検知バグと再インストールが原因である可能性が浮上した。

この問題に対処するため、Dockerの完全なクリーンアンインストールを実施。関連するアプリケーションファイル、設定、キャッシュ、コマンドラインツールをシステムからすべて削除した。一部ファイルの削除で権限エラーが発生したため、ユーザーに手動での削除を依頼し、完了を確認。これにより、Dockerをクリーンな状態で再インストールできる準備が整った。

### Docker/Git環境の再構築と問題解決

新しい環境で開発サーバーを起動しようとしたところ、`docker-compose up`が正常に完了しない問題が発生した。

まず、`docker-compose.yml`から不要な`version`属性を削除。しかし、コンテナが起動直後に終了する問題は解決しなかった。フォアグラウンドでコンテナを起動 (`docker-compose up`) してログを確認したところ、`sh: next: not found`というエラーが原因であることが判明した。

これは、`Dockerfile`内で`npm install`が実行されておらず、Next.jsの実行に必要な`node_modules`が存在しないためであった。`Dockerfile`を修正し、`package.json`のコピー後に`npm install`を実行するように変更した。

さらに、ローカルの`src`ディレクトリをマウントする際に、コンテナ内の`node_modules`が上書きされてしまう問題を特定。`docker-compose.yml`の`volumes`設定に匿名ボリュームを追加 (`- /app/node_modules`) することで、この問題を解決した。

一連の修正とイメージの再ビルド (`docker-compose up -d --build`) を経て、開発サーバーは無事に起動した。

続いて、`git push`ができない問題を解決。`git remote -v`でリモートリポジトリの設定に問題がないことを確認した後、`git push`を再試行したところ、認証情報の入力を求められた。これを完了させることで、無事にリモートリポジトリへのプッシュが成功した。

### フォントの選定と適用、不要ファイルの削除

フォント比較ページ (`/app/lab/font/page.tsx`) を用いて、複数のコーディングフォントを比較検討した。当初、`page.tsx`の文字列定義やクライアントコンポーネントの指定に関するエラーが発生したが、これらを修正し、フォント比較ページを正常に表示できるようになった。

比較の結果、`PlemolJP Console NF`をサイト全体のフォントとして採用することを決定した。これに伴い、不要となったフォント比較ページ (`/app/lab`) および、`HackGen`、`Moralerspace`の各フォントファイル (`src/public/fonts`配下) をプロジェクトから削除した。

サイト全体へのフォント適用のため、`src/app/layout.tsx`を修正。`next/font/local`を使用して`PlemolJP Console NF`のRegularとBoldを読み込み、`<body>`タグに適用するように変更した。これにより、サイト全体のフォントが`PlemolJP Console NF`に統一された。

最後に、`globals.css`を修正し、`--font-plemol-jp`というCSS変数を`body`の`font-family`として適用する予定である。

## 2025-08-10

- Next.jsプロジェクトの共通ヘッダーを作成。
  - `src/components/Header.tsx` を作成し、`src/app/layout.tsx` に配置。
  - 開発サーバーで発生したハイドレーションエラーを `suppressHydrationWarning` を追加して修正。
- ヘッダーコンポーネントのリファクタリングを実施。
  - ナビゲーションリンクを `src/components/HeaderNavigationItem.tsx` としてコンポーネント化。
  - `<a>` タグをNext.jsの `<Link>` コンポーネントに置き換え。
- TypeScriptの型定義を強化。
  - `React.FC` や `JSX.Element`、`React.ReactElement`、`React.ReactNode` の違いと使い分けについて議論。
  - コンポーネントの返り値の型を `React.ReactElement` に統一。
  - `props` やデータ構造に型を付与。
  - `default export` から `named export` に変更。
- JSXの型解決エラー (`JSX.IntrinsicElements` が見つからない) を修正。
  - 原因が `tsconfig.json` の `"jsx": "preserve"` 設定下での型定義の読み込み不足にあることを特定。
  - `import React from 'react';` をコンポーネントファイルに追加することで解決。

## 2025-08-11: Docker環境とTailwind CSSのセットアップ、およびテーマ切り替えUIの調整

**1. Docker環境の起動問題と解決**
*   **問題**: `docker-compose up` でNext.jsコンテナが起動しない。ログに `sh: next: not found` エラー。
*   **原因**:
    *   `docker/nextjs/Dockerfile` 内の `RUN npm install` がコメントアウトされていた。
    *   `Dockerfile` の `COPY` コマンドのパスが不正確だった (`COPY package.json ...` となっていたが、`src/package.json` が正しいパス)。
    *   `docker-compose.yml` の `volumes` 設定で、`node_modules` がホストのコードマウントで上書きされてしまう問題。
*   **解決**:
    *   `Dockerfile` を修正し、`RUN npm install` のコメントアウトを解除し、`COPY src/package.json src/package-lock.json* ./` に変更。
    *   `docker-compose.yml` の `volumes` に `- /app/node_modules` を追加し、コンテナ内の `node_modules` を独立したボリュームとして管理。
    *   `docker-compose down --rmi all -v` で既存のコンテナ、イメージ、ボリュームを完全に削除し、`docker-compose up -d --build` で再構築。

**2. Tailwind CSSのユーティリティクラスが機能しない問題**
*   **問題**: `text-xl`, `mx-4` などのTailwindユーティリティクラスが適用されない。アイコンやフォントも表示されない。
*   **初期調査と誤ったアプローチ**:
    *   `tailwind.config.js` の `content` パス、`postcss.config.mjs` の設定、キャッシュクリアなどを試行。
    *   `postcss.config.mjs` に `autoprefixer: {}` を追加したが、`autoprefixer` がインストールされておらずビルドエラーが発生。これは私の誤った判断によるもの。
    *   `globals.css` から `body` の `font-family` 定義を削除したことで、フォントとアイコンの表示問題が発生。
*   **根本原因の特定**:
    *   `docker-compose logs` で `warn - No utility classes were detected` の警告を確認。Tailwindがクラスを検出できていないことが判明。
    *   `package.json` を確認した結果、Tailwind CSS v4 (ベータ版) を使用していることが判明。Next.js 15 との組み合わせで不安定な挙動を示している可能性が高いと推測。
*   **解決**:
    *   **Tailwind CSS v3 へのダウングレード**:
        *   `src/package.json` を修正し、`"tailwindcss": "^3"`, `"postcss": "^8"`, `"autoprefixer": "^10"` を追加し、`"@tailwindcss/postcss"` を削除。
        *   `src/postcss.config.mjs` を修正し、Tailwind CSS v3 向けの `plugins: { tailwindcss: {}, autoprefixer: {} }` に変更。
    *   **`tailwind.config.js` の `content` パスの最適化**:
        *   `src/tailwind.config.js` を修正し、`content` パスを `["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"]` に変更。これにより、Tailwindがソースファイルを正しくスキャンできるようになった。
    *   **`globals.css` のフォント設定の復元**:
        *   `src/app/globals.css` に `body { font-family: var(--font-plemol-jp), monospace; }` を含む `@layer base` を復元し、フォントとアイコンの表示問題を解決。
    *   **徹底的なキャッシュクリアと再構築**:
        *   各ステップで `rm -rf node_modules`, `rm -f package-lock.json`, `npm install` (ホスト側) を実行。
        *   `docker-compose down --rmi all -v`, `rm -rf src/.next`, `docker-compose up -d --build` を実行し、Docker環境を完全にクリーンアップし再構築。

**3. テーマ切り替えUIの調整とコードの整理**
*   **ヘッダーの簡略化**: `src/components/Header.tsx` からナビゲーションやタイトルを削除し、`ThemeSwitcher` のみを表示するように修正。
*   **`page.tsx` のクリーンアップ**: 不要なテキストを削除し、空の `main` タグのみを残す。
*   **`ThemeSwitcher.tsx` のロジック一時削除**: UIのレイアウト確認のため、テーマ切り替えロジックをコメントアウト。
*   **アイコンコンポーネントの記述統一**: `SunIcon.tsx`, `MoonIcon.tsx` を分割代入形式に統一。
*   **`ThemeIcon.tsx` のクラス修正**: `theme-icon-common-style` クラスを削除し、`IconBase` が親のスタイルを継承するように修正。

## 2025-08-13: Gemini CLIアップデートとヘッダーナビゲーション機能追加、microCMSスキーマ定義

*   **Gemini CLIのアップデート**: npm経由でのグローバルアップデートを実施。`usePathname` フック使用時のビルドエラー（`"use client"` ディレクティブの不足）を修正。
*   **ヘッダーナビゲーション機能追加**: 
    *   現在のページをアクティブ状態にするため、`HeaderNavigationItem.tsx` に `usePathname` を導入し、アクティブなリンクに `font-bold` を適用。
    *   ホバー時に真ん中から伸びるアンダーラインアニメーションを `HeaderNavigationItem.tsx` に実装。
*   **microCMSスキーマ定義**: `README.md` に作品（WORKS）のmicroCMS APIスキーマ（タイトル、説明、サムネイル、URL、GitHub URL、使用技術、公開日）を追記。

## 2025-08-15: microCMS連携準備とスキーマ設計

*   **IDE連携のセットアップ**: Gemini CLI Companion (VSCode拡張機能)との連携をセットアップし、正常に動作することを確認した。
*   **microCMS連携の計画と設計**: ポートフォリオに作品一覧を表示するためのロードマップを作成し、`README.md`に記録した。
*   **microCMSスキーマ設計**: `works` APIのスキーマ設計について詳細に議論し、フィールドの型、必須項目、バリデーションルールを決定した。
*   **クリエイティブなブレインストーミング**: サービス名「STUDIO-TAP」の由来である「TAP」という言葉の意味を深掘りし、ロゴやブランドストーリーに繋がりうる複数の解釈を探求した。
*   **次のステップ**: ユーザーがmicroCMSのAPI作成とダミーデータの投入を完了。次回の作業で`microcms-js-sdk`の導入から再開する。

## 2025-08-19: microCMSのスキーマ設計とSDK導入準備

*   **microCMSのスキーマ設計に関する議論**:
    *   ポートフォリオの「使用技術」を管理する方法について議論。当初の「複数選択」フィールドでは柔軟性に欠ける問題点を特定した。
    *   解決策として、`technologies` という別のAPIを技術マスタとして作成し、「コンテンツ参照」機能で作品と紐付ける方式を提案・採用した。これにより、技術タグの追加・削除が容易になり、表記揺れも防げるようになった。
    *   microCMSの無料プランにおけるAPI数制限（5つ）について検討。代替案としてNext.jsのコード内で技術リストを管理する方法も議論したが、管理の一元化と手軽さを優先し、当面はAPIを分ける方式で進めることで合意した。
*   **開発環境の準備**:
    *   `microcms-js-sdk`の必要性について議論し、導入に合意したものの、時間切れでインストールには至らなかった。

## 2025-08-22: 開発フローと依存関係管理方針の確立

DockerとVercelを併用した開発における、依存関係（npmパッケージ）の管理方法について議論し、以下の通り方針を固めた。

**決定事項:**

1.  **パッケージ管理の統一ルール**:
    *   `npm install`等のパッケージ操作は、必ずローカル環境（Dockerコンテナの外）の`src`ディレクトリで実行する。
    *   これにより更新された`package.json`をGitで管理し、全ての環境の「正本」とする。

2.  **変更の反映プロセス**:
    *   **本番環境（Vercel）へ**: `package.json`の変更を`git push`することで自動的に反映される。
    *   **開発環境（Docker）へ**: `package.json`の変更後、`docker-compose build`でDockerイメージを再ビルドすることで反映される。

3.  **複数環境（自宅、外出先など）での同期**:
    *   作業開始時に`git pull`で最新の`package.json`を取得後、`npm install`または`docker-compose build`を実行し、`node_modules`を同期させる。

この方針により、開発環境と本番環境、および複数の開発マシン間での依存関係の整合性を保つ。

### 2025-08-22 (午後)

`microcms-js-sdk`のインストール後、開発環境のDockerイメージをビルドした際にネットワークエラー (`ECONNRESET`) が発生。
`docker-compose build`を再試行しても解決しなかったため、Docker Desktopを再起動したところ、無事にビルドが成功した。
これにより、開発環境の準備が全て整った。

### 2025-08-22 (夕方)

**現状の問題**
- `docker-compose up`で起動したコンテナ内のNext.jsアプリケーションが、起動時にSWCパッケージをダウンロードしようとしてネットワークタイムアウト(`ConnectTimeoutError`)を起こし、クラッシュする。
- これにより、`localhost:3000`にアクセスしても何も表示されない。
- 原因は、現在の作業場所のインターネット接続が非常に不安定であることと特定。

**次回の作業計画 (Next Action Plan)**
1.  安定したネットワーク環境に移動する。
2.  移動後、`docker-compose up -d --build` を実行し、コンテナの起動とSWCパッケージのダウンロードが正常に完了することを確認する。
3.  `localhost:3000` にアクセスし、Next.jsのデフォルトページが表示されることを確認する。
4.  上記が確認でき次第、`src/.env.local` ファイルを作成し、microCMSの認証情報を設定する。
    - `MICROCMS_SERVICE_DOMAIN=...`
    - `MICROCMS_API_KEY=...`
5.  `src/lib/microcms.ts` を作成し、APIクライアントの実装を開始する。

## 2025-08-23: Dockerビルド時のネットワークエラー調査

- **目的**: APIキーを設定し、Dockerコンテナのログでデータ取得を確認する。
- **問題**: `docker compose logs` を確認したところ、コンテナ起動時にNext.jsが必要とするSWC依存関係のダウンロードに失敗していることが判明 (`ConnectTimeoutError`)。
- **調査**:
    - 当初の目的だった「.env.localの読み込み」は、ログ内の`Reload env: .env.local`という記述から正常に行われていることを確認。
    - 問題を解決するため、`docker compose build`でイメージを再ビルドしたが、今度はビルドプロセス中の`npm install`がネットワークエラー (`ECONNRESET`) で失敗。
- **原因特定**: ユーザーからの情報により、根本原因は速度制限下にあるスマホのテザリングを利用しており、ネットワーク接続が極めて低速かつ不安定であるためと特定。
- **次のアクション**: 安定したネットワーク環境下で、再度`docker compose build`を実行する。そのため、一旦作業を中断する。

## 2025-08-31: 開発環境の見直しと進捗の再確認

- **Docker環境の廃止**:
    - 開発サーバーの起動に `npm run dev` を直接使用する方針に転換。ローカル開発のシンプルさと速度を優先するため、Dockerに依存した環境を廃止することを決定した。
    - これに伴い、プロジェクトルートの `docker-compose.yml` と `docker/` ディレクトリを完全に削除した。

- **開発サーバーの起動問題**:
    - `npm run dev` を実行した際に、Next.jsが必要とするSWCコンパイラのダウンロードが開始され、サーバーが即時起動しない事象を確認。これは初回起動時の一時的なプロセスであり、完了を待つ必要があることを理解した。

- **開発進捗の現状把握**:
    - 過去の開発ログと実際のファイル状況に乖離がないかを確認。
    - `package.json` を調査した結果、`microcms-js-sdk` はすでにインストール済みであることが判明。
    - `src/lib/microcms.ts` もすでに作成されており、クライアントの初期化、TypeScriptの型定義 (`Work`, `Technology`)、作品一覧を取得する `getWorks` 関数まで実装済みであることを確認した。

- **次のステップの明確化**:
    - 上記の進捗確認に基づき、次に実施すべきタスクは、要件定義のロードマップ通り「トップページの修正 (`src/app/page.tsx`)」であり、`getWorks` 関数を呼び出してmicroCMSから取得したデータを表示することであると再定義した。

## 2025-08-31: コンポーネントリファクタリングと作品一覧表示

- **コンポーネントのディレクトリ構成の整理**:
    - `src/components`内に`Header`および`Work`ディレクトリを作成し、関連コンポーネントをそれぞれに移動・整理した。
    - ファイル移動に伴い、`import`文のパスを相対パスからエイリアスパス (`@/`) に修正し、コードの堅牢性を高めた。

- **WorkCardコンポーネントの分割**:
    - `WorkCard.tsx`を、`WorkCardTitle.tsx`、`WorkCardThumbnail.tsx`など、役割ごとにさらに小さなコンポーネントに分割した。
    - これにより、各コンポーネントの責務が明確になり、メンテナンス性が向上した。

- **トップページへの作品一覧表示**:
    - `src/app/page.tsx`を修正し、microCMSから取得した作品データを`WorkCard`コンポーネントを用いて一覧表示する機能を実装した。

- **バグ修正**:
    - microCMSの作品データに「使用技術」が設定されていない場合に発生するランタイムエラーを修正。`WorkCardTechnologies.tsx`内で`Array.isArray`によるチェックを追加し、データが存在しない場合でも安全に表示できるようにした。

- **Git/SSH認証問題の解決**:
    - `git push` 時に `Permission denied (publickey)` エラーが発生。
    - `ssh-keygen` で新しいSSHキーペアを生成し、`ssh-agent` と `ssh-add` でPCに登録。
    - ローカルのキーとGitHubに登録済みのキーの指紋が異なることを突き止め、新しく生成した公開鍵をGitHubアカウントに登録することで、認証問題を解決し、正常にプッシュが完了した。

## 2025-09-01: ロゴデザインの検討とヘッダーへの実装

- **ロゴデザインの検討**:
    - ユーザーが作成したロゴのモチーフ（アルファベットのT、蛇口）と印象について議論した。
    - ロゴの硬い印象を和らげ、よりクリエイティブな雰囲気にするための改善案（曲線の追加、水滴モチーフなど）を複数提案した。
    - ユーザーが曲線を主体とした修正案を作成し、それについてさらに議論を深めた。
- **ヘッダーへのロゴ実装**:
    - 最終的なロゴ画像をサイトのヘッダーに表示する作業を実施。
    - `src/components/Header/Header.tsx` を修正し、従来のテキストタイトルをNext.jsの `Image` コンポーネントを用いたロゴ表示に置き換えた。
    - ロゴにトップページへのリンクを設定し、ナビゲーションのリンク先も修正した。

## 2025-09-21: タイポグラフィシステムの設計と実装

サイト全体のデザインの一貫性を高め、メンテナンス性を向上させるために、体系的なタイポグラフィシステムを設計・実装した。

- **デザイントークンの定義**:
    - `tailwind.config.js`の`theme.extend`に、`fontSize`（rem単位）、`letterSpacing`、`lineHeight`を、意味論に依存しない抽象的なスケール（`s`, `m`, `l`など）で定義。
    - これにより、タイポグラフィの基本要素をプロジェクト全体で一元管理できるようになった。

- **汎用コンポーネント`Typography.tsx`の作成**:
    - 定義したデザイントークンを組み合わせて使用するための、汎用的な`Typography`コンポーネントを作成した。
    - `as`プロパティの型を`React.ElementType`に設定し、`p`や`h1`のようなHTMLタグだけでなく、Next.jsの`Link`コンポーネントなども受け入れられる高い柔軟性を持たせた。
    - `variants`（レシピ）の概念を導入。よく使うスタイルの組み合わせをコンポーネント内で定義し、`variant="body-normal"`のように簡単に呼び出せるようにした。これにより、アドホックなスタイリングを防ぎ、デザインの統一を強制できる。

- **設計思想のドキュメント化**:
    - 今回設計したタイポグラフィとカラーパレットの`tailwind.config.js`設定は、今後の別プロジェクトでも再利用できるよう、標準テンプレートとして`GEMINI.md`に記録することにした。

## 2025-09-21 (Part 2): Typographyコンポーネントの高度化とリファクタリング

タイポグラフィシステムの基盤の上に、既存コンポーネントへの適用と、さらなる設計の深化を行った。

- **既存コンポーネントへの適用**:
    - `HeaderNavigationItem.tsx` に存在した古い`TrackingM`コンポーネントを、新しく作成した`Typography`コンポーネントに置き換えた。
    - これにより、古い`Tracking`コンポーネントはプロジェクトから完全に不要になった。

- **`Typography`コンポーネントのポリモーフィック化**:
    - `a`タグやNext.jsの`Link`コンポーネントを型安全に扱うため、`Typography`コンポーネントを**ポリモーフィックコンポーネント**としてリファクタリングした。
    - `as`プロパティの型を`React.ElementType`に変更。
    - TypeScriptのジェネリクス、`Omit`, `keyof`, `React.ComponentPropsWithoutRef`といった高度な型ユーティリティを駆使し、`as`プロパティで指定されたコンポーネントが持つべき属性（例: `a`タグの`href`）を動的に、かつ型安全に受け取れるようにした。

- **TypeScriptの学習**:
    - 上記のリファクタリングに伴い、ジェネリクス、型パラメータの制約（`extends`）、オプショナルなプロパティ（`?`）、Restパラメータとスプレッド構文など、コンポーネントを堅牢にするためのTypeScriptの高度なテクニックについて詳細な学習と議論を行った。

## 2025-10-09: ヘッダーコンポーネントのリファクタリングと設定の見直し

- **Tailwind CSSの設定修正**:
    - `tailwind.config.js` に `transparent`, `current`, `white`, `black` といった基本的なカラーパレットを追加し、Tailwindのデフォルトカラーが利用できるように修正した。

- **ヘッダーコンポーネントのリファクタリング**:
    - `HeaderNavigationItem.tsx` を修正し、`Typography`コンポーネントが持つポリモーフィックな性質（`as`プロパティ）を活用。`<Link>`コンポーネントを`as={Link}`として渡すことで、不要なネスト構造を解消し、コードを簡潔にした。
    - `Header.tsx`で定義されていたナビゲーションリンクのデータを、責務がより適切な`HeaderNav.tsx`内に移動させた。
    - ヘッダーナビゲーション専用のタイポグラフィバリアントとして`header-nav`を`Typography.tsx`に新しく定義し、適用した。

- **ロゴの暫定対応**:
    - 未確定のロゴ画像を、一旦「STUDIO - TAP」というテキストに置き換えた。

## 2025-10-09: ヘッダーナビゲーションのインタラクション改修

- **ホバーエフェクトの変更**: 
  - 従来のアンダーラインアニメーションを廃止し、透明度が変わるエフェクトに変更。
  - 再利用性とデザインシステムとしての一貫性を高めるため、`tailwind.config.js`にプラグインを導入。
  - `matchUtilities`を使い、`hover-opacity-{value}`という形式で、意図的に制限したバリエーション（`weak`, `medium`, `strong`）のみを使用できるように設計。
  - 最終的に、ホバー時の透明度が50%になる`hover-opacity-strong`をナビゲーションリンクに適用した。

- **アクティブリンクの挙動変更**:
  - `usePathname`フックを利用して現在表示中のページを判定。
  - アクティブなリンクには`pointer-events-none`を適用し、不要なクリックイベントを無効化。アクセシビリティ向上のため`aria-disabled`も追加した。

## 2025-10-09 (Part 2): 共通レイアウトとABOUTページの作成

- `/about` ルートに対応する `src/app/about/page.tsx` を作成。
- サイト全体のメインコンテンツのレイアウトを共通化するため、`src/components/layout/MainContents.tsx` を作成。中央寄せ、最大幅、共通パディングを適用するラッパーコンポーネントとして実装。
- トップページとABOUTページに `MainContents` を適用し、レイアウトを統一。
- ヘッダーコンポーネントの `border-bottom` の色を、テーマ（ライト/ダーク）に応じて `foreground` の色に追従するように修正 (`border-foreground-light dark:border-foreground-dark`)。

## 2025-10-11

- **Aboutページの機能拡充とリファクタリング**
  - Next.jsのハイドレーションエラーを `suppressHydrationWarning` を用いて修正。
  - スキルセットのリストをカテゴリ別に整理・整形。
  - ページ下部に画像を表示するセクションを追加し、Flexboxを用いて画面下部まで広がるようにレイアウトを調整。
  - 画像表示部分を `AboutImage` コンポーネントとして分離し、将来的な機能拡張（microCMS連携）のための `@todo` コメントを記載。

- **UIコンポーネントの新規作成と改善**
  - 任意のリンクに適用できる `CustomLink` コンポーネントを作成。
  - 内部リンク用の `BaseLink` と、アイコン付きで別タブで開く外部リンク用の `ExternalLink` に機能を分離・リファクタリング。
  - `tailwind.config.js` のプラグイン機能を活用し、リンクの共通スタイルを `.link-base` としてコンポーネントクラス化。

- **カラーパレットの調整**
  - `tailwind.config.js` で定義されているテーマカラー（orange, navy）を、数学的な調和を考慮した配色に再設計。
  - `DEFAULT`, `bg`, `focus` の3色構成に統一。

## 2025-10-12

- **ヘッダーロゴの刷新**:
  - テキストベースのロゴを、テーマ（ライト/ダーク）に応じて色が切り替わるSVGコンポーネントに変更。
  - SVGをReactコンポーネントとして扱うための `next.config.js` の設定と、それに伴うビルドエラーを解決。最終的に、ビルド設定に依存しない手動でのコンポーネント化アプローチを採用。

- **デプロイエラーの修正**:
  - Vercelでのビルド時に発生していた `sharp` モジュールの読み込みエラーを、`.gitignore` を修正し `package-lock.json` をGit管理下に置くことで解決。
  - クライアントコンポーネントでのデータ取得に伴う環境変数の問題を、`NEXT_PUBLIC_` プレフィックスを追加することで解決。

- **WorksカードのUI/UX刷新**:
  - デザイン案に基づき、`WorkCard` コンポーネントのUIを全面的にリファクタリング。
  - `WorkCardMetaItem` のような中間コンポーネントを導入し、スタイル定義を集約・共通化。
  - microCMSのリッチエディタから出力されるHTMLに対し、`@tailwindcss/typography` (`prose`) を用いてスタイルを適用。`tailwind.config.js` で `prose` のスタイルをカスタマイズし、サイト全体のデザインと統一。
  - `react-masonry-css` ライブラリを導入し、トップページのレイアウトを、高さが可変のカードに対応したブロークングリッド（Masonry）レイアウトに変更。

- **機能改善とバグ修正**:
  - microCMSのデータ取得時に `orders` クエリを追加し、特定の作品を任意の位置に固定表示できる機能を追加。
  - microCMSのデータが未設定の場合に発生するランタイムエラーを、Nullガードを追加することで修正。

## 2025-10-13

- **`about` ページの画像表示問題のデバッグと解決**:
  - 画像の高さが意図せず縮小される問題を調査。`flex-grow` を使ったレイアウトの意図がユーザーと異なっていたため、最終的に画像のアスペクト比を維持するレスポンシブな表示 (`w-full h-auto`) に修正することで解決。

- **ロゴ画像の品質改善とテーマ対応**:
  - SVGロゴの画質が悪い問題を解決するため、`shape-rendering` 属性の適用（と、それに伴うJSXの `camelCase` への修正）や、`width`/`height` 属性の直接指定などを試行。
  - 改善が見られなかったため、最終的にPNG画像に戻すことを決定。

- **テーマ管理ライブラリ `next-themes` の導入**:
  - PNGロゴの切り替え機能を実現するため、テーマ管理ライブラリ `next-themes` を新規に導入。
  - `layout.tsx` に `ThemeProvider` を設定し、サイト全体でテーマ状態を共有できるアーキテクチャを構築。
  - 既存の `ThemeSwitcher.tsx` を、`useState` を使った独自実装から `useTheme` フックを利用する形にリファクタリング。
  - OSのテーマ設定とトグルの初期状態の不整合を、`useTheme` が返す `resolvedTheme` を利用することで解決。
  - `Header.tsx` をクライアントコンポーネント化し、`useTheme` を使ってテーマに応じたロゴ画像 (`logo-black.png`/`logo-white.png`) を表示するように修正。

- **`next/image` の画質調整**:
  - `next/image` の自動画像最適化による画質低下の可能性を考慮し、ロゴ画像の `Image` コンポーネントに `quality={100}` を追加して、圧縮を無効化し画質を最大化した。

## 2025-10-19

- **Headerのレスポンシブ対応**:
  - `tailwind.config.js` にカスタムブレークポイントを追加（`sp: 480px`, `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`, `2xl: 1440px`, `3xl: 1920px`）。
  - ハンバーガーメニューアイコンコンポーネント（`HamburgerIcon.tsx`）を新規作成。開閉状態に応じて三本線から×マークへアニメーションする仕様。
  - `Header.tsx` を全面的にリファクタリングし、レスポンシブ対応を実装：
    - SP（480px未満）サイズではハンバーガーアイコンを表示。タップでオーバーレイメニューを開閉。
    - PC（480px以上）サイズでは従来通りナビゲーションとテーマスイッチャーをヘッダーに表示。
    - PCサイズのナビゲーションを画面中央に配置（`absolute` + `translate`）。
  - `Typography.tsx` のclassName結合ロジックを改善（`filter(Boolean)` で空文字列を除外）。
  - ダークモードの背景色を微調整（`#0F0F0F` → `#1F1F1F`）。

- **Workコンポーネントの包括的なテスト作成**:
  - Vitestを使用したテスト駆動開発の学習を目的に、Workディレクトリの全コンポーネントに対して単体テストと統合テストを作成。
  - 単体テストとして以下の8ファイルを作成：
    - `WorkCardMetaItem.test.tsx` (5テスト) - デフォルトpタグレンダリング、asプロパティ、必須クラス、追加className、バリアント適用のテスト
    - `WorkCardCategory.test.tsx` (2テスト) - カテゴリ名表示、WorkCardMetaItem使用確認のテスト
    - `WorkCardTitle.test.tsx` (3テスト) - タイトル表示、h2タグレンダリング、font-boldクラスのテスト
    - `WorkCardRoles.test.tsx` (4テスト) - 全ロール表示、undefined/空配列ハンドリング、正しいカウントのテスト
    - `WorkCardTechnologies.test.tsx` (5テスト) - 全技術名表示、空配列ハンドリング、正しいカウント、liタグ使用、背景色クラスのテスト
    - `WorkCardThumbnail.test.tsx` (4テスト) - undefinedハンドリング、画像表示、altテキスト、必須クラスのテスト
    - `WorkCardDescription.test.tsx` (5テスト) - undefined/空文字列ハンドリング、説明文表示、HTMLパース、proseクラスのテスト
    - `WorkCardLink.test.tsx` (5テスト) - undefinedハンドリグ、リンク表示、VIEW SITEテキスト、href属性、inline-blockクラスのテスト
  - 統合テストとして `WorkCard.test.tsx` (5テスト) を作成 - 全情報の正しい表示、オプショナル項目のハンドリング、articleタグ、必須クラス、レスポンシブレイアウトのテスト
  - 合計38テストを作成し、全てパスすることを確認。
  - Next.jsの`Image`コンポーネントがURL最適化を行うため、直接的なURL比較テストを削除するなど、フレームワークの特性に応じた調整を実施。

- **Headerのページ遷移時のメニュー制御改善**:
  - ハンバーガーメニュー内のリンクをクリックした際の挙動を改善。
  - 従来: クリック時に即座にメニューを閉じる → ページ遷移開始
  - 改善後: ページ遷移完了後にメニューを閉じる（より自然なUX）
  - `usePathname`フックを使用してページ遷移を検知し、`useEffect`でメニューを自動的に閉じる実装に変更。
  - 不要になった`onLinkClick`プロパティを`HeaderNav.tsx`と`HeaderNavigationItem.tsx`から削除。

- **Headerコンポーネント群の包括的なコードレビューとテスト作成**:
  - 3つの軸（単体分析、プロジェクト内比較、ベストプラクティス比較）と6段階評価によるコードレビューを実施。
  - レビュー結果に基づき、以下を修正：
    - 不要になった`onClick`/`onLinkClick`プロパティの完全削除
    - 細かい記述の統一（スペース、クォートなど）
  - 単体テストとして以下の3ファイルを作成：
    - `ThemeSwitcher.test.tsx` (6テスト) - マウント後の表示、ライト/ダークモード切り替え、setTheme呼び出しのテスト
    - `HeaderNavigationItem.test.tsx` (6テスト) - リンク表示、アクティブ状態のクラス適用、aria-disabled属性のテスト
    - `HeaderNav.test.tsx` (6テスト) - ナビゲーション表示、レスポンシブレイアウト（横並び/縦並び）のテスト
  - 統合テストとして `Header.test.tsx` (10テスト) を作成 - 全要素の表示、ハンバーガーメニューの開閉、pathname変更時の自動クローズ、テーマ対応ロゴ表示のテスト
  - `@testing-library/user-event`をインストールし、ユーザーインタラクションのテストを実装。
  - モックの実装方法を修正（`require`から`vi.mocked`へ）し、より堅牢なテストコードに改善。
  - 合計28テストを作成し、全てパスすることを確認。
  - カバレッジレポートでHeaderコンポーネント群が98.19%を達成。

## 2025-10-19 (Part 2): 本番ビルドエラーの修正とデプロイ準備

- **Vercelビルドエラーの調査と修正**:
  - Vercelでの本番ビルド時にテストファイルが含まれていたことによるESLintエラーを特定。
  - `tsconfig.json`の`exclude`にテストファイル（`**/*.test.ts`, `**/*.test.tsx`）を追加し、TypeScriptのビルド対象から除外。
  - `eslint.config.mjs`に`ignores`パターンを追加し、ESLintの検証対象からもテストファイルを除外。

- **ThemeProviderの型インポート修正**:
  - `components/providers/ThemeProvider.tsx`で内部実装パス（`next-themes/dist/types`）を直接参照していた問題を修正。
  - 公式エクスポートパス（`next-themes`）からの型インポートに変更し、ビルドの堅牢性を向上。

- **デプロイフロー方針の検討**:
  - 商用利用を考慮し、Vercel無料プランとGoogle Cloud Runを比較検討。
  - フリーランス営業用途のため、Vercelの有料プランまたはCloud Runでの公開を検討中。


## 2025-10-19 (Part 3): フォントの最適化によるパフォーマンス改善

- **目的**:
  - Webフォントのファイルサイズを削減し、ページの読み込みパフォーマンスを向上させる。

- **経緯**:
  - 当初、`PlemolJPConsole_NF` からNerd Fontアイコンを除外するサブセット化を試みたが、`pyftsubset`のコマンド仕様の解釈に手間取り、複数回失敗した。
  - 方針を転換し、ユーザーが用意したNerd Font非同梱版の `PlemolJPConsole` を最適化の対象とした。
  - プロジェクトで未使用のイタリック体フォント（8ファイル）を削除。
  - `pyftsubset`の仕様を再度誤認し、グリフを一切含まない空のフォントファイルを生成してしまうミスが発生。
  - 最終的に、`--unicodes='*'` オプションを使用することで、フォントが持つすべての文字を保持したまま最適化と`woff2`形式への変換を行う正しい手法に到達。

- **結果**:
  - 非イタリック体のフォント8種（Bold, ExtraLight, Light, Regular, Medium, SemiBold, Text, Thin）を、文字情報を一切損なうことなく`woff2`形式に変換・最適化。
  - これにより、`.ttf`形式（約5.4MB）から`.woff2`形式（約1.8MB）へと、ファイルあたり約66%の大幅なファイルサイズ削減を達成した。
  - `globals.css`を修正し、新しい`.woff2`フォントを読み込むように`@font-face`定義を全面的に更新。
  - 誤って削除してしまったアイコンフォントの定義をCSSに再追加し、`font-family`のフォールバックも修正した。
  - 不要になった元の`.ttf`ファイルはプロジェクトから完全に削除した。