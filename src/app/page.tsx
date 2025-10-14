'use client';

import { getWorks } from "@/lib/microcms";
import React, { useState, useEffect } from 'react';
import { WorkCard } from "@/components/Work/WorkCard";
import { MainInner } from "@/components/layout/MainInner";
import Masonry from 'react-masonry-css';
import styles from './page.module.css';
import type { Work } from '@/lib/microcms';

export default function Home(): React.ReactElement {
  const [works, setWorks] = useState<Work[]>([]);

  useEffect(() => {
    const fetchWorks = async () => {
      // depth: 2 を指定して、参照コンテンツを確実に取得
      const data = await getWorks({ depth: 2, orders: 'order,-publishedAt' });
      setWorks(data.contents);
    };
    fetchWorks();
  }, []);

  const breakpointColumnsObj = {
    default: 2,
    768: 1, // 768px 未満で1カラム
  };

  return (
    <MainInner>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={styles['my-masonry-grid']}
        columnClassName={styles['my-masonry-grid_column']}
      >
        {works.map((work) => (
          <WorkCard key={work.id} work={work} />
        ))}
      </Masonry>
    </MainInner>
  );
}