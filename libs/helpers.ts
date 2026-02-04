/**
 * Performs a binary search on a sorted array to find the index of the target value.
 * @param arr - A sorted array of elements.
 * @param target - The value to search for.
 * @returns The index of the target value in the array, or -1 if not found.
 */
export const binarySearch = <T>(
    arr: T[],
    target: T,
) => {
    let lower = 0;
    let upper = arr.length - 1;
    while (lower <= upper){
        const mid = Math.floor((lower + upper) / 2);
        const midValue = arr[mid];
        if(midValue === target){
            return mid;
        } else if (midValue < target) {
            lower = mid + 1;
        } else {
            upper = mid - 1;
        }
    }
    return -1;
}