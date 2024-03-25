import { ensureAllElements, ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';

// Интерфейс описания итоговой суммы в случае успешной операции
export interface ISuccess {
	total: number; // Общая сумма
}

export interface ISuccessActions {
	onClick: () => void;
}

export class Success extends Component<ISuccess> {
	protected _close: HTMLElement;
	protected _total: HTMLElement;

	constructor(container: HTMLElement, actions: ISuccessActions) {
		super(container);

		this._total = ensureElement<HTMLElement>(
			'.order-success__description',
			container
		);

		this._close = ensureElement<HTMLElement>(
			'.order-success__close',
			this.container
		);

		if (actions?.onClick) {
			this._close.addEventListener('click', actions.onClick);
		}
	}

	set total(total: number) {
		this.setText(this._total, `${total.toString()} синапсов`);
	}
}
