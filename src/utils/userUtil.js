function serializedUsers (users) {
    return users.map((user) => {
        return {
            userId: user.userId.toString(),
            name: user.name,
            email: user.email,
            age: user.age,
            createDate: user.createDate
        };
    })
}

function serializedUser (user) {
    return {
        userId: user.userId.toString(),
        name: user.name,
        email: user.email,
        age: user.age,
        createDate: user.createDate
    };
}

module.exports = {
    serializedUsers,
    serializedUser
}