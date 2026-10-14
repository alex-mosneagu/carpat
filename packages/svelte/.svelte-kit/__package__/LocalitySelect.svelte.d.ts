import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        value?: string;
        countyCode?: string;
        label?: string;
        placeholder?: string;
        disabled?: boolean;
        required?: boolean;
        requireCounty?: boolean;
        searchable?: boolean;
        showError?: boolean;
        containerClass?: string;
        labelClass?: string;
        inputClass?: string;
        errorClass?: string;
        dropdownClass?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type LocalitySelectProps = typeof __propDef.props;
export type LocalitySelectEvents = typeof __propDef.events;
export type LocalitySelectSlots = typeof __propDef.slots;
export default class LocalitySelect extends SvelteComponent<LocalitySelectProps, LocalitySelectEvents, LocalitySelectSlots> {
}
export {};
//# sourceMappingURL=LocalitySelect.svelte.d.ts.map