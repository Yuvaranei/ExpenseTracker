export function setCategoryData(categoryData){
    return {
        type : "CATEGORY",
        categoryData
    }
}

export function setExpenseData(expenseData){
    return {
        type : "EXPENSE",
        expenseData
    }
}