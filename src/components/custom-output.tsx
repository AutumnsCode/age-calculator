import React from 'react';
interface CustomOutputProps {
	output: number | undefined;
	label: string;
}

export const CustomOutput = ({ output,label }: CustomOutputProps) => {
	return (
		<p className='font-extrabold text-[56px] md:text-[106px] leading-none'>
			<em>
				<span className='text-accent-purple'>
					{output !== undefined && output !== null ? output : '--'}
				</span>{' '}
				{output !== undefined && output !== null && output > 1 ? `${label}s` : label}
			</em>
		</p>
	);
};
