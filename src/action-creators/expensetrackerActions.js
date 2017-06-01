import {store} from '../store'

export function setCategoryData(categoryData){
    store.dispatch({
        type : "CATEGORY",
        categoryData
    }) 
}

export function setExpenseData(expenseData){
    return {
        type : "EXPENSE",
        expenseData
    }
}