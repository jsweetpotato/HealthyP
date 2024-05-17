import { Header } from '@/components';
import { useParams, Link, Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import healthyFood from '@/assets/icons/healthy_food.png';
import bulk from '@/assets/icons/bulk.png';
import diet from '@/assets/icons/diet.png';
import vegan from '@/assets/icons/vegan.png';
import { useEffect, useState } from 'react';
// import { State } from 'react-beautiful-dnd';

// const Skeleton = () => {
//   return (
//     <>
//       <SkeletonLargeCard />
//       <SkeletonLargeCard />
//     </>
//   );
// };

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


interface CategoryButtonsProps {
  buttonState : string
}

function CategoryButtons({buttonState} : CategoryButtonsProps) {



  return (
    <div className="w-full flex py-10pxr justify-between">
      {categories.map((item) => {
        return (
          <Link
            key={item.label}
            to={`/category/${item.label}`}
            className="h-74pxr w-60pxr flex flex-col items-center gap-4pxr"
          >
            <div className={`size-50pxr flex justify-center items-center rounded-full border ${buttonState == item.label ? 'border-primary border-2' : ''} hover:bg-gray-200`}>
              <img src={item.image} alt={item.label} className="size-32pxr" />
            </div>
            <h2 className="text-foot">{item.label}</h2>
          </Link>
        );
      })}
    </div>
  );
}


// function CategoryItems({ title }: { title: string | undefined }) {
//   async function getRecipeData({ pageParam = 1 }) {
//     const recordsData = await db.collection('recipes').getList(pageParam, 5, {
//       expand: 'rating, profile',
//       filter: `category = "${title}"`,
//       sort: '-created',
//     });

//     return recordsData?.items;
//   }

//   const { data, status, isFetchingNextPage, userData, ref } = useInfinityCard({
//     callbackFn: getRecipeData,
//     title: title || 'recipes',
//   });

//   const contents = data?.pages.map((recipes) =>
//     recipes?.map((recipe, index) => {
//       const url = getPbImage('recipes', recipe.id, recipe.image);
//       if (recipes?.length === index + 1)
//         return (
//           <LargeCard
//             innerRef={ref}
//             key={index}
//             id={recipe.id}
//             userData={userData}
//             rating={recipe.expand?.rating}
//             url={recipe.image && url}
//             desc={recipe.desc}
//             title={recipe.title}
//             profile={recipe.expand?.profile}
//             keywords={recipe.keywords}
//           />
//         );
//       return (
//         <LargeCard
//           key={index}
//           id={recipe.id}
//           userData={userData}
//           rating={recipe.expand?.rating}
//           url={recipe.image && url}
//           desc={recipe.desc}
//           title={recipe.title}
//           profile={recipe.expand?.profile}
//           keywords={recipe.keywords}
//         />
//       );
//     })
//   );

//   if (status === 'pending')
//     return (
//       <div className="grid gap-6pxr pb-140pxr grid-cols-card justify-center w-full">
//         <Skeleton />
//       </div>
//     );

//   if (status === 'error')
//     return (
//       <div className="grid gap-6pxr pb-140pxr grid-cols-card justify-center w-full">
//         <Skeleton />
//       </div>
//     );

//   return (
//     <div className="grid gap-6pxr pb-140pxr grid-cols-card justify-center w-full">
//       {contents}
//       {isFetchingNextPage && <Skeleton />}
//     </div>
//   );
// }

export function CategoryPage() {
  const { title } = useParams();
  const [buttonState, setButtonState] = useState('');

  useEffect(() => {
    if(title === undefined) return;
    setButtonState(title)
  }, [title])

  return (
    <div className="w-full h-full bg-gray-200 overflow-auto relative no-scrollbar">
      <Helmet>
        <title>HealthyP | {title}</title>
      </Helmet>
      <Header option="onlyArrow"/>
      <div className='w-full py-2 bg-white px-5 flex flex-col gap-2'>
        <p className='text-foot text-gray-500'>안녕하세요, 이은원님!</p>
        <p className='text-title-2-em'>집에서도 다양한 <br/>요리를 경험해봐요!</p>
        <input type="text" className='w-full bg-gray-200 py-2 rounded-full'/>
        <CategoryButtons buttonState={buttonState} />
      </div>
      <div className='w-full sticky top-0'>
        <Outlet />
      </div>
    </div>
  );
}
