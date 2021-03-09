export interface PostProp {
  _id: string;
  title: string;
  excerpt?: string;
  content: string;
  image?: {
    id: string;
    url: string;
  };
  createdAt: string;
  column: string;
}
