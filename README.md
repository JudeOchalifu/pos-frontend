# POS Frontend Application

A modern Angular-based Point of Sale (POS) frontend application with Material Design components.

## Features

- 🔐 **Authentication System** - Secure login/logout with JWT tokens
- 📊 **Dashboard** - Real-time sales and analytics dashboard
- 💰 **Sales Management** - Comprehensive sales tracking and reporting
- 📈 **Reports** - Earning reports, stock reports, and profit analysis
- 🎨 **Modern UI** - Material Design components with responsive layout
- 🔒 **Route Guards** - Protected routes with authentication checks
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile devices

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Angular CLI (v19 or higher)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pos-frontend-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   - Update `src/environments/environment.ts` with your development API URL
   - Update `src/environments/environment.prod.ts` with your production API URL

4. **Start development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:4200`

## Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/materialm/` directory.

## Project Structure

```
src/
├── app/
│   ├── components/          # Reusable UI components
│   ├── layouts/            # Layout components (header, sidebar)
│   ├── pages/              # Page components
│   ├── services/           # Business logic and API services
│   ├── interface/          # TypeScript interfaces
│   └── pipe/               # Custom pipes
├── assets/                 # Static assets (images, styles)
└── environments/           # Environment configurations
```

## Key Components

### Authentication
- **Login Guard** - Protects routes requiring authentication
- **Auth Interceptor** - Automatically adds JWT tokens to requests
- **Error Interceptor** - Handles authentication errors and displays user-friendly messages

### Services
- **AuthenticationService** - Handles login, logout, and user management
- **SalesService** - Manages sales data and reporting
- **LoadingService** - Global loading state management

### Features
- **Toastr Notifications** - User-friendly success/error messages
- **Global Loading** - Loading indicators for better UX
- **Environment Configuration** - Separate configs for dev/prod
- **Type Safety** - Comprehensive TypeScript interfaces

## API Integration

The application expects a REST API with the following endpoints:

- `POST /login` - User authentication
- `GET /api/v1/sales` - Sales data (paginated)
- `GET /api/v1/appuser/find/all` - User management
- `PATCH /api/v1/appuser/reset-password` - Password reset

## Environment Configuration

### Development (`environment.ts`)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  // ... other config
};
```

### Production (`environment.prod.ts`)
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-production-api.com',
  // ... other config
};
```

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure your backend API allows requests from `http://localhost:4200`
   - Check that your API URL is correctly configured in environment files

2. **Authentication Issues**
   - Verify that your backend returns the expected JWT token format
   - Check browser console for authentication errors

3. **Build Errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Update Angular CLI: `npm install -g @angular/cli@latest`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit your changes: `git commit -m 'Add feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please contact the development team or create an issue in the repository.
