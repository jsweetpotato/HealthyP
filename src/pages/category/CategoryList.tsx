import { db } from '@/api/pocketbase';
import { LargeCard, SkeletonLargeCard } from '@/components';
import getPbImage from '@/util/data/getPBImage';
import { useParams, Link } from 'react-router-dom';
import { useInfinityCard } from '@/hooks/useInfinityCard';
import healthyFood from '@/assets/icons/healthy_food.png';
import bulk from '@/assets/icons/bulk.png';
import diet from '@/assets/icons/diet.png';
import vegan from '@/assets/icons/vegan.png';

const Skeleton = () => {
  return (
    <>
      <SkeletonLargeCard />
      <SkeletonLargeCard />
    </>
  );
};


const categories = [
  {
    label: '건강식',
    image: healthyFood,
  },
  {
    label: '다이어트',
    image: diet,
  },
  {
    label: '벌크업',
    image: bulk,
  },
  {
    label: '비건',
    image: vegan,
  },
];

// function CategoryButtons() {
//   return (
//     <div className="w-full flex py-10pxr">
//       {categories.map((item) => {
//         return (
//           <Link
//             key={item.label}
//             to={`/category/${item.label}`}
//             className="h-74pxr w-60pxr flex flex-col items-center gap-4pxr"
//           >
//             <div className="size-50pxr flex justify-center items-center rounded-full border hover:bg-gray-200">
//               <img src={item.image} alt={item.label} className="size-32pxr" />
//             </div>
//             <h2 className="text-foot">{item.label}</h2>
//           </Link>
//         );
//       })}
//     </div>
//   );
// }


function CategoryItems({ title }: { title: string | undefined }) {
  async function getRecipeData({ pageParam = 1 }) {
    const recordsData = await db.collection('recipes').getList(pageParam, 5, {
      expand: 'rating, profile',
      filter: `category = "${title}"`,
      sort: '-created',
    });

    return recordsData?.items;
  }

  const { data, status, isFetchingNextPage, userData, ref } = useInfinityCard({
    callbackFn: getRecipeData,
    title: title || 'recipes',
  });

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

  if (status === 'pending')
    return (
      <div className="grid gap-6pxr pb-140pxr grid-cols-card justify-center w-full">
        <Skeleton />
      </div>
    );

  if (status === 'error')
    return (
      <div className="grid gap-6pxr pb-140pxr grid-cols-card justify-center w-full">
        <Skeleton />
      </div>
    );

  return (
    <div className="grid gap-6pxr pb-140pxr grid-cols-card justify-center w-full">
      {contents}
      {isFetchingNextPage && <Skeleton />}
    </div>
  );
}

export function CategoryList() {
  const { title } = useParams();

  return (
    <div className="w-full h-full bg-white overflow-auto z-1000">
      <h1 className='text-title-2-em p-3'>{title}</h1>
      <CategoryItems title={title} />
    </div>
  );
}