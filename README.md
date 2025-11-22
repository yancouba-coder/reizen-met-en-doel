# Reizen met een doel - Frontend

A production-quality React application for "Reizen met een doel", built with Vite, Tailwind CSS, and an atomic design system.

## Features

- **Atomic Design System**: Components organized into Atoms, Molecules, Organisms, and Templates.
- **Fake Data Seeding**: Realistic data generation using Faker.js (Children, Projects).
- **Mock API**: Simulated REST API with network delay and local storage persistence.
- **Internationalization**: i18n support for English, Dutch (NL), and French (FR).
- **Admin Portal**: Protected admin area for managing children (password: `admin123`).
- **Sponsorship Flow**: Complete flow from waiting list to sponsorship confirmation.

## Tech Stack

- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State/Data**: React Query (@tanstack/react-query)
- **i18n**: react-i18next
- **Testing**: Jest, React Testing Library
- **Documentation**: Storybook

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

1.  Clone the repository.
2.  Install dependencies:

    ```bash
    cd frontend
    npm install
    ```

### Running the App

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Admin Access

- URL: `/admin`
- Password: `admin123`

### Testing

Run unit tests:

```bash
npm test
# or
npx jest --config jest.config.cjs
```

### Storybook

Start Storybook to view components:

```bash
npm run storybook
```

## Project Structure

```
src/
  api/          # Mock API and seeds
  components/   # Atomic design components
    atoms/
    molecules/
    organisms/
    templates/
  hooks/        # Custom React hooks
  i18n/         # Translation files
  pages/        # Page components
  routes/       # Router configuration
  styles/       # Global styles and Tailwind
  utils/        # Helper functions
```

## Notes

- **Hero Image**: The hero image is located in `public/assets/hero-sample.png`. If missing, a fallback image is used.
- **Data Persistence**: Data is stored in `localStorage` (`app_data_v1`). Clear your browser storage to reset data.
