# TeamCheckr

A modern, mobile-first platform to help university students find and review groupmates. Built with Next.js, Tailwind CSS, Prisma, and PostgreSQL.

## Features
- Responsive landing page, signup, login, and forgot password flows
- Modern UI with Tailwind CSS
- User authentication with hashed passwords
- PostgreSQL database via Prisma ORM

## Requirements
- Node.js (v18+ recommended)
- PostgreSQL (running locally or remotely)

## Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd teamcheckr
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   > See `requirements.txt` for a list of main Node.js dependencies (for reference).

3. **Set up your environment variables:**
   - Copy `.env.example` to `.env` and fill in your PostgreSQL connection string:
     ```env
     DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
     ```

4. **Set up the database:**
   ```bash
   npx prisma migrate dev --name init
   ```
   This will create the database tables as defined in `prisma/schema.prisma`.

5. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

## Useful Scripts
- `npx prisma studio` — Open Prisma Studio to view and edit your database in the browser.
- `npx prisma generate` — Regenerate Prisma client after changing the schema.

## Main Dependencies
- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) (for password hashing)

## License
MIT
