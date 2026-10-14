import type { App } from 'vue';
import CNPInput from './components/CNPInput.vue';
import CUIInput from './components/CUIInput.vue';
import IBANInput from './components/IBANInput.vue';
import PhoneInput from './components/PhoneInput.vue';
import IDCardInput from './components/IDCardInput.vue';
import CountySelect from './components/CountySelect.vue';
import LocalitySelect from './components/LocalitySelect.vue';

export {
  CNPInput,
  CUIInput,
  IBANInput,
  PhoneInput,
  IDCardInput,
  CountySelect,
  LocalitySelect,
};

export { useValidation } from './composables/useValidation.js';

export const CarpatVuePlugin = {
  install(app: App) {
    app.component('CNPInput', CNPInput);
    app.component('CUIInput', CUIInput);
    app.component('IBANInput', IBANInput);
    app.component('PhoneInput', PhoneInput);
    app.component('IDCardInput', IDCardInput);
    app.component('CountySelect', CountySelect);
    app.component('LocalitySelect', LocalitySelect);
  },
};

export default CarpatVuePlugin;
