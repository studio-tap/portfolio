import { getWorks } from "@/lib/microcms";
import { MainInner } from "@/components/layout/MainInner";
import { WorksMasonry } from "@/components/Work/WorksMasonry";

export const revalidate = 3600; // 1時間ごとに再検証

export default async function Home() {
  // サーバー側でデータ取得
  const data = await getWorks({ depth: 2, orders: 'order,-publishedAt' });
  const works = data.contents;

  return (
    <MainInner>
      <WorksMasonry works={works} />
    </MainInner>
  );
}
