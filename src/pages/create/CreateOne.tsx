// packages
import { useAtom } from 'jotai';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';

// 조드
import { zodResolver } from '@hookform/resolvers/zod';
import { categories, difficult, recipeMainSchema } from './schema';

// 타입
import { RecipeMainFormProps } from '../../types/create';

// 컴포넌트
import { Header, OneButtonModal, TwoButtonModal } from '@/components'; // 글로벌
import { FieldsetInput, TextInput, Selector, FileInput2 } from './components'; // 로컬

// 아톰
import { recipeMainIntroductionAtom } from '@/stores/stores';

export function CreateOne() {
  const navigate = useNavigate();

  // atom
  const [recipeMainIntroduction, setRecipeMainIntroduction] = useAtom(recipeMainIntroductionAtom);

  const { desc, difficulty, image, ingredients, keywords, seasoning, time, title, category } = recipeMainIntroduction;

  // state 상태관리
  const [sizeAlert, setSizeAlert] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // form 제어
  const { register, getValues, control, handleSubmit, formState } = useForm<RecipeMainFormProps>({
    defaultValues: {
      recipeMainImg: image || null,
      recipeTitle: `${title || ''}`,
      recipeDesc: `${desc || ''}`,
      keywords: `${keywords || ''}`,
      time: `${time || ''}`,
      category: `${category || ''}`,
      difficult: `${difficulty || ''}`,
      ingredients: ingredients,
      seasoning: seasoning,
    },

    resolver: zodResolver(recipeMainSchema),
    mode: 'onChange',
  });

  // form 에러
  const { errors } = formState;

  // 이벤트 헨들러
  const handleHeaderClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleConfirm = () => {
    navigate('/main');
  };

  const onSubmit = (data: RecipeMainFormProps) => {
    const submitData: RecipeMainFormProps = {
      title: data.recipeTitle,
      desc: data.recipeDesc,
      image: data.recipeMainImg,
      keywords: data.keywords,
      time: data.time,
      seasoning: data.seasoning,
      ingredients: data.ingredients,
      difficulty: data.difficult,
      category: data.category,
    };

    setRecipeMainIntroduction(submitData);
    navigate('/create/two');
  };

  return (
    <>
      <Helmet>
        <title>HealthyP | 레시피 생성</title>
      </Helmet>
      <Header option="titlewithCloseAndFn" title="레시피 등록하기" handleClick={handleHeaderClick} />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
        <div className="px-14pxr flex flex-col gap-42pxr py-60pxr overflow-y-auto basis-6/7 ">
          <FileInput2 data={image} preview="" id="recipe-main-img" register={register} error={errors.recipeMainImg} />
          <TextInput
            as="input"
            title="레시피 제목"
            placeholder="레시피"
            id="recipe-title"
            maxLength={30}
            error={errors.recipeTitle}
            registerName="recipeTitle"
            register={register}
            required
          />
          <TextInput
            as="textarea"
            title="레시피 설명"
            placeholder="이 레시피를 소개하는 글을 작성해주세요"
            id="recipe-desc"
            maxLength={500}
            error={errors.recipeDesc}
            registerName="recipeDesc"
            register={register}
            required
          />
          <TextInput
            as="input"
            title="키워드"
            placeholder="가족오락관, 울랄라 (쉽표로 구분해서 입력해주세요)"
            id="keywords"
            maxLength={50}
            error={errors.keywords}
            registerName="keywords"
            register={register}
            required
          />
          <TextInput
            type="number"
            as="input"
            title="조리시간"
            placeholder="분"
            id="time"
            maxLength={3}
            error={errors.time}
            registerName="time"
            register={register}
            required
          />
          <Selector title="카테고리" id="category" optionList={categories} register={register} />
          <Selector title="난이도" id="difficult" optionList={difficult} register={register} />
          <FieldsetInput
            title="재료"
            id="ingredients"
            control={control}
            getValues={getValues}
            register={register}
            error={errors.ingredients}
            required
          />
          <FieldsetInput title="양념" id="seasoning" control={control} getValues={getValues} register={register} />
        </div>
        <div className="p-14pxr w-full bg-white basis-1/7 sticky bottom-0">
          <button type="submit" className="bg-primary w-full text-white py-12pxr rounded-[7px]">
            다음
          </button>
        </div>
      </form>
      {/* 이미지 파일 초과 에러 */}
      <OneButtonModal
        isOpen={sizeAlert}
        confirmModal={() => {
          setSizeAlert(false);
        }}
        titleText="파일 크기 초과!"
        firstLineText="5MB 이하 파일을 선택해주세요"
      />
      <TwoButtonModal
        isOpen={isOpen}
        headline="정말 나가시겠습니까?"
        closeModal={handleClose}
        confirmModal={handleConfirm}
        isAnimated={false}
      />
    </>
  );
}
