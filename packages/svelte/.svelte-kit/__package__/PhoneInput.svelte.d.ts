import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        value?: string;
        label?: string;
        placeholder?: string;
        disabled?: boolean;
        required?: boolean;
        showError?: boolean;
        showType?: boolean;
        autoFormat?: boolean;
        includeCountryCode?: boolean;
        containerClass?: string;
        labelClass?: string;
        inputClass?: string;
        errorClass?: string;
        infoClass?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type PhoneInputProps = typeof __propDef.props;
export type PhoneInputEvents = typeof __propDef.events;
export type PhoneInputSlots = typeof __propDef.slots;
export default class PhoneInput extends SvelteComponent<PhoneInputProps, PhoneInputEvents, PhoneInputSlots> {
}
export {};
//# sourceMappingURL=PhoneInput.svelte.d.ts.map