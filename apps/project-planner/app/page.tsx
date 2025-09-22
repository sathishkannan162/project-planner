'use client';

import { Button } from '@repo/ui/components/ui/button';
import { api } from '../lib/trpc';
import { authClient } from '../lib/auth-client';
import styles from './page.module.css';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

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
