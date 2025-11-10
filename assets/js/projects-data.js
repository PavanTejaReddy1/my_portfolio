/**
 * ============================================
 * PROJECTS DATA CONFIGURATION
 * ============================================
 * 
 * HOW TO ADD A NEW PROJECT:
 * 
 * Simply add a new object to the PROJECTS_DATA array below with the following structure:
 * 
 * {
 *     id: 7,                                    // Unique number (increment from last project)
 *     title: "Project Seven",                   // Project title
 *     subtitle: "Project Category",             // Project category/subtitle
 *     image: "assets/imgs/your-image.png",      // Path to project image
 *     description: "Project description...",    // Brief description of the project
 *     githubUrl: "https://github.com/...",      // GitHub repository URL (optional)
 *     liveUrl: "https://your-demo.com",         // Live demo URL (optional)
 *     featured: true                            // true = shown initially, false = in "Show More"
 * }
 * 
 * TIPS:
 * - Set featured: true for your best/most recent projects
 * - Set featured: false for older or less prominent projects
 * - You can omit githubUrl or liveUrl if not available
 * - Images should be placed in assets/imgs/ folder
 * - The project will automatically appear on the portfolio!
 * 
 * ============================================
 */
const PROJECTS_DATA = [
    {
        id: 1,
        title: "Project One",
        subtitle: "E-Commerce",
        image: "assets/imgs/IMG_3136.PNG",
        description: "E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g, sizes, colors). Each product usually has its own dedicated page with relevant information",
        githubUrl: "https://github.com/PavanTejaReddy1/E-Commerce",
        liveUrl: "https://e-commerce-shooper.netlify.app/",
        featured: true
    },
    {
        id: 2,
        title: "Project Two",
        subtitle: "Weather App",
        image: "assets/imgs/IMG_2129.PNG",
        description: "The application allows users to get information on various cities in real time. With the help of API, we are fetching the weather details of the city which is been searched by the user.",
        githubUrl: "https://github.com/PavanTejaReddy1/React-Weather-App",
        liveUrl: "https://weather-app96.netlify.app/",
        featured: true
    },
    {
        id: 3,
        title: "Project Three",
        subtitle: "Rock Paper Scissors",
        image: "assets/imgs/game.jpg",
        description: "This project is a Rock Paper Scissors Game developed using HTML, CSS, and JavaScript. It is an interactive web-based game where a user plays against the computer, and the winner is decided based on classic Rock, Paper, Scissors rules.",
        githubUrl: "https://github.com/PavanTejaReddy1/rock-paper-scissors-game/tree/master",
        liveUrl: "https://rockpaperscissorgame18.netlify.app/",
        featured: true
    },
    {
        id: 4,
        title: "Project Four",
        subtitle: "TO-DO-LIST",
        image: "assets/imgs/IMG_1496.PNG",
        description: "To-Do List project is an application specially built to keep track of errands or tasks that need to be done. This application will be like a task keeper where the user would be able to enter the tasks that they need to do.",
        githubUrl: "https://github.com/PavanTejaReddy1/OctaNet-_November-/tree/main/Task%202-To-Do-List",
        liveUrl: "https://to-do-list-8.netlify.app/",
        featured: false
    },
    {
        id: 5,
        title: "Project Five",
        subtitle: "Realphone project",
        image: "assets/imgs/project 1.png",
        description: "Realphone Web Application-To provide an efficient,user-friendly,and visually appealing platform for consumers to research,compare,and buy smartphones from multiple vendors.",
        githubUrl: "https://github.com/PavanTejaReddy1/Realphone-Project",
        liveUrl: "https://realphone-project-12345.netlify.app/",
        featured: false
    },
    {
        id: 6,
        title: "Project Six",
        subtitle: "Instagram Landing Page",
        image: "assets/imgs/IMG_1497.PNG",
        description: "This landing page serves as an introduction to Instagram profile, providing visitors with a preview of Instagram content and encouraging them to follow the account",
        githubUrl: "https://github.com/PavanTejaReddy1/OctaNet-_November-/tree/main/Task%201-Landing%20Page",
        liveUrl: "https://insta-landing-page-1.netlify.app/",
        featured: false
    }
];

