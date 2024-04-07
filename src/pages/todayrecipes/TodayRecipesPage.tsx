import { db } from '@/api/pocketbase';
import { DefaultLoader, Header, LargeCard } from '@/components';
// import getPbImage from '@/util/data/getPBImage';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { RecordModel } from 'pocketbase';

export function TodayRecipesPage() {
  const { title } = useParams();
  const [userData, setUserData] = useState<RecordModel>();

  const getRecipeData = async () => {
    const recordsData = await db.collection('recipes').getList(1, 10, {
      expand: 'rating, profile',
      sort: '-views',
    });
    return recordsData?.items;
  };

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

  if (status === 'pending') return <DefaultLoader />;
  if (status === 'error') return <DefaultLoader />;

  return (
    <div className="w-full h-full bg-gray-200 overflow-auto">
      <Helmet>
        <title>HealthyP | {title}</title>
      </Helmet>
      <Header option="titleWithBack" title={title} />
      <div className="grid gap-6pxr pb-140pxr grid-cols-card justify-center w-full"></div>
      {<p className="mx-auto w-full">로딩중</p>}
    </div>
  );
}
