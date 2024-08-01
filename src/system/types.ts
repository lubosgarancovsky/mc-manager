export type As<Props = any> = React.ElementType<Props>;

export type PropsOf<T extends As> = React.ComponentPropsWithoutRef<T> & {
  as?: As;
};

export type HTMLOnyxUIProps<
  T extends As = 'div',
  OmitKeys extends keyof any = never
> = Omit<
  PropsOf<T>,
  | 'ref'
  | 'color'
  | 'slot'
  | 'size'
  | 'defaultChecked'
  | 'defaultValue'
  | OmitKeys
> & {
  as?: As;
};

export type Merge<M, N> =
  N extends Record<string, unknown> ? M : Omit<M, keyof N> & N;

export interface DOMElement extends Element, HTMLOrSVGElement {}

type DataAttributes = {
  [dataAttr: string]: any;
};

export type DOMAttributes<T = DOMElement> = React.AriaAttributes &
  React.DOMAttributes<T> &
  DataAttributes & {
    id?: string;
    role?: React.AriaRole;
    tabIndex?: number;
    style?: React.CSSProperties;
  };

export type PropGetter<P = Record<string, unknown>, R = DOMAttributes> = (
  props?: Merge<DOMAttributes, P>,
  ref?: React.Ref<any>
) => R & React.RefAttributes<any>;
