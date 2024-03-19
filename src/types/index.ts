// Интерфейс для типов общего стостояния приложения
export interface IAppState {
	catalog: IProduct[]; // Каталог товаров
	basket: string[]; // Товары в корзине
	order: IOrder; // Описание заказа
	preview: string; //  Идентификатор товара для предпросмотра
}

//  Интерфейс для типов структуры данных товара
export interface IProduct {
	id: string; //Уникальный идентификатор товара
	description: string; // Описание товара
	image: string; // URL изображения товара
	title: string; // Название товара
	category: string; // Категория товара
	price: number | null; // Стоимость товара
}

// Интерфейс для типов формы заказа
export interface IDeliveryForm {
	payment: string; // Способ оплаты
	address: string; // Адрес доставки
}

// Интерфейс для типов формы контакта
export interface IContactForm {
	email: string; // Адрес электронной почты
	phone: string; // Номер телефона
}

// Интерфейс данных заказа
export interface IOrder extends IDeliveryForm, IContactForm {
	items: string[]; // Список товаров
}

// Типизация ошибок валидации формы
export type FormErrors = Partial<Record<keyof IOrder, string>>;

//  Интерфейс для результата оформления заказа
export interface IOrderResult {
	id: string; // Идентификатор заказа
	total: number; // Списана сумма
}
