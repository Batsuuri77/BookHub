export interface Book {
  state: string;
  favourite: any;
  $id: string;
  title: string;
  author: string;
  thumbNail: string;
  genre: string;
  goal: Date;
  achivement: Date;
  bookType: String;
  addedDate: Date;
  users: String;
}

export interface User {
  $id: string;
  username: string;
  email: string;
  accountID: string;
  avatar: string;
  createdDate: Date;
}

export interface Note {
  $id: string;
  context: string;
  chapter: string;
  page: string;
  createdAt: string;
}

export interface Post {
  $id: string;
  like: BigInteger;
  shareCount: BigInteger;
  commentCount: BigInteger;
  content: string;
  createdDate: Date;
  userId: string;
  bookImage: string;
  userName: string;
  userImage: string;
}

export interface Comment {
  $id: string;
  postId: string;
  postComment: string;
  userName: string;
}
