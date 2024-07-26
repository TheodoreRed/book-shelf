export default interface Book {
  id: string;
  title: string;
  subtitle: string;
  authors: string;
  publisher: string;
  publishedDate: Date;
  description: string;
  pageCount: number;
  categories: string;
  averageRating: number;
  ratingsCount: number;
  maturityRating: string;
  smallThumbnail: string;
  thumbnail: string;
}
