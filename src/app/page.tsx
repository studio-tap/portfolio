import { getWorks } from "@/lib/microcms";
import React from 'react';
import { WorkCard } from "@/components/Work/WorkCard";
import { MainContents } from "@/components/layout/MainContents";

export default async function Home(): Promise<React.ReactElement> {
  const data = await getWorks();

  return (
    <main>
      <MainContents>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.contents.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      </MainContents>
    </main>
  );
}
