import { db } from '@/api/pocketbase';
import { Header, Star, SkeletonLargeCard } from '@/components';
import { Helmet } from 'react-helmet-async';
import { RecordModel } from 'pocketbase';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import getPbImage from '@/util/data/getPBImage';
import { RatingsResponse, UsersResponse } from '@/types';
import { Ref } from 'react';
import { top_recipe } from '@/stores/stores';
import { useAtomValue, useSetAtom } from 'jotai';
import firstPlaceBadge from '@/assets/icons/first_place_badge.png';
import { motion } from 'framer-motion';

// let rendercount = 0;

const Skeleton = () => {
  return (
    <>
      <SkeletonLargeCard />
      <SkeletonLargeCard />
    </>
  );
};
interface profileProps {
  profile?: UsersResponse;
  profileImg?: string;
}
export interface LargeCardProps extends profileProps {
  title: string;
  type?: 'bookmark' | 'myRecipe';
  url: string | undefined;
  keywords?: string;
  desc: string;
  rating: RatingsResponse[];
  id: string;
  userData: RecordModel | undefined;
  innerRef?: Ref<HTMLDivElement>;
  index: number;
}

function RecipeCard({
  rating,
  url,
  title,
  profile,
  index
  } : LargeCardProps) {
  return (
    <div className='w-full p-3 flex bg-white shadow-lg justify-center items-center rounded-lg gap-2'>
      <p className='w-80pxr text-center font-bold text-xl'>{index+1}등</p>
      <div className='h-full w-2pxr mx-10pxr bg-gray-400'></div>
      <img src={url} alt="" className='size-80pxr min-w-80pxr object-cover object-center rounded-lg'/>
      <div className='w-full'>
        <h1 className='text-lg font-semibold'>{profile?.name}</h1>
        <h2 className='text-md font-semibold line-clamp-1'>{title}</h2>
        <Star rating={rating} />
      </div>
    </div>
  )
}

function TodayRecipesItems() {
  const [userData, setUserData] = useState<RecordModel>();
  const setTopRecipe = useSetAtom(top_recipe);

  const getRecipeData = useCallback(async () => {
    const recordsData = await db.collection('recipes').getList(1, 10, {
      expand: 'rating, profile',
      sort: '-views',
    });
    setTopRecipe(recordsData?.items[0]);
    return recordsData?.items;
  }, []);

  const { data, status } = useQuery({ queryKey: ['todayrecipes'], queryFn: getRecipeData });

  const contents = data?.map((recipe, index) => {
    const url = getPbImage('recipes', recipe.id, recipe.image);
    return (
      <RecipeCard
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
        index={index}
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
  const topRecipe = useAtomValue(top_recipe);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const url = getPbImage('recipes', topRecipe.id, topRecipe.image);
    setImageUrl(url);
  }, [topRecipe])

  return (
    <div className="w-full h-full bg-white overflow-auto">
      <Helmet>
        <title>HealthyP | 오늘의 레시피</title>
      </Helmet>
      <Header option="onlyArrow" />
      <div className='w-full pt-4 pb-10 flex flex-col items-center gap-5'>
        <p className='text-3xl font-extrabold'>오늘의 레시피</p>
        <motion.div 
          initial={{y: 40}}
          animate={{ y: 0 }}
          transition={{ ease: "easeOut", duration: 1 }}
          className='p-4 shadow-xl flex flex-col items-center w-fit rounded-2xl relative bg-white'>
          <img src={firstPlaceBadge} alt="1등 뱃지" className='absolute size-50pxr top-1 left-0' />
          <img src={imageUrl} alt="" className='size-100pxr object-cover object-center rounded-full'/>
          <p>{topRecipe.expand?.profile.name}님의</p>
          <h1 className='text-lg font-semibold line-clamp-1 max-w-100pxr'>{topRecipe.title}</h1>
        </motion.div>
      </div>
      <hr className='border'/>
      <div className='w-full h-full px-10pxr'>
        <TodayRecipesItems />
      </div>
    </div>
  );
}
