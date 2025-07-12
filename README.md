# Time Tracker App

A simple, responsive time tracker application built with React and Tailwind CSS. Track how much time has passed since a specific moment in time.

## Features

- **Date and Time Input**: Select any date and time to start tracking from
- **Real-time Updates**: Live counter that updates every second
- **Multiple Time Units**: Displays elapsed time in seconds, minutes, hours, days, and weeks
- **Quick Select Buttons**: Predefined time periods (1 hour, 1 day, 1 week, 1 month ago)
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Modern UI**: Clean, beautiful design with gradient backgrounds and smooth animations

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone or download this project
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Running the App

Start the development server:

```bash
npm run dev
```

The app will open in your browser at `http://localhost:3000`

### Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Usage

1. **Select Start Time**: Use the datetime picker to choose when you want to start tracking from
2. **Quick Select**: Use the quick select buttons for common time periods
3. **View Results**: The app will display the elapsed time in various units
4. **Real-time Updates**: The counter updates automatically every second

## Technology Stack

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for styling
- **PostCSS**: CSS processing
- **Autoprefixer**: Automatic vendor prefixing

## Project Structure

```
timeagain/
├── src/
│   ├── components/
│   │   ├── DateTimeInput.jsx
│   │   └── TimeDisplay.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Customization

The app is built with Tailwind CSS, making it easy to customize:

- Colors: Modify the color classes in the components
- Layout: Adjust the grid and spacing classes
- Typography: Change font sizes and weights using Tailwind classes

## Browser Support

The app works in all modern browsers that support:
- ES6+ JavaScript features
- CSS Grid and Flexbox
- CSS Custom Properties

## License

This project is open source and available under the MIT License. 