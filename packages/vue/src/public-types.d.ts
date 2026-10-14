import type { App, ComputedRef, DefineComponent, Ref } from 'vue';
import type { ValidationResult } from '@carpat/core';

type AnyComponent = DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>;

export declare const CNPInput: AnyComponent;
export declare const CUIInput: AnyComponent;
export declare const IBANInput: AnyComponent;
export declare const PhoneInput: AnyComponent;
export declare const IDCardInput: AnyComponent;
export declare const CountySelect: AnyComponent;
export declare const LocalitySelect: AnyComponent;

export declare function useValidation<T extends ValidationResult>(
  validator: (value: string) => T
): {
  value: Ref<string>;
  result: ComputedRef<T>;
  isValid: ComputedRef<boolean>;
  error: ComputedRef<string>;
  isDirty: Ref<boolean>;
  isTouched: Ref<boolean>;
  handleInput: (newValue: string) => void;
  handleBlur: () => void;
  reset: () => void;
};

export declare const CarpatVuePlugin: {
  install(app: App): void;
};

export default CarpatVuePlugin;
