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
