# Disha Marg: AI-Powered Career & Education Advisor

Welcome to Disha Marg, a comprehensive platform designed to guide students in making informed decisions about their academic and career paths. This application leverages AI to provide personalized recommendations and offers a wealth of resources to help students explore their options.

This project was built with [Firebase Studio](https://studio.firebase.google.com).

 <!-- It's a good idea to add a real screenshot here -->

## ✨ Features

*   **Aptitude & Interest Assessment**: A quick quiz to help students understand their inherent strengths and interests, providing initial guidance on suitable academic streams (e.g., Arts, Science, Commerce).
*   **Personalized AI Recommendations**: By inputting their profile and assessment results, students receive tailored suggestions for:
    *   Courses and degree programs
    *   Nearby government colleges
    *   Potential career paths
    *   Relevant study materials and scholarships
*   **Comprehensive College Directory**: A searchable database of local colleges, filterable by name, location, and offered programs. Each listing includes details on eligibility, facilities, and contact information.
*   **Course-to-Career Mapping**: An interactive guide that visualizes the various career opportunities and higher education options available after completing different degree courses.
*   **Important Dates Timeline**: A timeline that keeps students informed about crucial academic deadlines for admissions, exams, and scholarships.
*   **Resource Hub**: A curated collection of links to valuable study materials (like NCERT textbooks and NPTEL courses) and national/state scholarship portals.
*   **Modern, Responsive UI**: A clean, intuitive interface with both light and dark modes, built with modern design principles.

## 🚀 Tech Stack

*   **Framework**: [Next.js](https://nextjs.org/) (App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
*   **AI/Generative AI**: [Genkit (Google)](https://firebase.google.com/docs/genkit) with Gemini Models
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

## ⚙️ Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   [Node.js](https://nodejs.org/en/) (v20 or later recommended)
*   [npm](https://www.npmjs.com/) or a compatible package manager

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/Ultron09/student_sih.git
    cd student_sih
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of your project and add your Google AI API key. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).
    ```env
    GEMINI_API_KEY=your_api_key_here
    ```

4.  **Run the development server:**
    The application requires two processes to run concurrently: the Next.js frontend and the Genkit AI flows.

    *   **In your first terminal, run the Next.js app:**
        ```sh
        npm run dev
        ```
        This will start the web server on `http://localhost:9002`.

    *   **In a second terminal, run the Genkit flows in development mode:**
        ```sh
        npm run genkit:dev
        ```
        This starts the Genkit development server, allowing your Next.js app to communicate with the AI flows.

Now, you can open [http://localhost:9002](http://localhost:9002) in your browser to see the application.

### Building for Production

To create a production-ready build, run:
```sh
npm run build
```

To start the production server, run:
```sh
npm start
```

## 📂 Project Structure

```
.
├── src
│   ├── app         # Next.js App Router pages and layouts
│   ├── ai          # Genkit AI flows, tools, and configuration
│   ├── components  # Reusable React components (UI & common)
│   ├── data        # Static data files (colleges, career paths)
│   ├── hooks       # Custom React hooks
│   └── lib         # Utility functions
├── tailwind.config.ts # Tailwind CSS configuration
└── next.config.mjs    # Next.js configuration
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Ultron09/student_sih/issues).
```