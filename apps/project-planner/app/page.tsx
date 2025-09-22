'use client';
import Image, { type ImageProps } from 'next/image';
import { api } from '../lib/trpc';

import { Button } from '@repo/ui/components/ui/button';
import styles from './page.module.css';

type Props = Omit<ImageProps, 'src'> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

export default function Home() {
  const helloQuery = api.hello.useQuery({ name: 'World' });

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ThemeImage
          className={styles.logo}
          srcLight="turborepo-dark.svg"
          srcDark="turborepo-light.svg"
          alt="Turborepo logo"
          width={180}
          height={38}
          priority
        />
        <ol>
          <li>
            Get started by editing <code>apps/web/app/page.tsx</code>
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex justify-between">
          <Button className="bg-gray-900">
            <a
              href="https://vercel.com/new/clone?demo-description=Learn+to+implement+a+monorepo+with+a+two+Next.js+sites+that+has+installed+three+local+packages.&demo-image=%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F4K8ZISWAzJ8X1504ca0zmC%2F0b21a1c6246add355e55816278ef54bc%2FBasic.png&demo-title=Monorepo+with+Turborepo&demo-url=https%3A%2F%2Fexamples-basic-web.vercel.sh%2F&from=templates&project-name=Monorepo+with+Turborepo&repository-name=monorepo-turborepo&repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fturborepo%2Ftree%2Fmain%2Fexamples%2Fbasic&root-directory=apps%2Fdocs&skippable-integrations=1&teamSlug=vercel&utm_source=create-turbo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-between"
            >
              <Image
                className={styles.logo}
                src="/vercel.svg"
                alt="Vercel logomark"
                width={20}
                height={20}
              />
              <div>Deploy now</div>
            </a>
          </Button>
          <Button variant="outline">
            <a
              href="https://turbo.build/repo/docs?utm_source"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read our docs
            </a>
          </Button>
        </div>
        <Button variant="outline">Open alert</Button>

        <div className="mt-8 rounded border p-4">
          <h2 className="mb-2 font-semibold text-lg">
            tRPC API Example (Powered by React Query)
          </h2>
          {helloQuery.isLoading && <p>Loading...</p>}
          {helloQuery.error && <p>Error: {helloQuery.error.message}</p>}
          {helloQuery.data && <p>{helloQuery.data}</p>}
          <Button
            variant="outline"
            onClick={() => helloQuery.refetch()}
            className="mt-2"
            disabled={helloQuery.isFetching}
          >
            {helloQuery.isFetching ? 'Refetching...' : 'Refetch'}
          </Button>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com/templates?search=turborepo&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://turbo.build?utm_source=create-turbo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to turbo.build →
        </a>
      </footer>
    </div>
  );
}
