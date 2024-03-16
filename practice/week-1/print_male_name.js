let object = [
    {
        userName: "mayank",
        gender: "male"
    },
    {
        userName: "saksham",
        gender: "male"
    },
    {
        userName: "priya",
        gender: "female"
    },
    {
        userName: "aaryan",
        gender: "male"
    },
    {
        userName: "diya",
        gender: "female"
    }
]
for (i = 0; i < object.length; i++) {
    if (object[i]["gender"] == "male") {
        console.log(object[i]["userName"]);
    }
}