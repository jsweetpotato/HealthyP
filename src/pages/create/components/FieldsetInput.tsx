import { FieldsetInputProps } from '../../../types/create';
import { useFieldArray } from 'react-hook-form';
import { ErrorMessage } from '.';
import { Required } from '@/components';
import { useRef } from 'react';

const inputStyle = 'bg-gray_150 rounded-[7px] px-10pxr py-8pxr placeholder:text-500';

export default function FieldsetInput({
  title,
  id,
  required = false,
  control,
  register,
  getValues,
  error,
}: FieldsetInputProps) {
  const { append, remove, fields } = useFieldArray({
    name: id,
    control,
  });
  const nameInputRef: React.MutableRefObject<HTMLInputElement | null> = useRef(null);
  const amountInputRet: React.MutableRefObject<HTMLInputElement | null> = useRef(null);
  return (
    <div>
      <fieldset className="relative flex gap-8pxr mb-10pxr">
        <legend className="text-body-em mb-10pxr">
          {title}
          {required && <Required />}
        </legend>
        <div className="basis-3/6">
          <label htmlFor={id + '-name'} className="sr-only">
            재료명
          </label>
          <input ref={nameInputRef} id={id + '-name'} type="text" className={`${inputStyle} w-full`} />
        </div>
        <div className="basis-2/6">
          <label htmlFor={id + '-amount'} className="sr-only">
            수량
          </label>
          <input ref={amountInputRet} id={id + '-amount'} type="text" className={`${inputStyle} w-full`} />
        </div>
        <button
          type="button"
          className="whitespace-nowrap px-12pxr bg-gray_150 rounded-[7px] basis-1/6"
          onClick={() => {
            nameInputRef.current?.focus();
            // field에 값 추가
            if (!nameInputRef.current?.value || !amountInputRet.current?.value) return;
            append({ name: nameInputRef.current.value, amount: amountInputRet.current.value });
            // 인풋 초기화
            // trigger("ingredient");
            nameInputRef.current.value = '';
            amountInputRet.current.value = '';
          }}
        >
          추가
        </button>
      </fieldset>
      <div className="relative">
        <ul {...register(id)}>
          {fields.map((field, index) => {
            const ingreName = getValues(`${id}.${index}.name`);
            const ingreAmount = getValues(`${id}.${index}.amount`);
            return (
              <li key={field.id} className="flex text-body items-center px-4pxr border-t border-b">
                <p className="basis-3/6" {...register(`${id}.${index}.name`)}>
                  {ingreName}
                </p>
                <p className="basis-2/6" {...register(`${id}.${index}.amount`)}>
                  {ingreAmount}
                </p>

                <button
                  className="basis-1/6 text-gray_500 border-l border-gray_120 py-8pxr my-4pxr"
                  type="button"
                  onClick={() => remove(index)}
                >
                  삭제
                </button>
              </li>
            );
          })}
        </ul>
        {/* <ErrorMessage>{required && getValues(id)?.length < 1 && '하나이상 있어야한다'}</ErrorMessage> */}
        <ErrorMessage>{error?.message}</ErrorMessage>
      </div>
    </div>
  );
}
