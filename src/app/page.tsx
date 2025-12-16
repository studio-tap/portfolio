import { Header } from '@/components/Header/Header';
import { MainInner } from '@/components/layout/MainInner';
import { WorksMasonry } from '@/components/Work/WorksMasonry';
import { getWorks } from '@/lib/microcms';

export const revalidate = 3600; // 1時間ごとに再検証

const CURRENT_PATH = '/';

export default async function Home() {
  // サーバー側でデータ取得
  const data = await getWorks({ depth: 2, orders: 'order,-publishedAt' });
  const works = data.contents;

  return (
    <>
      <Header currentPath={CURRENT_PATH} />
      <main className="flex flex-1 flex-col">
        <MainInner>
          <WorksMasonry works={works} />
        </MainInner>
      </main>
    </>
  );
}
