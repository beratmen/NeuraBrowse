# NeuraBrowse 🧠

A modern, intelligent web-based application that analyzes your web browsing habits and provides personalized content suggestions based on your interests.

[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue)](https://www.typescriptlang.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-5.13.0-blue)](https://mui.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 🔗 Live Demo

Try it now on Vercel:

- Direct link: https://neura-browse.vercel.app/
- If the link is unavailable, clone and run locally (instructions below).

## ✨ Features

### 🔍 Smart Search Integration
- **Google Search Integration** - Seamlessly search the web directly from the app
- **Automatic Tracking** - Your searches are automatically categorized and tracked
- **Search History** - Keep track of your recent searches with timestamps

### 📊 Intelligent Analytics
- **Real-time Statistics** - View your total searches, unique topics, and daily averages
- **Visual Dashboards** - Beautiful charts showing your browsing patterns
- **Interest Analysis** - Automatic categorization of your interests across 10+ categories
- **Weekly Activity** - Track your search activity throughout the week

### 🎯 Personalization
- **Interest Distribution** - See what topics you search for most
- **Smart Suggestions** - Get personalized content recommendations based on your interests
- **Category-based Learning** - System learns from 10+ categories including Technology, Education, Entertainment, and more

### 🎨 Modern UI/UX
- **Dark/Light Mode** - Toggle between themes for comfortable viewing
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **Material Design** - Clean, modern interface following Material Design principles
- **Smooth Animations** - Polished user experience with smooth transitions

### 🔒 Privacy First
- **Local Storage** - All your data stays on your device
- **No Server Tracking** - Your searches are never sent to any external server
- **Data Control** - Clear all data anytime with a single click

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/beratmen/neurabrowse.git
cd neurabrowse
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open in your default browser at `http://localhost:3000`.

### Build for Production

```bash
npm run build
```

This will create an optimized production build in the `build` folder.

### Available Scripts

In the project directory, you can run:

```bash
# Start development server
npm start

# Create production build
npm run build

# Run tests (if you add tests later)
npm test
```

### Deployment (Vercel)

This project can be deployed seamlessly on Vercel:

1. Push your repo to GitHub
2. Import the repository on Vercel
3. Build command: `npm run build`
4. Output directory: `build`
5. Framework preset: Create React App

Production URL: https://neura-browse.vercel.app/

## 📖 Usage

1. **Search**: Enter your search query in the search box and press Enter or click the Search button
2. **Track**: Your search is automatically tracked and categorized
3. **Analyze**: View your browsing patterns in real-time on the dashboard
4. **Discover**: Get personalized content suggestions based on your interests
5. **Customize**: Toggle between light and dark themes
6. **Reset**: Clear all data anytime using the delete button in the header

## 🏗️ Project Structure

```
neurabrowse/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── AnalysisDashboard.tsx    # Main dashboard with charts
│   │   ├── SearchBox.tsx             # Search input component
│   │   ├── Footer.tsx                # Footer component
│   │   └── DataManagementDialog.tsx  # Export/Import/Clear data dialog
│   ├── types/
│   │   └── index.ts                  # TypeScript interfaces
│   ├── utils/
│   │   ├── storage.ts                # Local storage utilities (persist data)
│   │   ├── analytics.ts              # Analytics and calculations (stats)
│   │   ├── exportImport.ts           # Data export/import helpers
│   │   └── animations.ts             # Small animation utilities
│   ├── App.tsx                       # Main app component
│   ├── index.tsx                     # Entry point
│   └── custom.d.ts                   # Type definitions for CSS/assets
├── package.json
├── tsconfig.json
└── README.md
```

## 🛠️ Technologies Used

- **React 18.2** - UI library
- **TypeScript 4.9** - Type safety
- **Material-UI 5.13** - Component library and design system
- **Chart.js 4.3** - Data visualization
- **React Chart.js 2** - React wrapper for Chart.js
- **Emotion** - CSS-in-JS styling
- **Axios** - HTTP client (ready for future API integrations)

## 📊 Categories

The app automatically categorizes your searches into:

- 🖥️ Technology
- 🎬 Entertainment
- 📰 News
- 📚 Education
- 🛍️ Shopping
- ✈️ Travel
- 💪 Health
- 🍔 Food
- ⚽ Sports
- 💰 Finance
- 📝 General

## 🎨 Features in Detail

### Smart Analytics Engine
- Automatically categorizes searches using keyword matching
- Calculates interest percentages and distributions
- Tracks weekly activity patterns
- Provides statistical insights (total searches, unique topics, daily averages)

### Data Persistence
- Uses browser's localStorage for data persistence
- Maintains search history (last 100 searches)
- Tracks weekly activity
- Preserves theme preferences

### Privacy & Data

- Your data never leaves your browser
- No tracking, no analytics scripts, no backend
- You can export your data as JSON and import it back later
- A single action lets you permanently clear all stored data

### Intelligent Suggestions
- Generates personalized content suggestions based on your top interests
- Offers 5+ suggestions per interest category
- Adapts recommendations as your interests evolve

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Bug Reports & Feature Requests

Please use the [GitHub Issues](https://github.com/beratmen/NeuraBrowse/issues) page to report bugs or request features.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Berat MEN**
- GitHub: [@beratmen](https://github.com/beratmen)

## ❓ FAQ

### Why does the app open Google in a new tab when I search?
This app is designed to track and analyze your searches while letting you use your preferred search engine (Google). Your query is recorded locally and a Google results page opens for convenience.

### Can I sync my data across devices?
Not yet. Currently, data is stored in your browser (localStorage). A future enhancement may add optional cloud sync.

### How do I reset everything?
Open the menu (⋮) in the top-right and choose "Clear All Data".

## 🧰 Troubleshooting

- If the dev server doesn't open automatically, visit http://localhost:3000 manually
- If you see a blank page, clear your browser cache and reload
- If charts don't render, ensure all Chart.js peer dependencies are installed
- For dependency issues, try: `rm -rf node_modules && npm install`

---

## 🙏 Acknowledgments

- Material-UI team for the amazing component library
- Chart.js for the visualization tools
- React community for the excellent documentation

## 🔮 Future Enhancements

- [ ] Export data as JSON/CSV
- [ ] Import/Export settings
- [ ] Browser extension version
- [ ] Cloud sync (optional)
- [ ] Advanced filtering and search
- [ ] Custom categories
- [ ] Time-based analytics
- [ ] Comparison views

---

**Made with ❤️ using React & TypeScript**
