# Sentinel Eye - AI-Assisted Threat Detection

This is a Next.js application built with Firebase Studio that provides an AI-assisted end-to-end architecture for detecting persistent threats in enterprise environments.

## Getting Started

To get this project up and running on your local machine, follow the steps below.

### Prerequisites

*   **Node.js**: Make sure you have Node.js version 20 or later installed. You can download it from [nodejs.org](https://nodejs.org/).
*   **npm**: This project uses npm for package management, which is included with Node.js.

### Setup and Installation

1.  **Clone the repository** (if you haven't already).
2.  **Open in VS Code**: Open the project folder in Visual Studio Code.
3.  **Install dependencies**: Open a terminal in VS Code (`Terminal` > `New Terminal`) and run the following command to install all the necessary packages:
    ```bash
    npm install
    ```

### Running the Development Servers

This project requires two separate development servers to be running simultaneously: one for the Next.js frontend and one for the Genkit AI backend.

1.  **Start the Next.js App**: In your first terminal, run:
    ```bash
    npm run dev
    ```
    This will start the main web application, typically available at [http://localhost:9002](http://localhost:9002).

2.  **Start the Genkit AI Flows**: Open a second terminal in VS Code (you can click the `+` icon in the terminal panel) and run:
    ```bash
    npm run genkit:watch
    ```
    This starts the Genkit development server, which runs your AI flows. The `--watch` flag ensures that it automatically restarts when you make changes to your AI flow files.

### Viewing the Application

Once both servers are running without errors, you can open your web browser and navigate to [http://localhost:9002](http://localhost:9002) to see the application in action.
