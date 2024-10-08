export const calculator = (day: number, month: number, year: number) => {
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth() + 1; // Monate sind 0-basiert, daher +1
	const currentDay = currentDate.getDate();

	let outputYear = currentYear - year;
	let outputMonth = currentMonth - month;
	let outputDay = currentDay - day;

	// Korrigiere die Tage, wenn die Differenz negativ ist
	if (outputDay < 0) {
		outputMonth--;
		const lastMonthDate = new Date(currentYear, currentMonth - 1, 0);
		outputDay += lastMonthDate.getDate();
	}

	// Korrigiere die Monate, wenn die Differenz negativ ist
	if (outputMonth < 0) {
		outputYear--;
		outputMonth += 12;
	}

	return { outputYear, outputMonth, outputDay };
};
