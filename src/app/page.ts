export class Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  last: boolean;
  first: boolean;
  number: number;
  size: number;
}
