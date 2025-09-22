'use client';
import Image, { type ImageProps } from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { authClient } from '../lib/auth-client';
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
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const helloQuery = api.hello.useQuery({ name: 'World' });
  const getTasksQuery = api.getTasks.useQuery(undefined, {
    enabled: !!session,
  });
  const utils = api.useUtils();
  const createTaskMutation = api.createTask.useMutation({
    onSuccess: () => {
      utils.getTasks.invalidate();
    },
  });

  useEffect(() => {
    if (!isPending && !session) {
      router.push('/login');
    }
  }, [session, isPending, router]);

  if (isPending || !session) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className="mb-4 flex items-center justify-between">
          <h1 className={styles.logo}>Project Planner</h1>
          <div className="flex items-center gap-2">
            <span>Welcome, {session.user.name}</span>
            <Button
              variant="outline"
              onClick={() =>
                authClient.signOut().then(() => router.push('/login'))
              }
            >
              Logout
            </Button>
          </div>
        </div>

        <div className="mt-8 rounded border p-4">
          <h2 className="mb-2 font-semibold text-lg">Your Tasks</h2>
          {getTasksQuery.isLoading && <p>Loading tasks...</p>}
          {getTasksQuery.data && (
            <ul>
              {getTasksQuery.data.map((task) => (
                <li key={task.id} className="mb-2 rounded border p-2">
                  <h3>{task.title}</h3>
                  {task.description && <p>{task.description}</p>}
                </li>
              ))}
            </ul>
          )}
          <Button
            variant="outline"
            onClick={() =>
              createTaskMutation.mutate({
                title: 'New Task',
                description: 'Description',
              })
            }
            className="mt-2"
            disabled={createTaskMutation.isPending}
          >
            {createTaskMutation.isPending ? 'Adding...' : 'Add New Task'}
          </Button>
        </div>

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
    </div>
  );
}
