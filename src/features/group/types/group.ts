export interface addGroupReq {
    name: string,
    userId: number
    invitedFriends: []
}

export interface editGroupReq {
    id: string,
    newName: string
}