export class UserEntry {
  public id: string
  public email: string
  public userName: string
  public displayName: string
  public friendsCount: number
  public photoId: number

  constructor(user: UserEntry) {
      this.id = user.id
      this.email = user.email
      this.userName = user.userName
      this.displayName = user.displayName
      this.friendsCount = user.friendsCount
      this.photoId = user.photoId
  }

  public static fromJson(user: any): UserEntry {
    return new UserEntry({
        id: user.id,
        userName: user.userName,
        displayName: user.displayName,
        friendsCount: user.friendsCount,
        email: user.email,
        photoId: user.photoId
    })
  }

  public static serialize(user: UserEntry): any {
      return {
          id: user.id,
          userName: user.userName,
          displayName: user.displayName,
          friendsCount: user.friendsCount,
          email: user.email,
          photoId: user.photoId
      }
  }
}
