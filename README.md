# Rekrypt

Web app to **transform text by applying multiple encoders and hashing algorithms sequentially**. The final result depends on the order in which you select the methods, allowing endless combinations.

🌐 **Live demo:** [rekrypt.vercel.app](https://rekrypt.vercel.app/)

![Rekrypt preview](/frontend/public/rekrypt-imagen.webp)

---

## ✨ Features

- **Method chaining**: the output of each method is the input of the next one.
- **Multiple algorithms**: SHA-1, SHA-224, SHA-256, SHA-384, SHA-512, BLAKE2s, BLAKE2b, MD5, CRC32, Hex, Base64, Binary, UUencode, and Reverse.
- **Customizable order**: add, remove, and reorder methods to change the result.
- **Real-time transformation** with a live preview of the result.

## 🛠️ Tech Stack

**Frontend**

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) as build tool
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Three.js](https://threejs.org/) with [React Three Fiber](https://r3f.docs.pmnd.rs/) and [Drei](https://drei.docs.pmnd.rs/)
- [Framer Motion](https://motion.dev/) for animations
- [Axios](https://axios-http.com/) to consume the API
- Package manager: [pnpm](https://pnpm.io/)

**Backend**

- [FastAPI](https://fastapi.tiangolo.com/) served with [Uvicorn](https://www.uvicorn.org/)
- [python-dotenv](https://github.com/theskumar/python-dotenv) for environment variables

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/MaickolRivera/rekrypt.git
cd rekrypt
```

The project has two independent parts: `backend/` (API) and `frontend/` (UI). You need **two terminals open**, one for each.

### 2. Backend (terminal 1)

```bash
cd backend
python -m venv venv               # Create and activate the virtual environment
.\venv\Scripts\Activate.ps1       # Windows (PowerShell)
# source venv/bin/activate        # macOS / Linux

pip install -r requirements.txt   # Install dependencies
cp .env.example .env              # Set up environment variables
uvicorn api.main:app --reload     # Start the server
```

### 3. Frontend (terminal 2)

```bash
cd frontend
pnpm install              # Install dependencies
cp .env.example .env      # Set up environment variables
pnpm dev                  # Start the development server
```

### Available Scripts (frontend)

```bash
pnpm dev        # Start the dev server
pnpm build      # Type-check and build for production
pnpm preview    # Preview the production build locally
pnpm lint       # Run ESLint
```

## 🔌 API

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/` | Health check |
| `GET` | `/methods` | List the available methods |
| `POST` | `/transform` | Apply the methods to the text in order |

FastAPI also provides interactive documentation at `http://127.0.0.1:8000/docs`.

## 📁 Project Structure

```
rekrypt/
├── backend/
│   └── api/                # FastAPI app, methods, and endpoints
└── frontend/
    ├── public/             # Fonts, images, and static files
    └── src/
        ├── api/            # Axios client
        ├── components/     # UI components
        │   ├── icons/      # SVG icon components
        │   └── methods/    # Methods lists (ACTIVE/AVAILABLE) with drag and drop
        └── sections/       # Main sections
```

## 💜 Contributing

Contributions are welcome! If you'd like to improve Rekrypt or add more encoders or hashing algorithms, feel free to open an issue or submit a pull request.

---

Made with ❤️ by [Maickol Rivera](https://github.com/MaickolRivera)
