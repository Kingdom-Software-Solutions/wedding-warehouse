export const initialState = {
    isFetching: false,
    isPosting: false,
    readyToMount: false,
    error: "",
    departments: [],
    singleDept: {
        id: 0,
        name: ""
    },
    items: [],
    singleItem: {
        id: 0,
        itemName: "",
        description: "",
        rentalRate: 0,
        buyNow: 0,
        isAvailable: true,
        designUrl: "",
        thumbnailUrl: ""
    }
}