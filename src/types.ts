export interface ListStore {
  lists: { [key: string]: ExcerptList };
  selected: string;
}

export interface ExcerptList {
  name: string;
  rounds: number;
  categories: Category[];
  requireUnique: boolean;
}

export interface Category {
  name: string;
  excerpts: string;
  numRequired: number;
}
