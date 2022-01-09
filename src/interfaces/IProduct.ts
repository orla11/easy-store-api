export interface IProductBase {
	name: string;
	price: number;
	featured: boolean;
	rating: number;
	company: string;
}

export interface IQueryBase {
	page?: number;
}

export interface IProduct extends IProductBase {
	_id: string;
}

export interface IProductInputDTO extends IProductBase {}

export interface IProductQuery extends IQueryBase {
	name?: string;
	price?: number;
	featured?: boolean;
	rating?: number;
	company?: string;
}
