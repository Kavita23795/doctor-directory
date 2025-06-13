# Doctor Directory Web Application

A web application to search and filter doctors based on specialization, oncology, city, and hospital. Built using **Next.js**, **TypeScript**, **Prisma**, and **PostgreSQL**.

## 🚀 Features

- Filter doctors by specialization, oncology, and city
- Many-to-many relationship between doctors and hospitals
- Pagination support
- Environment variables support
- Fully responsive UI

## 🧰 Tech Stack

- **Frontend**: Next.js, TypeScript
- **Backend**: Node.js, Prisma ORM
- **Database**: PostgreSQL
- **Styling**: Tailwind CSS

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v18+)
- PostgreSQL installed and running

### 1. Clone the Repository

```bash
git clone https://github.com/kavita23795/doctor-directory.git
cd doctor-directory


### 2. Install dependencies:

```bash
npm install
Create your environment file:

### 3. Change Database name and password

```bash
cp .env.example .env

### 4. Set up the database:

```bash
npx prisma migrate dev --name init
npx prisma db seed  

### 5. Start the development server:

```bash
npm run dev

