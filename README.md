<h1 style="font-size: 40px;">ZMS - Zoo Management System </h1>

An open-source project for managing zoo operations, including animals, staff, and visitors.  
This repository contains both **frontend** (React/Next.js) and **backend** (Node.js/Express + MongoDB) code in the file structure.  

---

## Project Structure  

zms/
│── frontend/   # React/Next.js code for client-side
│── backend/    # Express.js + MongoDB API server
│── .env.example
│── README.md

---

## Running Locally  

> [!Note]
> This project uses [npm](https://www.npmjs.com/) as a package manager.  

### 1. Clone the repository  

```bash
git clone https://github.com/rituraj-abes/zms.git
cd zms
```

### 2. Backend Setup  

1. Navigate to backend folder:  

```bash
cd backend
```

2. Install dependencies:  

```bash
npm install
```

3. Copy environment variables from example file:  

- Update DB connection URLs and secrets inside `.env`.

4. Start backend server:  

```bash
npm run dev
```

Backend usually runs on `http://localhost:4000` (check `.env` for actual port).  

---

### 3. Frontend Setup  

1. Open a new terminal and move to frontend folder:  

```bash
cd frontend
```

2. Install dependencies:  

```bash
npm install
```

3. Start development server:  

```bash
npm run dev
```

Frontend runs on `http://localhost:3000`.  


## Usage  

- Visit `http://localhost:3000` in your browser.
- Use these credentials to log in:

- Email: `admin@gmail.com`, Password: `admin123`

- Email: `user@gmail.com`, Password: `user123`

## 🤝 Contributing  

We welcome contributions from the community!  

1. Fork this repository  
2. Clone your fork  

```bash
git clone https://github.com/<your-username>/zms.git
```

3. Create a feature branch  

```bash
git checkout -b feature/my-feature
```

4. Commit and push your changes  

```bash
git commit -m "Add my feature"
git push origin feature/my-feature
```

5. Go to main repo and Open a Pull Request on the main repo  

---

## Contributors  

<a href="https://github.com/rituraj-abes/zms/graphs/contributors">
<img src="https://contrib.rocks/image?repo=rituraj-abes/zms&max=200&columns=15" />
</a>

---

Built with ❤️ by the **ZMS Team** and contributors  
