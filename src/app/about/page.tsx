import React from 'react';

import { AboutImage } from '@/components/About/AboutImage';
import { Header } from '@/components/Header/Header';
import { MainInner } from '@/components/layout/MainInner';
import { BaseLink } from '@/components/Link/BaseLink';
import { ExternalLink } from '@/components/Link/ExternalLink';
import { Typography } from '@/components/Typography/Typography';

const CURRENT_PATH = '/about';

const AboutPage = (): React.ReactElement => {
  return (
    <>
      <Header currentPath={CURRENT_PATH} />
      <main className="flex flex-1 flex-col">
        <MainInner className="flex flex-1 flex-col">
          <div className="flex-shrink-0">
            <div>
              <Typography
                as="h2"
                className="font-bold"
                variant="about-title"
              >
                PROFILE
              </Typography>
              <Typography
                as="p"
                className="font-light"
                variant="body-normal"
              >
                クスノキ
                <br />
                WEB Design, Coding, WEB Direction
                <br />
                鳥取県出身。埼玉県在住。
              </Typography>
            </div>

            <div className="mt-4">
              <Typography
                as="h2"
                className="font-bold"
                variant="about-title"
              >
                SKILLS
              </Typography>
              <Typography
                as="p"
                className="font-light"
                variant="body-normal"
              >
                HTML, CSS, JavaScript, TypeScript, React, Next.js, Vue.js, Nuxt.js, Tailwind CSS, Sass,
                <br />
                PHP, Laravel, WordPress, Python, Django,
                <br />
                MySQL, PostgreSQL, SQL,
                <br />
                Git, Docker, Figma, microCMS...
              </Typography>
            </div>

            <div className="mt-4">
              <Typography
                as="h2"
                className="font-bold"
                variant="about-title"
              >
                CONTACT
              </Typography>
              <Typography
                as="p"
                className="font-light"
                variant="body-normal"
              >
                Email: <BaseLink href="mailto:camphora@studio-tap.com">camphora@studio-tap.com</BaseLink>
                <br />
                Form: <ExternalLink href="https://forms.gle/1iG7xoAD34fJ8hjy5">Google Form</ExternalLink>
              </Typography>
            </div>
          </div>
          <AboutImage />
        </MainInner>
      </main>
    </>
  );
};

export default AboutPage;
