import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { db } from '@/api/pocketbase';
import { recipeSteps, nutrition, step_images, modalError, recipeMainIntroductionAtom } from '@/stores/stores';

import OpenAI from 'openai';
import { RecipeData } from '@/types/create';

interface UseUploadRecipeResult {
  uploadRecipe: () => void;
  // getNutritionData: () => void;
  isLoading: boolean;
}

const promptContent = `You are a Nutritional Information Assistant, specialized in calculating and summarizing the nutritional content of various ingredients. A chef is looking to understand the total nutritional content of a particular dish made with specific ingredients in certain amounts. Here is how you will provide the nutritional information. Review the provided list of ingredients and their respective amounts. For instance, if given [{"name":"감자","amount":"3개"},{"name":"간장", "amount":"2스푼"},{"name":"물", "amount":"2컵"},{"name":"가지", "amount":"100g"}, {"name":"굴소스", "amount":"10ml"}], understand each ingredient's contribution. For each ingredient, calculate its nutritional content based on the specified amount. Consider standard nutritional values for calories, carbs, protein, fat, dietary fiber and sodium. Add up the nutritional values from all the ingredients to get the total nutritional content of the dish. Present the total nutritional content strictly in the JSON format as follows: {"총 칼로리":"total calories of all the ingredients", "탄수화물":"total carbohydrates of all the ingredients", "단백질":"total protein of all the ingredients", "지방":"total fat of all the ingredients", "식이섬유":"total dietary fiber of all the ingredients", "나트륨":"total sodium of all the ingredients"}. Now, go ahead and proceed with your tasks to help me understand the nutritional content of my dish. All of the ingredient data given will be in the Korean Language but the key value for the JSON formats should be in English. Take a deep breath and let's work this out in a step by step way to be sure we have the right answer. Make sure to exclude any whitespaces and line breaks`;
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function useUploadRecipe(): UseUploadRecipeResult {
  // 레시피 메인 소개 아톰
  const { title, desc, difficulty, image, ingredients, keywords, seasoning, time, category } =
    useAtomValue(recipeMainIntroductionAtom);

  // 레시피 스탭 아톰
  const steps = useAtomValue(recipeSteps);
  const stepImages = useAtomValue(step_images);

  // 영양정보 아톰
  const [nutritionData, setNutritionData] = useAtom(nutrition);

  const [isLoading, setIsLoading] = useState(false);
  const [, setError] = useState<string | null>(null);

  const [userId, setUserId] = useState('');
  const [, setIsError] = useAtom(modalError);

  useEffect(() => {
    const getPocketbaseAuthRaw = localStorage.getItem('pocketbase_auth');
    if (getPocketbaseAuthRaw) {
      const pocketbaseAuth = JSON.parse(getPocketbaseAuthRaw);
      const authUserId = pocketbaseAuth.model.id;
      setUserId(authUserId);
    }
  }, []);

  useEffect(() => {
    async function getNutritionData() {
      const completion = await openai.chat.completions.create({
        n: 1,
        messages: [
          {
            role: 'system',
            content: `${promptContent}`,
          },
          {
            role: 'user',
            content: `${ingredients}, ${seasoning} give me the nutritional information for these ingredients in a JSON format without any whitespaces. The key values should be in Korean. Make sure to add the unit for each data.`,
          },
        ],
        model: 'gpt-3.5-turbo-0125',
        response_format: { type: 'json_object' },
      });
      const result = completion.choices[0].message.content;
      setNutritionData(result);
    }
    getNutritionData();
  }, []);

  async function uploadStepImages(recipeId: string) {
    const stepImagesData = {
      recipe: recipeId,
      images: stepImages,
    };
    await db.collection('step_images').create(stepImagesData);
  }

  async function uploadRecipe() {
    if (image === null) return;
    try {
      await Promise.all([
        new Promise((resolve) => setTimeout(resolve, 3000)),
        (async () => {
          const data: RecipeData = {
            title,
            desc,
            category,
            keywords,
            time,
            difficulty,
            ingredients: JSON.stringify(ingredients),
            seasoning: JSON.stringify(seasoning),
            steps: steps,
            views: 0,
            image: image[0],
            nutrition: nutritionData,
            rating: [],
            profile: userId,
          };
          const record = await db.collection('recipes').create(data);
          setIsLoading(true);
          uploadStepImages(record.id);
          return record;
        })(),
      ]);

      setIsLoading(false);

      setError(null);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);

      throw error;
    }
  }

  return { uploadRecipe, isLoading };
}
