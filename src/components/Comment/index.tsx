import {useColorMode} from '@docusaurus/theme-common';
import Giscus from '@giscus/react';
import React from 'react';

export default function Comment(): React.JSX.Element {
  const {colorMode} = useColorMode();

  return (
    <Giscus
      repo="Oscarwang1222/blog-comments"
      repoId="R_kgDORgr4RA"
      category="Announcements"
      categoryId="DIC_kwDORgr4RM4C339t"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={colorMode === 'dark' ? 'dark' : 'light'}
      lang="zh-CN"
      loading="lazy"
    />
  );
}
