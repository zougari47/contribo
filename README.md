# Contribo 🚀

Contribo is a beautifully simplified platform built to help developers showcase their open-source contributions.


## 🛠️ Tech Stack

- **React** 19
- **Next.js** 16
- **Tailwind CSS** 4


## 🚀 Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- A GitHub Personal Access Token (Classic or Fine-grained)

### Installation

This project uses **pnpm** as the primary package manager.

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/contribo.git
   cd contribo
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```
   *If you prefer other package managers:*
   ```bash
   npm install  # or yarn install
   ```

3. **Set up Environment Variables**
   Create a `.env` file in the root directory and add your GitHub API Key:
   ```env
   GITHUB_API_KEY=your_github_personal_access_token_here
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📖 Development Guide

- `pnpm dev`: Starts the development server with Turbopack.
- `pnpm build`: Creates an optimized production build.
- `pnpm lint`: Runs the linter to ensure code quality.

