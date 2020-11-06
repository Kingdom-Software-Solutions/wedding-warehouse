// May need to build a legit backend to communicate with okta
const router = require("express").Router();

router.get("/update_user/:userId", (req, res) => {
    // need to pass userid FROM OKTA to crud user back here and avoid cors on FE
    //okta endpoint to update profile /api/v1/users/${userId}
    // THIS WILL BE BUILT OUT IN STRETCH
})