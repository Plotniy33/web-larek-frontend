import { IEvents } from './events';

export const isModel = (obj: unknown): obj is Model<any> => {
	return obj instanceof Model;
};

export class Model<T> {
	constructor(data: Partial<T>, protected events: IEvents) {
		Object.assign(this, data);
	}

	// Сообщить всем что модел поменялась
	emitChanges(event: string, playload?: object) {
		this.events.emit(event, playload ?? {});
	}
}
