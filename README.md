# Domain Name Generator - AI Domain Name Generator

## Overview

Domain Name Generator is a modern web application built with Next.js that generates creative, memorable domain name suggestions using Google's Gemini AI. Perfect for entrepreneurs, startups, or anyone looking for the perfect domain name for their next project.

## Features

- **AI-Powered Suggestions**: Leverages Google Gemini AI to generate unique domain name ideas
- **Customizable Parameters**: Control domain length, required words/characters, and more
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile devices
- **Favorites System**: Save your preferred domain names for later reference
- **Copy to Clipboard**: Easily copy domain names with a single click
- **Form Validation**: Comprehensive input validation for the best results

## Screenshots

<div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
  ![Screenshot_17-3-2025_17721_192 168 0 193](https://github.com/user-attachments/assets/dec94e81-c2ca-4ed6-827d-07655ded49ef)

</div>

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **AI Integration**: Google Gemini AI
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- Google Gemini API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/domain-generator.git
   cd domain-generator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the project root with your Gemini API key:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm run start
```

## Project Structure

```
domain-generator/
├── app/
│   ├── api/
│   │   └── gemini/
│   │       └── route.js       # Gemini API endpoint
│   ├── globals.css            # Global styles
│   ├── layout.js              # Root layout
│   └── page.js                # Home page
├── components/
│   ├── DomainGenerator.js     # Main form component
│   ├── DomainList.js          # Results display component
│   └── Navbar.js              # Navigation component
├── lib/
│   └── validations.js         # Form validation utilities
└── public/
    └── ...                    # Static assets
```

## How to Use

1. Enter keywords that describe your website or business
2. Set your preferred domain length (between 3-12 characters)
3. Optionally specify text that must be included in the domain
4. Choose how many domain suggestions you want
5. Click "Generate Domain Names"
6. Save your favorites or copy them to the clipboard

## Environment Variables

| Variable | Description |
|----------|-------------|
| GEMINI_API_KEY | Your Google Gemini API key (required) |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Google Gemini AI for powering the domain name generation
- Next.js and Tailwind CSS for the fantastic development experience

---
