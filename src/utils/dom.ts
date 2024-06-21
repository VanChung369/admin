import { document } from './consts';
import { IEventMap, IObject } from './typings';

export function $<K extends keyof HTMLElementTagNameMap>(
  selectors: K,
  multi: true,
): NodeListOf<HTMLElementTagNameMap[K]>;
export function $<K extends keyof SVGElementTagNameMap>(
  selectors: K,
  multi: true,
): NodeListOf<SVGElementTagNameMap[K]>;
export function $<E extends Element = Element>(selectors: string, multi: true): NodeListOf<E>;

export function $<K extends keyof HTMLElementTagNameMap>(
  selectors: K,
  multi?: false,
): HTMLElementTagNameMap[K] | null;
export function $<K extends keyof SVGElementTagNameMap>(
  selectors: K,
  multi?: false,
): SVGElementTagNameMap[K] | null;
export function $<E extends Element = Element>(selectors: string, multi?: false): E | null;

export function $<E extends Element = Element>(
  selectors: string,
  multi?: boolean,
): E | NodeListOf<E> | null {
  if (!document) {
    return multi ? ([] as any) : null;
  }
  return multi ? document.querySelectorAll<E>(selectors) : document.querySelector<E>(selectors);
}

export function hasClass(element: Element, className: string) {
  if (element.classList) {
    return element.classList.contains(className);
  }
  return !!element.className.match(new RegExp(`(\\s|^)${className}(\\s|$)`));
}

export function addClass(element: Element, className: string) {
  if (element.classList) {
    element.classList.add(className);
  } else {
    element.className += ` ${className}`;
  }
}

export function removeClass(element: Element, className: string) {
  if (element.classList) {
    element.classList.remove(className);
  } else {
    const reg = new RegExp(`(\\s|^)${className}(\\s|$)`);

    element.className = element.className.replace(reg, ' ');
  }
}

export function fromCSS(
  elements: Element | Element[] | NodeListOf<Element>,
  properties: string[],
): IObject<any> {
  if (!elements || !properties || !properties.length) {
    return {};
  }
  let element;

  if (elements instanceof Element) {
    element = elements;
  } else if (elements.length) {
    element = elements[0];
  } else {
    return {};
  }
  const cssObject: IObject<any> = {};
  const styles = window.getComputedStyle(element) as any;
  const length = properties.length;

  for (let i = 0; i < length; ++i) {
    cssObject[properties[i]] = styles[properties[i]];
  }
  return cssObject;
}

export function addEvent<K extends keyof IEventMap>(
  el: EventTarget,
  type: K,
  listener: (e: IEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function addEvent(
  el: EventTarget,
  type: string,
  listener: (e: Event) => void,
  options?: boolean | AddEventListenerOptions,
) {
  el.addEventListener(type, listener, options);
}

export function removeEvent<K extends keyof IEventMap>(
  el: EventTarget,
  type: K,
  listener: (e: IEventMap[K]) => void,
  options?: boolean | EventListenerOptions,
): void;

export function removeEvent(
  el: EventTarget,
  type: string,
  listener: (e: Event) => void,
  options?: boolean | EventListenerOptions,
) {
  el.removeEventListener(type, listener, options);
}
