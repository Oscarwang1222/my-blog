import BlogPostItem from '@theme-original/BlogPostItem';
import type {Props} from '@theme/BlogPostItem';
import Comment from '@site/src/components/Comment';
import {useLocation} from '@docusaurus/router';
import React from 'react';

export default function BlogPostItemWrapper(props: Props): React.JSX.Element {
  const location = useLocation();
  const isBlogPostPage = location.pathname.startsWith('/blog/') && 
                          !location.pathname.endsWith('/blog') &&
                          !location.pathname.includes('/tags/') &&
                          !location.pathname.includes('/authors/');
  const comments = (props as any).content?.frontMatter?.comments ?? true;

  return (
    <>
      <BlogPostItem {...props} />
      {isBlogPostPage && comments && <Comment />}
    </>
  );
}
