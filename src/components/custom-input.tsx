import React from 'react';
import {
	FieldError,
	FieldValues,
	Path,
	UseFormRegister,
} from 'react-hook-form';
interface CustomInputProps<T extends FieldValues> {
	name: Path<T>;
	register: UseFormRegister<T>;
	errors: Partial<Record<Path<T>, FieldError>>;
	label: string;
	max: number;
	placeholder: string;
	isSubmitting: boolean;
}

const CustomInput = <T extends FieldValues>({
	name,
	register,
	errors,
	label,
	max,
	placeholder,
	isSubmitting
}: CustomInputProps<T>) => {
	const hasError = !!errors[name];

	return (
		<div className='relative space-y-1 flex flex-col max-sm:flex-1 w-[86px] sm:space-y-2 sm:w-[160px]'>
			<label
				htmlFor={label}
				className={`text-sm uppercase font-bold tracking-[4px] ${
					hasError ? 'text-accent-error' : 'text-foreground-input'
				}`}
			>
				{label}
			</label>
			<input
				{...register(name)}
				type='text'
				id={label}
				pattern='[0-9]*'
				inputMode='numeric'
				onInput={(e) => {
					e.currentTarget.value = e.currentTarget.value.replace(
						/[^0-9]/g,
						''
					);
				}}
				maxLength={max}
				placeholder={placeholder}
				disabled={isSubmitting}
				className={`text-lg font-bold placeholder:text-foreground-input border-2   p-4 rounded-lg sm:p-5 sm:text-[32px] ${
					hasError
						? 'border-accent-error focus-visible:outline-accent-error'
						: 'border-input-border focus-visible:outline-accent-purple'
				}`}
			/>
			{errors[name] && (
				<span className='text-accent-error absolute sm:-bottom-6 -bottom-7 text-xs leading-none italic sm:text-sm'>
					{errors[name]?.message}
				</span>
			)}
		</div>
	);
};

export default CustomInput;
