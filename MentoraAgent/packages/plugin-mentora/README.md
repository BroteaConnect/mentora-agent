# @elizaos/plugin-mentora

A plugin for Eliza that provides integration with the Mentora platform, allowing users to interact with mentor profiles and information.

## Features

- Fetch mentor profiles with detailed information
- View mentor skills and expertise
- Check mentor availability schedules
- Access talent passport scores
- Secure wallet integration

## Installation

```bash
npm install @elizaos/plugin-mentora
# or
yarn add @elizaos/plugin-mentora
# or
pnpm add @elizaos/plugin-mentora
```

## Configuration

The plugin requires the following environment variable:

```env
MENTORA_API_URL=https://your-mentora-api-url
```

## Usage

1. Import and register the plugin in your Eliza configuration:

```typescript
import mentoraPlugin from '@elizaos/plugin-mentora';

// Register the plugin
eliza.use(mentoraPlugin);
```

2. Use the plugin through natural language queries:

```typescript
// Example queries
"Show me available mentors"
"Who can mentor me?"
"List all mentors"
"Get mentor information"
```

## Response Format

The plugin returns mentor information in a structured format:

```typescript
interface Mentor {
    id: string;
    wallet: string;
    skills: string[];
    schedule: string[];
    name: string;
    talentPassportScore: number;
}
```

Example response:
```json
{
    "success": true,
    "data": [
        {
            "id": "1",
            "wallet": "0x1234567890abcdef",
            "skills": ["Solidity", "Smart Contracts", "DeFi"],
            "schedule": ["Mon 9-17", "Wed 9-17", "Fri 9-17"],
            "name": "Alex Thompson",
            "talentPassportScore": 95
        }
    ]
}
```

## Error Handling

The plugin includes comprehensive error handling:

- Configuration validation
- API connection errors
- Data validation
- Friendly error messages

## Development

```bash
# Install dependencies
pnpm install

# Build the plugin
pnpm build

# Run tests
pnpm test

# Development mode
pnpm dev
```

## License

MIT

## Contributing

Contributions are welcome! Please read our contributing guidelines for details.
