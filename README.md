# InstantVerify.in - Background Verification Platform

A comprehensive background verification platform for the Indian market.

## Features

- Real-time background verification
- Multi-language support (100+ languages)
- JWT Authentication
- Rate limiting
- Unit testing
- Swagger documentation
- Form validations
- Feature flags
- Payment integration (RazorPay)
- Email & Mobile verification
- Comprehensive logging
- Multiple themes
- Code formatting & linting

## Project Structure

```
├── client/           # Frontend React application
├── backend/          # Backend Node.js application
├── postman/          # Postman collections
└── README.md         # Project documentation
```

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- AWS Account (for S3)
- Redis (for rate limiting)

### Frontend Setup

1. Navigate to client directory:
   ```bash
   cd client
   npm install
   npm run dev
   ```

2. Access the application at `http://localhost:5173`

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. Start the server:
   ```bash
   npm run dev
   ```

4. Access API documentation at `http://localhost:3000/api-docs`

## Environment Configurations

The application supports three deployment environments:

- Development (dev)
- Staging
- Production

Each environment has its own configuration files:

- `.env.development`
- `.env.staging`
- `.env.production`

## Testing

Run unit tests:
```bash
npm run test
```

Run e2e tests:
```bash
npm run test:e2e
```

## Deployment

### Frontend Deployment

1. Build the application:
   ```bash
   cd client
   npm run build
   ```

2. Deploy the `dist` folder to your hosting service

### Backend Deployment

1. Build the application:
   ```bash
   cd backend
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## API Documentation

- Development: `http://localhost:3000/api-docs`
- Staging: `https://staging-api.instantverify.in/api-docs`
- Production: `https://api.instantverify.in/api-docs`

## Feature Flags

Feature flags are managed in `config/features.json`. To enable/disable features, modify the corresponding boolean values.

Example:
```json
{
  "socialLogin": {
    "google": true,
    "facebook": true,
    "github": true
  }
}
```

## Translations

The application supports 100+ languages. Default language is English.

To change language:
1. Via URL: Add `?lang=fr` for French
2. Via Settings: Update language preference in user settings

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details