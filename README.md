# Resume Theme

A collection of beautiful resume themes for NxResume.

## Installation

```bash
pnpm add resume-theme
```

## Usage

### Import All Themes

```css
/* Import all themes */
@import 'resume-theme/themes';
```

### Import Specific Theme

```css
/* Import specific theme */
@import 'resume-theme/themes/default';
/* or */
@import 'resume-theme/themes/test';
```

### Use in HTML

Add the `data-resume-theme` attribute to your HTML element to apply a specific theme:

```html
<!-- Use default theme -->
<div data-resume-theme="default">
  <!-- Your resume content -->
</div>

<!-- Use test theme -->
<div data-resume-theme="test">
  <!-- Your resume content -->
</div>
```

## Available Themes

### Default Theme

A clean and professional theme with a modern design.

### Test Theme

A test theme for development and customization.

## Development

```bash
# Install dependencies
pnpm install

# Start development
pnpm dev

# Build
pnpm build

# Run tests
pnpm test
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](./LICENSE) License © 2024 [ryanuo](https://github.com/ryanuo)
