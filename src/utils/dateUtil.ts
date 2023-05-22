
export const futureDate = (days: number) => {
    const currentDate = new Date()
    const futureDateTimestamp = currentDate.setDate(currentDate.getDate() + days);
    const date = new Date(futureDateTimestamp);
    console.log(date.toLocaleString('sv'));
    return date;
}