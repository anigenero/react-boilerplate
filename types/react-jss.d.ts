declare module 'react-jss' {

	import { Properties, PropertiesHyphen } from 'csstype';
	import { GenerateClassName } from 'jss';

	export type CreateStyleSheetOptions<Name extends string = any> = Partial<{
		media: string;
		meta: string;
		link: boolean;
		element: HTMLStyleElement;
		index: number;
		generateClassName: GenerateClassName<Name>;
		classNamePrefix: string;
	}>;

	type Length = string | number;

	export interface IObservable<T> {
		subscribe(observerOrNext: ObserverOrNext<T>): Subscription;
	}

	export interface IObserver<T> {
		next: NextChannel<T>;
	}

	export type Connect<T> = (observer: IObserver<T>) => Disconnect;
	export type Disconnect = () => void;
	export type NextChannel<T> = (value: T) => void;
	export type ObserverOrNext<T> = IObserver<T> | NextChannel<T>;
	export type Unsubscribe = () => void;
	export type Subscription = {
		unsubscribe: Unsubscribe;
	};

	export type ObservableProperties<P> = {
		[K in keyof P]: P[K] | IObservable<P[K]>
	};

	export type CSSProperties =
		& ObservableProperties<Properties<Length>>
		& ObservableProperties<PropertiesHyphen<Length>>;

	export type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
	export type ConsistentWith<T, U> = Pick<U, keyof T & keyof U>;
	export type Overwrite<T, U> = (U extends ConsistentWith<U, T> ? T : Omit<T, keyof U>) & U;

	export type ClassNameMap<ClassKey extends string = string> = Record<ClassKey, string>;

	export interface IWithStylesOptions<ClassKey extends string = string>
		extends CreateStyleSheetOptions<ClassKey> {
		flip?: boolean;
		name?: string;
	}

	export type StyleRules<ClassKey extends string = string> = Record<ClassKey, CSSProperties>;

	export type WithStyles<T extends string = string> = {
		classes: ClassNameMap<T>;
	};

	export interface IStyledComponentProps<ClassKey extends string = string> {
		classes?: Partial<ClassNameMap<ClassKey>>;
		innerRef?: React.Ref<any> | React.RefObject<any>;
	}

	export default function injectSheet<ClassKey extends string>(
		style: StyleRules<ClassKey>,
		options?: IWithStylesOptions<ClassKey>,
	): <P extends ConsistentWith<P, IStyledComponentProps<ClassKey>>>(
		component: React.ComponentType<P & WithStyles<ClassKey>>,
	) => React.ComponentType<Overwrite<P, IStyledComponentProps<ClassKey>>>;
}
