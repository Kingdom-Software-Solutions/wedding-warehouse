export const initialState = {
    isFetching: false,
    isPosting: false,
    readyToMount: false,
    error: "",
    activeUserId: NaN,
    user: {
        username: "",
        email: "",
        isAdmin: false,
        firstName: "",
        lastName: "",
        shipping: {
            line1: "",
            line2: "",
            city: "",
            country: "",
            state: "",
            zip: "",
        },
    },
    // uncomment when ready to take online payments down the line
    // billing: {
    //     line1: "",
    //     line2: "",
    //     city: "",
    //     country: "",
    //     state: "",
    //     zip: "",
    // },
}