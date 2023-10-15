export interface userResponseType {
  // Два варианта userId так как GET и POST возвращают в разном стиле
  userId: string;
  userID: string;
  username: string;
  books: [
    {
      isbn: string;
      title: string;
      subTitle: string;
      author: string;
      publish_date: Date;
      publisher: string;
      pages: number;
      description: string;
      website: string;
    },
  ];
}

export interface authResponseType {
  token: string;
  expires: Date;
  status: string;
  result: string;
}
