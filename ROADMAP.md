# Roadmap

Features and improvements planned for future releases of carpat.

## v0.2.0 - Enhanced Validation

- [ ] More comprehensive SIRUTA data (all localities, not just major ones)
- [ ] Fiscal code (CF) validation for sole proprietors
- [ ] Vehicle registration number (număr de înmatriculare) validation
- [ ] Passport number validation
- [ ] Enhanced phone number validation with carrier detection
- [ ] Bank account number (IBAN) generation from account details

## v0.3.0 - Schema Integration

- [ ] Zod schema integration for form validation
- [ ] Yup schema support
- [ ] JSON Schema support
- [ ] Form builder with Romanian validators
- [ ] Schema-driven forms with automatic UI generation

## v0.4.0 - Advanced Address Features

- [ ] Full address autocomplete using SIRUTA
- [ ] Address geocoding integration (optional plugin)
- [ ] Street name normalization and suggestions
- [ ] Building and apartment validation
- [ ] Distance calculation between addresses

## v1.0.0 - ID Document Scanning (Stretch Goal)

- [ ] Client-side OCR for Romanian ID cards
- [ ] MRZ (Machine Readable Zone) parsing
- [ ] Fully local processing (GDPR compliant)
- [ ] Photo capture with device camera
- [ ] Data extraction and validation
- [ ] Face detection for liveness check

## v1.1.0 - Business Forms

- [ ] Invoice line editor component
- [ ] VAT calculation and validation
- [ ] UBL XML export for e-Factura
- [ ] ANAF API integration (optional)
- [ ] Company registry (ONRC) lookup
- [ ] Fiscal attributes validation

## Future Considerations

### Integration

- [ ] Form library adapters (React Hook Form, Formik, VeeValidate)
- [ ] UI framework themes (Tailwind, Bootstrap, Material)
- [ ] Backend validation helpers (Node.js, Deno)
- [ ] OpenAPI schema generation

### Data

- [ ] Real-time bank list updates
- [ ] Postal code database expansion
- [ ] County population statistics
- [ ] Time zone data for localities

### Developer Experience

- [ ] Interactive playground/sandbox
- [ ] VS Code extension for validators
- [ ] Storybook component gallery
- [ ] ESLint plugin for validation rules
- [ ] Test data generators

### Accessibility

- [ ] Screen reader optimizations
- [ ] Keyboard navigation improvements
- [ ] High contrast mode support
- [ ] RTL support (for potential expansion)

### Performance

- [ ] Web Worker support for large datasets
- [ ] Virtual scrolling for locality selector
- [ ] Lazy loading for SIRUTA data
- [ - IndexedDB caching layer

## Contributing

Have an idea for a feature? Open an issue on [GitHub](https://github.com/alex-mosneagu/carpat/issues) to discuss it!

## Prioritization

Features are prioritized based on:

1. **Community demand** - What users need most
2. **Impact** - How much value it adds
3. **Complexity** - Implementation difficulty
4. **Dependencies** - External factors

The roadmap is subject to change based on feedback and priorities.
