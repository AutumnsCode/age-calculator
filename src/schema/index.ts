import { z } from 'zod';
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1; // Months are 0-indexed
const currentDay = new Date().getDate();

const getMaxDaysInMonth = (month: number, year: number) => {
	return new Date(year, month, 0).getDate(); // Returns the maximum days in a month
};

export const FormSchema = z
	.object({
		day: z
			.string()
			.trim()
			.min(1, { message: 'This field is required' })
			.refine((val) => !isNaN(Number(val)), {
				message: 'Please enter a valid number',
			})
			.transform((val) => Number(val))
			.refine((num) => num >= 1, { message: 'Must be a valid day' }), // Validate minimum day value
		month: z
			.string()
			.trim()
			.min(1, { message: 'This field is required' })
			.refine((val) => !isNaN(Number(val)), {
				message: 'Please enter a valid number',
			})
			.transform((val) => Number(val))
			.refine((num) => num >= 1 && num <= 12, {
				message: 'Must be a valid month (1-12)',
			}), // Validate month to be 1-12
		year: z
			.string()
			.trim()
			.min(1, { message: 'This field is required' })
			.refine((val) => !isNaN(Number(val)), {
				message: 'Please enter a valid number',
			})
			.transform((val) => Number(val))
			.refine((num) => num <= currentYear, {
				message: 'Year cannot be in the future',
			}),
	})
	.refine(
		({ day, month, year }) => {
			const maxDays = getMaxDaysInMonth(month, year);
			return day <= maxDays; // Ensure day does not exceed maximum days in month
		},
		{ message: 'Must be a valid day', path: ['day'] }
	)
	.refine(
		({ year, month, day }) => {
			if (year === currentYear) {
				// If the year is the current year, check month and day
				if (month === currentMonth && day > currentDay) {
					return false; // Day is in the future
				}
			}
			return true; // All checks passed
		},
		{ message: 'Date cannot be in the future', path: ['day'] }
	)
	.refine(
		({ year, month }) => {
			if (year > currentYear) {
				return false; // If the year is in the future
			}
			if (year === currentYear && month > currentMonth) {
				return false; // If the year is the current year, ensure the month is not in the future
			}
			return true; // All checks passed
		},
		{ message: 'Month cannot be in the future', path: ['month'] }
	);
