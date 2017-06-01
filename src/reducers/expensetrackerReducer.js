export default function (state = { expenseData : [], categoryData : []},action){
    switch(action.type){
        case "EXPENSE" : {
            return Object.assign({},state,{expenseData : action.expenseData})
        }
        case "CATEGORY" : {
            return Object.assign({},state,{categoryData : action.categoryData})
        }
        default : 
            return state;
    }
}