import {
	FormErrors,
	IAppState,
	IContactForm,
	IDeliveryForm,
	IOrder,
	IProduct,
} from '../types';
import { Model } from './base/Model';

export type CatalogChangeEvent = {
	catalog: Product[];
};

export class Product extends Model<IProduct> {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

export class AppState extends Model<IAppState> {
	catalog: Product[];
	basket: Product[] = [];
	order: IOrder = {
		payment: '',
		address: '',
		email: '',
		phone: '',
		items: [],
		total: 0,
	};
	preview: string | null;
	formErrors: FormErrors = {};

	// Очистить корзину
	clearBasket() {
		this.basket = [];
		this.order.items = [];
	}

	// Добавить товар в корзину
	addProduct(item: Product): void {
		this.basket.push(item);
		this.order.items.push(item.id);
		this.emitChanges('basket:change', this.basket);
	}

	// Удалить товар из корзины
	deleteProduct(item: Product): void {
		const index = this.basket.indexOf(item);
		if (index !== -1) {
			this.basket.splice(index, 1);
		}
		this.emitChanges('basket:change', this.basket);
	}

	// Очистить данные заказа
	resetOrder() {
		this.order = {
			payment: '',
			address: '',
			email: '',
			phone: '',
			items: [],
			total: 0,
		};
	}

	// Получить общую стоимость заказа
	getTotal(): number {
		return this.basket.reduce((total, item) => total + item.price, 0);
	}

	// Установить каталог товаров
	setCatalog(items: IProduct[]) {
		this.catalog = items.map((item) => new Product(item, this.events));
		this.emitChanges('items:changed', { catalog: this.catalog });
	}

	// Установить товар для предпросмотра
	setPreview(item: Product) {
		this.preview = item.id;
		this.emitChanges('preview:changed', item);
	}

	//Установить значение в поле заказа
	setOrderField(field: keyof IDeliveryForm, value: string) {
		this.order[field] = value;
		if (this.validateOrder()) {
			this.events.emit('delivery:ready', this.order);
		}
	}

	// Проверить форму доставки
	validateOrder() {
		const errors: typeof this.formErrors = {};
		if (!this.order.payment) {
			errors.payment = 'Выберите способ оплаты';
		}
		if (!this.order.address) {
			errors.address = 'Укажите адрес';
		}
		this.formErrors = errors;
		this.events.emit('deliveryErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}

	// Установить значения полей контактов
	setContactField(field: keyof IContactForm, value: string) {
		this.order[field] = value;
		if (this.validateContacts()) {
			this.events.emit('contacts:ready', this.order);
		}
	}

	// Проверить форму контактов
	validateContacts() {
		const errors: typeof this.formErrors = {};
		if (!this.order.email) {
			errors.email = 'Укажите адрес электронной почты';
		}
		if (!this.order.phone) {
			errors.phone = 'Укажите номер тедефона';
		}
		this.formErrors = errors;
		this.events.emit('contactsErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}
}
