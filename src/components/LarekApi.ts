import { IOrder, IOrderResult, IProduct } from '../types';
import { Api, ApiListResponse } from './base/api';

export interface ILarekApi {
	getProductList: () => Promise<IProduct[]>; // Получение списка товаров
	getProductItem: (id: string) => Promise<IProduct>; // Получение информации о товаре
	orderProduct: (order: IOrder) => Promise<IOrderResult>; // Оформление заказа товаров
}

export class LarekApi extends Api implements ILarekApi {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getProductList(): Promise<IProduct[]> {
		return this.get('/product').then((data: ApiListResponse<IProduct>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

	getProductItem(id: string): Promise<IProduct> {
		return this.get(`/product/${id}`).then((item: IProduct) => ({
			...item,
			image: this.cdn + item.image,
		}));
	}

	orderProduct(order: IOrder): Promise<IOrderResult> {
		return this.post('/order', order).then((data: IOrderResult) => data);
	}
}
