import { db } from '@/api/pocketbase';
import { DefaultLoader, Header, LargeCard } from '@/components';
import getPbImage from '@/util/data/getPBImage';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { RecordModel } from 'pocketbase';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';

/*
 * -------------TODO-------------
 * - [ ] Remove abort error
 * - [ ] fetching 상태일때 이전 데이터 그대로 렌더링 되는거 해결
 *       근데 이게 해당 카테고리의 기존 데이터인지, 아니면 새로운 카테고리의 기존 데이터인지 구분해야함 shit
 * - [ ] 특정 데이터만 max를 지정?
 * - [ ]
 * - [ ]
 */

export function CategoryPage() {
  const { title } = useParams();
  const { ref, inView } = useInView({ threshold: 0.7 });
  const [userData, setUserData] = useState<RecordModel>();

  const getRecipeData = async ({ pageParam = 1 }) => {
    if (title === '오늘의 레시피') {
      const recordsData = await db.collection('recipes').getList(pageParam, 10, {
        expand: 'rating, profile',
        sort: '-views',
      });
      return recordsData?.items;
    } else {
      const recordsData = await db.collection('recipes').getList(pageParam, 5, {
        expand: 'rating, profile',
        filter: `category = "${title}"`,
        sort: '-created',
      });

      return recordsData?.items;
    }
  };

  // const getRecipeData = async ({ pageParam = 1 }) => {
  //   switch (title) {
  //     case title === '건강식':
  //       console.log('건강식');
  //       await db
  //         .collection('recipes')
  //         .getList(pageParam, 5, titleMap[title])
  //         .then((data) => data.items)
  //         .catch((err) => {
  //           if (!err.isAbort) console.warn('non cancellation error:', err);
  //         });
  //   }
  // };
  const { data, status, isFetchingNextPage, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['recipes'],
    queryFn: getRecipeData,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage?.length ? allPages.length + 1 : undefined;
      return nextPage;
    },
    // maxPages: 2,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      console.log('isInview');
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

  const contents = data?.pages.map((recipes) =>
    recipes?.map((recipe, index) => {
      const url = getPbImage('recipes', recipe.id, recipe.image);
      if (recipes?.length === index + 1)
        return (
          <LargeCard
            innerRef={ref}
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
      return (
        <LargeCard
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
    })
  );

  if (status === 'pending') return <DefaultLoader />;
  if (status === 'error') return <DefaultLoader />;

  return (
    <div className="w-full h-full bg-gray-200 overflow-auto">
      <Helmet>
        <title>HealthyP | {title}</title>
      </Helmet>
      <Header option="titleWithBack" title={title} />
      <div className="grid gap-6pxr pb-140pxr grid-cols-card justify-center w-full">{contents}</div>
      {isFetchingNextPage && <p className="mx-auto w-full">로딩중</p>}
    </div>
  );
}
