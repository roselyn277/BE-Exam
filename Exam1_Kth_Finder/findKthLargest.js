/**
 * Finds the kth largest element in an array using quickselect/divide and conquer
 *
 * @param {number[]} nums - Array of integers (distinct already)
 * @param {number} k - Position of the largest element to find
 * 
 * @returns {number|null} The kth largest element
 * 
 * Time Complexity: O(n) average
 *  - Each recursion uses filter to split the array (O(n))
 *  - On average, the array size is reduced by about half each time
 * 
 * Space Complexity: O(n)
 *  - Left and right arrays are created at each recursion, using extra space
 *  - Total extra space grows linearly with input size
 */

const findKthLargest = (nums, k) => {
    // Return early for invalid/empty array out of range k, 
    if (!nums || nums.length === 0) return null;
    if (k < 1 || k > nums.length) return null;

    // If only 1 item remains on array
    if (nums.length === 1) return nums[0];

    // Initialize our divider, using the 1st element of the unsorted array
    const divider = nums[0];
    
    // Divide the array, left as the group of num larger than the divider and right for the smaller
    const left = nums.filter(n => n > divider);  
    const right = nums.filter(n => n < divider); 

    // Identify if our divider (nums[0]) has duplicate. Important for totaling later
    const dividerCount = nums.length - (left.length + right.length);

    // If position k is within the left side (larger side), then process this side
    if (k <= left.length) {
        return findKthLargest(left, k);
    // Else if position k is within the range of divider, then the divider is the answer.
    } else if (k <= left.length + dividerCount) {
        return divider;
    // Else, position k is on the right side, process right with new value of k. 
    } else {
        return findKthLargest(right, k - left.length - dividerCount);
    }
};

// Note: Removal of duplicates should be called prior to calling this function

module.exports = findKthLargest;
