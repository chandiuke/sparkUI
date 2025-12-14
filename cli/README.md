# SparkUI CLI

CLI for adding SparkUI components to your React/Next.js project.

## Installation

```bash
npm install -g sparkui
# or
npx sparkui
```

## Usage

### Initialize SparkUI

Set up SparkUI in your project (creates CSS variables, installs dependencies):

```bash
npx sparkui init
```

### Add Components

Add individual components to your project:

```bash
npx sparkui add button
npx sparkui add accordion
npx sparkui add chip
```

### Available Components

- `button` - Versatile button with variants, colors, sizes
- `accordion` - Collapsible content sections
- `chip` - Tags, labels, status indicators
- `input` - Text input with validation
- `kbd` - Keyboard key indicator

## Options

```bash
npx sparkui add button --overwrite  # Overwrite existing files
npx sparkui add button -y           # Skip confirmation prompts
```

## Development

```bash
cd cli
npm install
npm run build
npm link  # Makes 'sparkui' available globally for testing
```

## Publishing

1. Update version in `package.json`
2. Build: `npm run build`
3. Publish: `npm publish`
