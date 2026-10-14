import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        value?: string;
        label?: string;
        placeholder?: string;
        disabled?: boolean;
        required?: boolean;
        showInfo?: boolean;
        showError?: boolean;
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
export type CNPInputProps = typeof __propDef.props;
export type CNPInputEvents = typeof __propDef.events;
export type CNPInputSlots = typeof __propDef.slots;
export default class CNPInput extends SvelteComponent<CNPInputProps, CNPInputEvents, CNPInputSlots> {
}
export {};
//# sourceMappingURL=CNPInput.svelte.d.ts.map