import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        value?: string;
        label?: string;
        placeholder?: string;
        disabled?: boolean;
        required?: boolean;
        showError?: boolean;
        showBankInfo?: boolean;
        autoFormat?: boolean;
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
export type IBANInputProps = typeof __propDef.props;
export type IBANInputEvents = typeof __propDef.events;
export type IBANInputSlots = typeof __propDef.slots;
export default class IBANInput extends SvelteComponent<IBANInputProps, IBANInputEvents, IBANInputSlots> {
}
export {};
//# sourceMappingURL=IBANInput.svelte.d.ts.map