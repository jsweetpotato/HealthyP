import { z } from 'zod';

const 특수문자나_공백만있는거_안됨 = /^(?!^\s+|\s+$)(?![`~!@#$%^&*|\\'";:/?]+$).*$/g;
const 특수문자나_공백만있는거_안됨2 = /(?!^\s+|\s+$)(?![`~!@#$%^&*|\\'";:/?]+$).*/g;

export const categories = ['건강식', '다이어트', '벌크업', '비건'];
export const difficult = ['쉬움', '보통', '어려움'];

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const recipeMainSchema = z.object({
  recipeMainImg: z
    .any()
    .refine((files) => files?.length, '레시피 메인 이미지를 등록해주세요')
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `최대 이미지 사이즈는 5MB, 5MB 이하 파일만 등록 가능해요`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png, .webp 파일만 됩니다. 다른 이미지를 넣어주세요'
    ),
  recipeTitle: z
    .string()
    .min(5, '5글자 이상 30글자 이하로 작성해주세요')
    .max(30, '5글자 이상 30글자 이하로 작성해주세요')
    .regex(특수문자나_공백만있는거_안됨, '레시피 제목을 올바르게 작성해주세요'),
  recipeDesc: z
    .string()
    .min(10, '10글자 이상 500글자 이하로 작성해주세요')
    .max(500, '10글자 이상 500글자 이하로 작성해주세요')
    .regex(특수문자나_공백만있는거_안됨2, '레시피 설명을 올바르게 작성해주세요'),

  ingredients: z.object({ name: z.string(), amount: z.string() }).array().min(1, '최소 1개 이상 재료를 입력해주세요'),
  seasoning: z.object({ name: z.string(), amount: z.string() }).array(),

  category: z.string(),
  difficult: z.string(),
  keywords: z.string().min(1, '키워드를 입력해주세요'),
  time: z.string().min(1, '조리시간을 입력해주세요!'),
});

export const recipeStepSchema = z.object({
  stepImg: z
    .any()
    .refine((files) => files?.length, '레시피 메인 이미지를 등록해주세요')
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `최대 이미지 사이즈는 5MB, 5MB 이하 파일만 등록 가능해요`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png, .webp 파일만 됩니다. 다른 이미지를 넣어주세요'
    ),
  stepDesc: z
    .string()
    .min(5, '5글자 이상 400글자 이하로 작성해주세요')
    .max(400, '5글자 이상 400글자 이하로 작성해주세요')
    .regex(특수문자나_공백만있는거_안됨, '레시피 설명을 올바르게 작성해주세요'),
  stepTip: z
    .string()
    .max(400, '400글자 이하로 작성해주세요')
    .regex(특수문자나_공백만있는거_안됨, '레시피 팁을 올바르게 작성해주세요'),
});
