import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Translate, {translate} from '@docusaurus/Translate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBlog,
  faUser,
  faCode,
  faRocket,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';

import styles from './index.module.css';
import TodoList from '@site/src/components/TodoList';
import '../icons';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.avatar}>
          <img
            src="/img/logo.svg"
            alt="Avatar"
            className={styles.avatarImg}
          />
        </div>
        <Heading as="h1" className="hero__title">
          <Translate id="homepage.title">Welcome to My Blog</Translate>
        </Heading>
        <p className="hero__subtitle">
          <Translate id="homepage.tagline">Sharing tech notes and experiences</Translate>
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--lg button--blue"
            to="/blog">
            <FontAwesomeIcon icon={faBlog} style={{marginRight: '8px'}} />
            <Translate id="homepage.readBlog">Read Blog</Translate>
          </Link>
          <Link
            className="button button--lg button--outline-purple"
            to="/about">
            <FontAwesomeIcon icon={faUser} style={{marginRight: '8px'}} />
            <Translate id="homepage.aboutMe">About Me</Translate>
          </Link>
        </div>
      </div>
    </header>
  );
}

function HomepageContent() {
  return (
    <div className="container" style={{padding: '40px 0'}}>
      <div className={styles.featureGrid}>
        <div className={styles.featureCard}>
          <Heading as="h3">
            <FontAwesomeIcon icon={faCode} className="text-blue" style={{marginRight: '8px'}} />
            <Translate id="homepage.feature.techNotes.title">Tech Notes</Translate>
          </Heading>
          <p>
            <Translate id="homepage.feature.techNotes.description">Recording learning experiences and troubleshooting tips</Translate>
          </p>
          <Link to="/blog" className="text-blue">
            <Translate id="homepage.readMore">Read More</Translate> →
          </Link>
        </div>
        <div className={styles.featureCard}>
          <Heading as="h3">
            <FontAwesomeIcon icon={faRocket} className="text-green" style={{marginRight: '8px'}} />
            <Translate id="homepage.feature.projectSharing.title">Project Sharing</Translate>
          </Heading>
          <p>
            <Translate id="homepage.feature.projectSharing.description">Sharing interesting personal projects and practical experiences</Translate>
          </p>
          <Link to="/blog" className="text-green">
            <Translate id="homepage.readMore">Read More</Translate> →
          </Link>
        </div>
        <div className={styles.featureCard}>
          <Heading as="h3">
            <FontAwesomeIcon icon={faHeart} className="text-pink" style={{marginRight: '8px'}} />
            <Translate id="homepage.feature.lifeThoughts.title">Life Thoughts</Translate>
          </Heading>
          <p>
            <Translate id="homepage.feature.lifeThoughts.description">Recording moments and thoughts in life</Translate>
          </p>
          <Link to="/blog" className="text-pink">
            <Translate id="homepage.readMore">Read More</Translate> →
          </Link>
        </div>
      </div>
      <TodoList />
    </div>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={translate({id: 'homepage.pageTitle', message: 'Home'})}
      description={translate({id: 'homepage.pageDescription', message: 'My personal blog - Sharing tech notes and experiences'})}>
      <HomepageHeader />
      <main>
        <HomepageContent />
      </main>
    </Layout>
  );
}
