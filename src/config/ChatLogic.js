export const getSender = (loggedUser,users) => {
    return users[0]._id === loggedUser.id ? users[1].name : users[0].name
}

