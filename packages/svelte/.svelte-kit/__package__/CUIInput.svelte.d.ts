import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        value?: string;
        label?: string;
        placeholder?: string;
        disabled?: boolean;
        required?: boolean;
        showError?: boolean;
        includePrefix?: boolean;
        containerClass?: string;
        labelClass?: string;
        inputClass?: string;
        errorClass?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type CUIInputProps = typeof __propDef.props;
export type CUIInputEvents = typeof __propDef.events;
export type CUIInputSlots = typeof __propDef.slots;
export default class CUIInput extends SvelteComponent<CUIInputProps, CUIInputEvents, CUIInputSlots> {
}
export {};
//# sourceMappingURL=CUIInput.svelte.d.ts.map