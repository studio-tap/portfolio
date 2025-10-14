import { createClient, type MicroCMSDate, type MicroCMSImage, type MicroCMSListResponse, type MicroCMSQueries } from 'microcms-js-sdk';

const serviceDomain = process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.NEXT_PUBLIC_MICROCMS_API_KEY;

if (!serviceDomain || !apiKey) {
  throw new Error('microCMSのサービスドメインとAPIキーを環境変数に設定してください。');
}

export const client = createClient({
  serviceDomain,
  apiKey,
});

// 役割の型定義
export type Role = {
  id: string;
  name: string;
} & MicroCMSDate;

// カテゴリの型定義
export type Category = {
  id: string;
  name: string;
} & MicroCMSDate;

// 技術スタックの型定義
export type Technology = {
  id: string;
  name: string;
} & MicroCMSDate;


// 作品の型定義
export type Work = {
  id: string;
  title: string;
  description?: string;
  thumbnail?: MicroCMSImage;
  url?: string;
  github?: string;
  category: Category;
  roles?: Role[];
  technologies: Technology[];
  order?: number;
} & MicroCMSDate;

// 作品一覧を取得する関数
export const getWorks = async (queries?: MicroCMSQueries): Promise<MicroCMSListResponse<Work>> => {
  const data = await client.getList<Work>({
    endpoint: "works",
    queries,
  });

  return data;
};
