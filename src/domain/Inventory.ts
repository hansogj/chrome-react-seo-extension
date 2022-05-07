export interface Inventory {
  pagination: Pagination;
  listings: any[];
}

export interface Pagination {
  page: number;
  pages: number;
  per_page: number;
  items: number;
  urls: Urls;
}

export interface Urls {}
