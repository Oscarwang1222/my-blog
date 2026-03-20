import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Translate, {translate} from '@docusaurus/Translate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faCode, faServer, faMobileAlt, faRocket } from '@fortawesome/free-solid-svg-icons';

import styles from './about.module.css';

export default function About(): ReactNode {
  return (
    <Layout
      title={translate({id: 'about.pageTitle', message: 'About Me'})}
      description={translate({id: 'about.pageDescription', message: 'About me - Personal introduction'})}>
      <div className="container" style={{padding: '60px 20px', maxWidth: '800px'}}>
        <div style={{textAlign: 'center', marginBottom: '40px'}}>
          <img
            src="/img/logo.svg"
            alt="Avatar"
            className={styles.avatar}
          />
          <Heading as="h1">
            <Translate id="about.title">About Me</Translate>
          </Heading>
        </div>
        
        <div className={styles.content}>
          <p className={styles.intro}>
            <Translate id="about.intro">Hi there! I'm a developer who loves technology.</Translate>
          </p>
          
          <Heading as="h2" className={styles.sectionTitle}>
            <FontAwesomeIcon icon={faRocket} className="text-blue" style={{marginRight: '10px'}} />
            <Translate id="about.skills.title">Skills</Translate>
          </Heading>
          <div className={styles.skillsGrid}>
            <div className={styles.skillCard}>
              <FontAwesomeIcon icon={faCode} className="text-blue" />
              <span>Frontend Development</span>
              <small>React, Vue, TypeScript</small>
            </div>
            <div className={styles.skillCard}>
              <FontAwesomeIcon icon={faServer} className="text-green" />
              <span>Backend Development</span>
              <small>Node.js, Python</small>
            </div>
            <div className={styles.skillCard}>
              <FontAwesomeIcon icon={faMobileAlt} className="text-purple" />
              <span>Mobile Development</span>
              <small>React Native, Flutter</small>
            </div>
          </div>
          
          <Heading as="h2" className={styles.sectionTitle}>
            <FontAwesomeIcon icon={faEnvelope} className="text-green" style={{marginRight: '10px'}} />
            <Translate id="about.contact.title">Contact</Translate>
          </Heading>
          <div className={styles.contactLinks}>
            <a href="https://github.com/Oscarwang1222" className={styles.contactLink}>
              <FontAwesomeIcon icon={faGithub} />
              <span>GitHub</span>
            </a>
            <a href="mailto:527691098@qq.com" className={styles.contactLink}>
              <FontAwesomeIcon icon={faEnvelope} />
              <span>Email</span>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
