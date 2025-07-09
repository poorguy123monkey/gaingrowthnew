# GainGrowth Panel

A modern SMM panel for purchasing YouTube engagement services, powered by Stripe payments.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## 🚀 Features

- **Multiple Services**: Purchase YouTube Subscribers, Likes, and Views
- **Secure Payments**: Integrated with Stripe for secure payment processing
- **Order Tracking**: View your order history and status
- **Responsive Design**: Works on desktop and mobile devices
- **Dark/Light Mode**: Toggle between themes for better visibility
- **Real-time Updates**: Get instant feedback on order status
- **Secure**: Built with security best practices in mind

## 📋 Prerequisites

- Node.js 18.x or later
- npm 9.x or later or yarn
- Vercel account (for deployment)
- Stripe account
- SMMFollows API key

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/gaingrowth-panel.git
   cd gaingrowth-panel
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Update the values with your actual API keys
   ```bash
   cp .env.example .env
   ```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Required
API_KEY=your_smmfollows_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Optional
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🚀 Getting Started

### Development

1. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## 🧪 Testing

Run the test suite:

```bash
npm test
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to a GitHub/GitLab/Bitbucket repository
2. Import the repository to [Vercel](https://vercel.com/import)
3. Add the environment variables in the Vercel project settings
4. Deploy!

### Other Platforms

You can also deploy to other platforms that support Next.js applications, such as:
- Netlify
- Heroku
- AWS Amplify
- DigitalOcean App Platform

## 📦 Built With

- [Next.js](https://nextjs.org/) - The React Framework
- [Stripe](https://stripe.com/) - Payment processing
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React](https://reactjs.org/) - JavaScript library for building user interfaces

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Your Name** - [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- References

## Testing Payments

Use the following test card for Stripe:

- Card number: `4242 4242 4242 4242`
- Any future date
- Any 3-digit CVC
- Any postal code

## License

MIT
