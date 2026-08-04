# 🌍 LinguaRole AI

LinguaRole AI es una aplicación web desarrollada con **Next.js** que permite practicar idiomas mediante conversaciones simuladas en diferentes escenarios de la vida real utilizando un modelo de inteligencia artificial ejecutado localmente con **Ollama**.

## 📌 Características

- 🌎 Selección de idioma.

  - 🇪🇸 Español
  - 🇺🇸 Inglés
  - 🇫🇷 Francés
  - 🇰🇷 Coreano

- 🎭 Escenarios de conversación:
  - 🍽️ Restaurante
  - ✈️ Aeropuerto
  - 🏨 Hotel
  - 💼 Entrevista laboral
  - 🛍️ Compras

- 📈 Niveles de aprendizaje:
  - Básico
  - Intermedio
  - Avanzado

- 🤖 Conversaciones generadas mediante IA local con Ollama.

- 💬 Chat interactivo.

- ⏳ Indicador de escritura mientras la IA responde.

- ✅ Corrección de errores del estudiante.

- 📚 Enseñanza de nuevo vocabulario durante la conversación.

---

# 🛠️ Tecnologías utilizadas

- Next.js 16
- React
- JavaScript
- Tailwind CSS
- Ollama
- Llama 3.2

---

# 📂 Estructura del proyecto

```
app/
│
├── api/
│   └── chat/
│       └── route.js
│
├── chat/
│   └── page.js
│
├── components/
│   └── Header.jsx
│
├── page.js
│
lib/
│
└── ollama.js
```

---

# 🚀 Instalación

## 1. Clonar el repositorio

```bash
git clone https://github.com/SaritaO8/linguarole-ai.git
```

---

## 2. Entrar al proyecto

```bash
cd linguarole-ai
```

---

## 3. Instalar dependencias

```bash
npm install
```

---

## 4. Instalar Ollama

Descargar desde:

https://ollama.com/download

---

## 5. Descargar el modelo

```bash
ollama pull llama3.2
```

---

## 6. Ejecutar Ollama

```bash
ollama serve
```

---

## 7. Ejecutar la aplicación

```bash
npm run dev
```

---

## 8. Abrir en el navegador

```
http://localhost:3000
```

---

# 🎮 Funcionamiento

1. Seleccionar el idioma.
2. Seleccionar el escenario.
3. Seleccionar el nivel.
4. Presionar **Comenzar conversación**.
5. Practicar el idioma mediante una conversación con un personaje generado por IA.

---

# 📸 Funcionalidades

- Selección dinámica de idioma.
- Conversaciones contextualizadas.
- Personajes según el escenario.
- Historial de conversación.
- Respuestas naturales generadas por IA.
- Corrección de errores.
- Aprendizaje de vocabulario.

---

# 👨‍💻 Autor

**Sara Brigete Carlier Méndez**

Proyecto desarrollado como evidencia académica utilizando Next.js y Ollama.

---

# 📄 Licencia

Este proyecto fue desarrollado con fines educativos.
## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
