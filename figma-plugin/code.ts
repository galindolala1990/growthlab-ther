{
  "scripts": {
    "build": "npm run build:ui && npm run build:code",
    "build:ui": "vite build",
    "build:code": "tsc code.ts --outDir dist --skipLibCheck",
    "dev": "vite"
  }
}