# Nhung Nguyen Portfolio Website

A modern, responsive portfolio website built with Next.js 14, showcasing expertise in Monitoring & Evaluation and Gender Inclusion consulting.

## 🚀 Features

- **Modern Design**: Clean, professional design with Tailwind CSS
- **Responsive**: Fully responsive across all devices
- **Performance**: Optimized with Next.js 14 features
- **SEO**: Built-in SEO optimization with metadata and sitemap
- **Accessibility**: WCAG compliant design
- **TypeScript**: Full type safety
- **Animations**: Smooth animations and transitions

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: CSS animations with Intersection Observer
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── expertise/         # Expertise page
│   ├── portfolio/         # Portfolio page
│   ├── contact/           # Contact page
│   ├── sitemap.ts         # SEO sitemap
│   └── robots.ts          # SEO robots.txt
├── components/            # Reusable components
│   ├── Navigation.tsx     # Navigation component
│   ├── Footer.tsx         # Footer component
│   ├── MetricsSection.tsx # Metrics with animations
│   └── TestimonialSection.tsx # Testimonial component
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nhung-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🎨 Customization

### Colors
The color scheme can be customized in `tailwind.config.js`:
- Primary: Blue (#2563eb)
- Secondary: Gray tones
- Accent: Blue variations

### Content
Update content in the respective page components:
- `src/app/page.tsx` - Homepage content
- `src/app/expertise/page.tsx` - Expertise content
- `src/app/portfolio/page.tsx` - Portfolio content
- `src/app/contact/page.tsx` - Contact form

### Images
Replace placeholder images with actual photos:
- Professional headshot for hero section
- Client logos
- Project images

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔍 SEO Features

- Meta tags for each page
- Open Graph tags
- Sitemap generation
- Robots.txt
- Semantic HTML structure
- Fast loading times

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms

1. Build the project:
```bash
npm run build
```

2. Deploy the `out` folder to your hosting platform

## 📊 Performance

- Lighthouse score: 95+
- Core Web Vitals optimized
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Minimal bundle size

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Contact

For questions about this portfolio website, contact:
- Email: nhungconsultancy@gmail.com
- LinkedIn: [Nhung Nguyen](https://www.linkedin.com/in/nhungnguyen7979/)

---

Built with ❤️ using Next.js 14