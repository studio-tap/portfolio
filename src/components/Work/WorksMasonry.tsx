'use client';

import type { ReactElement } from 'react';
import Masonry from 'react-masonry-css';
import { WorkCard } from './WorkCard';
import styles from './WorksMasonry.module.css';
import type { Work } from '@/lib/microcms';

type Props = {
  works: Work[];
};

export const WorksMasonry = ({ works }: Props): ReactElement => {
  const breakpointColumnsObj = {
    default: 2,
    768: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={styles['masonry-grid']}
      columnClassName={styles['masonry-grid_column']}
    >
      {works.map((work) => (
        <WorkCard key={work.id} work={work} />
      ))}
    </Masonry>
  );
};
