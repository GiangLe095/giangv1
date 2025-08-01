interface IPagination {
    page: number;
    perPage: number;
    count: number;
    total: number;
    totalPage: number;
}

export interface IPaginatedList<T> {
    items: T[];
    pagination: IPagination;
}