export const GetShiftedDate = function (date: Date, dayShift: number) {
    let result = new Date(date);
    result.setDate(date.getDate() + dayShift);

    return result;
}
export const GetNextDayDate = function (date: Date): Date {
    return this.GetShiftedDate(date, 1);
}
export const GetPrevDayDate = function (date: Date): Date {
    return this.GetShiftedDate(date, -1);
}
export const GetFormattedDate = function (date: string): string {
    return new Date(date).toLocaleDateString() + " " + new Date(date).toLocaleTimeString();
}
export const tryCastStringValueToDate = function(value: string): any {
    let date = new Date(value)
    return date.getMonth && date.getMonth() <= 12 ? date : value;
}