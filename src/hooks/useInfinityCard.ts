import { useInfiniteQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { RecordModel } from 'pocketbase';
import { db } from '@/api/pocketbase';
import { useInView } from 'react-intersection-observer';

interface infinityCardProps {
  callbackFn: (pageParam: { pageParam: number | undefined }) => Promise<RecordModel[]>;
  title: string;
}

export function useInifinityCard({ callbackFn, title }: infinityCardProps) {
  const { ref, inView } = useInView({ threshold: 0.7 });
  const [userData, setUserData] = useState<RecordModel>();

  const { data, status, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [title],
    queryFn: callbackFn,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  useEffect(() => {
    async function getUserData() {
      const currentUser = localStorage.getItem('pocketbase_auth');
      if (currentUser === null) return;
      const userId = JSON.parse(currentUser).model.id;
      const response = await db.collection('users').getOne(userId, { requestKey: null });
      if (response === undefined) return;
      setUserData(response);
    }

    getUserData();
    db.collection('users').subscribe('*', getUserData);

    return () => {
      db.collection('users').unsubscribe();
    };
  }, []);

  return { data, status, isFetchingNextPage, userData, ref };
}
