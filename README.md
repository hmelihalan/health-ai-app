This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### 1. Initial Setup (Mandatory for Login)
If you just cloned this repository, you must initialize the database and create the mock demo users before logging in:

```bash
# Install dependencies
npm install

# Create local database and seed demo users
npm run setup
```

### 2. Run the Development Server
After setup, run the project locally:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### 3. Demo Credentials
Use these accounts to log in (Password for all: `password123`):
- **Admin**: `admin@healthai.edu`
- **Healthcare Pro**: `dr.smith@med.edu`
- **Engineer**: `dev.jones@tech.edu`

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
