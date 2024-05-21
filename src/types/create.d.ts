export interface TextInputProps extends HTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  id: string;
  as: 'input' | 'textarea';
  type?: string;
  title: string;
  error?: FieldErrors<z.infer<unknown>>;
  height?: number;
  required?: boolean;
  maxLength: number | undefined;
  placeholder: string;
  registerName: string;
  register: UseFormRegister<RecipeMainFormProps>;
}

export interface FieldsetInputProps {
  title: string;
  id: 'ingredients' | 'seasoning';
  required?: boolean;
  control: Control<RecipeMainFormProps>;
  register: UseFormRegister<RecipeMainFormProps>;
  getValues: UseFormGetValues<RecipeMainFormProps>;
  error?: FieldErrors<z.infer<unknown>>;
}

export interface SelectorProps {
  title: string;
  id: 'difficult' | 'category';
  optionList: string[];
  register: UseFormRegister<RecipeMainFormProps>;
}

export interface FileInputProps extends HTMLAttributes<HTMLInputElement> {
  id: string;
  error?: FieldErrors<z.infer<unknown>>;
  register: UseFormRegister<RecipeMainFormProps>;
  data?: FileList | null;
  preview?: string;
  handleInput?: ChangeEventHandler<HTMLInputElement> | undefined;
}

export type FieldError = {
  type: string;
  message?: string;
};

export type RecipeMainFormProps = z.infer<typeof recipeMainSchema>;

export type RecipeStepFormProps = z.infer<typeof recipeStepSchema>;

export interface recipeMainIntroductionProps {
  image: FileList | null;
  title: string;
  desc: string;
  keywords: string;
  time: number;
  category?: string;
  difficulty: string;
  ingredients: { name: string; amount: string }[];
  seasoning: { name: string; amount: string }[];
}

export interface RecipeData extends recipeMainIntroductionProps {
  seasoning: string;
  ingredients: string;
  image: File | null;
  steps: string;
  views: number;
  nutrition: string | null;
  rating: string[];
  profile: string;
}
