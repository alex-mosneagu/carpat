import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        value?: string;
        label?: string;
        placeholder?: string;
        disabled?: boolean;
        required?: boolean;
        showError?: boolean;
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
export type CountySelectProps = typeof __propDef.props;
export type CountySelectEvents = typeof __propDef.events;
export type CountySelectSlots = typeof __propDef.slots;
export default class CountySelect extends SvelteComponent<CountySelectProps, CountySelectEvents, CountySelectSlots> {
}
export {};
//# sourceMappingURL=CountySelect.svelte.d.ts.map