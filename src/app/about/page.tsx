import React from 'react';
import { MainInner } from '@/components/layout/MainInner';
import { Typography } from '@/components/Typography/Typography';
import { BaseLink } from '@/components/Link/BaseLink';
import { ExternalLink } from '@/components/Link/ExternalLink';
import { AboutImage } from '@/components/About/AboutImage';

const AboutPage = (): React.ReactElement => {
  return (
    <MainInner className="flex flex-col flex-1">
      {/* Text Content */}
      <div className="flex-shrink-0">
        <div>
          <Typography as="h2" variant="about-title" className="font-bold">
            PROFILE
          </Typography>
          <Typography as="p" variant="body-normal" className='font-light'>
            クスノキ<br />
            WEB Design, Coding, WEB Direction<br />
            鳥取県出身。埼玉県在住。
          </Typography>
        </div>

        <div className="mt-4">
          <Typography as="h2" variant="about-title" className="font-bold">
            SKILLS
          </Typography>
          <Typography as="p" variant="body-normal" className='font-light'>
            HTML, CSS, JavaScript, TypeScript, React, Next.js, Vue.js, Nuxt.js, Tailwind CSS, Sass,<br />
            PHP, Laravel, WordPress, Python, Django,<br />
            MySQL, PostgreSQL, SQL,<br />
            Git, Docker, Figma, microCMS...
          </Typography>
        </div>

        <div className="mt-4">
          <Typography as="h2" variant="about-title" className="font-bold">
            CONTACT
          </Typography>
          <Typography as="p" variant="body-normal" className="font-light">
            Email: <BaseLink href="mailto:camphora@studio-tap.com">camphora@studio-tap.com</BaseLink><br />
            Form: <ExternalLink href="https://forms.gle/1iG7xoAD34fJ8hjy5">Google Form</ExternalLink>
          </Typography>
        </div>
      </div>

      {/* Image Section */}
      <AboutImage />
    </MainInner>
  );
};

export default AboutPage;