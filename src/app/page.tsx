import { getWorks } from "@/lib/microcms";
import React from 'react';

export default async function Home(): Promise<React.ReactElement> {
  const data = await getWorks();
  console.log(JSON.stringify(data, null, 2));

  return (
    <main>
      {/* Content will be added here later */}
    </main>
  );
}
