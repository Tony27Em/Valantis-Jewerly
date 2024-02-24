export type ItemType = {
  id: string,
  brand: string,
  price: number,
  product: string,
}

export type FormType = {
  loading: boolean;
  searchParams: Record<string, string | number>;
  brandsList: Record<string, string>[];
  getFilteredItems: () => void;
  handleSearchParams: (field: string, value: string) => void;
  resetSearchParams: () => void;
}