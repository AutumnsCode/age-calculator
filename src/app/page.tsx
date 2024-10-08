'use client';

import CustomInput from '@/components/custom-input';
import { CustomOutput } from '@/components/custom-output';
import { calculator } from '@/hooks';
import { FormSchema } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

type FormFields = z.infer<typeof FormSchema>;
const Home = () => {
	const [outputYear, setOutputYear] = useState<number | undefined>(undefined)
	const [outputMonth, setOutputMonth] = useState<number | undefined>(undefined);
	const [outputDay, setOutputDay] = useState<number | undefined>(undefined);
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<FormFields>({
		resolver: zodResolver(FormSchema),
	});

	const onSubmit: SubmitHandler<FormFields> = (data) => {
		const { day, month, year } = data;

		const { outputDay, outputMonth, outputYear } = calculator(day, month, year);
		

		setOutputDay(outputDay);
		setOutputMonth(outputMonth);
		setOutputYear(outputYear);
		reset()
	};

	return (
		<main className='w-[calc(100%-2rem)] mx-auto bg-white rounded-3xl rounded-br-[88px] max-w-[840px] max-sm:mt-[88px] h-full px-6 pt-[50px] pb-11'>
			<h1 className='sr-only'>Age Calculator</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='flex gap-x-4 mb-8 sm:gap-x-6 md:gap-x-8 md:mb-0'>
					<CustomInput<FormFields>
						name='day'
						register={register}
						errors={errors}
						isSubmitting={isSubmitting}
						placeholder='DD'
						label='day'
						max={2}
					/>
					<CustomInput<FormFields>
						name='month'
						register={register}
						errors={errors}
						isSubmitting={isSubmitting}
						placeholder='MM'
						label='month'
						max={2}
					/>
					<CustomInput<FormFields>
						name='year'
						register={register}
						errors={errors}
						placeholder='YYYY'
						label='year'
						max={4}
						isSubmitting={isSubmitting}
					/>
				</div>
				<div className='relative w-full flex justify-center items-center h-16 md:h-[94px] before:absolute before:w-full before:h-0.5 before:bg-background before:top-1/2 before:translate-y-1/2 md:justify-end'>
					<button
						type='submit'
						className='h-16 w-16 bg-accent-purple rounded-full flex items-center justify-center z-30 md:w-[94px] md:h-[94px] focus-visible:outline-none hover:bg-foreground focus:bg-foreground disabled:bg-foreground/50'
						disabled={isSubmitting}
					>
						<div className='max-md:w-[26px] max-md:h-[25px] relative md:w-[45px] md:h-[44px]'>
							<Image src='/icon-arrow.svg' fill alt='icon' />
						</div>
					</button>
				</div>
			</form>
			<div className='mt-10 md:mt-4'>
				<CustomOutput output={outputYear} label='year' />
				<CustomOutput output={outputMonth} label='month' />
				<CustomOutput output={outputDay} label='day' />
			</div>
		</main>
	);
};

export default Home;
