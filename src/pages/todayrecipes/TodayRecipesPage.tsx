import { db } from '@/api/pocketbase';
import { Header, LargeCard, SkeletonLargeCard } from '@/components';
import { Helmet } from 'react-helmet-async';
import { RecordModel } from 'pocketbase';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import getPbImage from '@/util/data/getPBImage';

// let rendercount = 0;

const Skeleton = () => {
  return (
    <>
      <SkeletonLargeCard />
      <SkeletonLargeCard />
    </>
  );
};

function TodayRecipesItems() {
  const [userData, setUserData] = useState<RecordModel>();
  const getRecipeData = useCallback(async () => {
    const recordsData = await db.collection('recipes').getList(1, 10, {
      expand: 'rating, profile',
      sort: '-views',
    });
    return recordsData?.items;
  }, []);

  const { data, status } = useQuery({ queryKey: ['todayrecipes'], queryFn: getRecipeData });
  console.log(status);

  const contents = data?.map((recipe, index) => {
    const url = getPbImage('recipes', recipe.id, recipe.image);
    return (
      <LargeCard
        // innerRef={ref}
        key={index}
        id={recipe.id}
        userData={userData}
        rating={recipe.expand?.rating}
        url={recipe.image && url}
        desc={recipe.desc}
        title={recipe.title}
        profile={recipe.expand?.profile}
        keywords={recipe.keywords}
      />
    );
  });

  useEffect(() => {
    async function getUserData() {
      try {
        // setIsLoading(true);
        const currentUser = localStorage.getItem('pocketbase_auth');
        if (currentUser === null) return;
        const userId = JSON.parse(currentUser).model.id;
        const response = await db.collection('users').getOne(userId, { requestKey: null });
        if (response === undefined) return;
        setUserData(response);
      } finally {
        // setIsLoading(false);
      }
    }

    getUserData();
    db.collection('users').subscribe('*', getUserData);

    return () => {
      db.collection('users').unsubscribe();
    };
  }, []);

  if (status === 'pending')
    return (
      <div className="grid gap-6pxr pb-140pxr grid-cols-card justify-center w-full">
        <Skeleton />;
      </div>
    );

  if (status === 'error')
    return (
      <div className="grid gap-6pxr pb-140pxr grid-cols-card justify-center w-full">
        <Skeleton />;
      </div>
    );

  return <div className="grid gap-6pxr pb-140pxr grid-cols-card justify-center w-full">{contents}</div>;
}

export function TodayRecipesPage() {
  // const [isLoading, setIsLoading] = useState(true);

  // rendercount++;

  return (
    <div className="w-full h-full bg-gray-200 overflow-auto">
      <Helmet>
        <title>HealthyP | 오늘의 레시피</title>
      </Helmet>
      <Header option="titleWithBack" title={'오늘의 레시피'} />
      <TodayRecipesItems />
    </div>
  );
}
