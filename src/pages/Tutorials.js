"use client"

import { useState, useEffect } from "react"
import "./Tutorials.css"

const Tutorials = () => {
  const [tutorials, setTutorials] = useState([]);
  const [selectedTutorial, setSelectedTutorial] = useState(null);
  const [activeTab, setActiveTab] = useState('html');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchTutorials = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setTutorials(tutorialData);
      } catch (error) {
        console.error('Error fetching tutorials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutorials();
  }, []);

  const tutorialData = {
    html: [
      {
        id: 1,
        title: 'HTML Fundamentals',
        description: 'Learn the basics of HTML structure, elements, and semantic markup',
        difficulty: 'Beginner',
        duration: '30 min',
        progress: 100,
        rating: 4.8,
        topics: ['Elements', 'Attributes', 'Structure', 'Semantic HTML'],
        completed: true,
        content: `
          <h2>HTML Fundamentals</h2>
          <p>HTML (HyperText Markup Language) is the standard markup language for creating web pages.</p>
          
          <h3>Basic Structure</h3>
          <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Page Title&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;My First Heading&lt;/h1&gt;
    &lt;p&gt;My first paragraph.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>

          <h3>HTML Elements</h3>
          <p>HTML elements are defined by tags:</p>
          <ul>
            <li>&lt;h1&gt; to &lt;h6&gt; - Headings</li>
            <li>&lt;p&gt; - Paragraph</li>
            <li>&lt;a&gt; - Link</li>
            <li>&lt;img&gt; - Image</li>
            <li>&lt;div&gt; - Division</li>
            <li>&lt;span&gt; - Inline container</li>
          </ul>
        `
      },
      {
        id: 2,
        title: 'HTML Forms and Input',
        description: 'Master HTML forms, input types, validation, and accessibility',
        difficulty: 'Intermediate',
        duration: '45 min',
        progress: 60,
        rating: 4.7,
        topics: ['Forms', 'Input Types', 'Validation', 'Accessibility'],
        completed: false,
        content: `
          <h2>HTML Forms and Input</h2>
          <p>HTML forms are used to collect user input and send it to a server.</p>
          
          <h3>Basic Form Structure</h3>
          <pre><code>&lt;form action="/submit" method="post"&gt;
    &lt;label for="name"&gt;Name:&lt;/label&gt;
    &lt;input type="text" id="name" name="name" required&gt;
    
    &lt;label for="email"&gt;Email:&lt;/label&gt;
    &lt;input type="email" id="email" name="email" required&gt;
    
    &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/form&gt;</code></pre>

          <h3>Input Types</h3>
          <p>HTML5 introduced many new input types:</p>
          <ul>
            <li>text - Basic text input</li>
            <li>email - Email address</li>
            <li>password - Password field</li>
            <li>number - Numeric input</li>
            <li>date - Date picker</li>
            <li>checkbox - Multiple selections</li>
            <li>radio - Single selection from options</li>
          </ul>
        `
      },
      {
        id: 3,
        title: 'HTML5 Advanced Features',
        description: 'Explore HTML5 APIs, multimedia elements, and modern features',
        difficulty: 'Advanced',
        duration: '60 min',
        progress: 0,
        rating: 4.9,
        topics: ['HTML5 APIs', 'Canvas', 'Audio/Video', 'Local Storage'],
        completed: false,
        content: `
          <h2>HTML5 Advanced Features</h2>
          <p>HTML5 introduced many new features and APIs for modern web development.</p>
          
          <h3>Multimedia Elements</h3>
          <pre><code>&lt;!-- Video Element --&gt;
&lt;video controls width="500"&gt;
    &lt;source src="movie.mp4" type="video/mp4"&gt;
    Your browser does not support the video tag.
&lt;/video&gt;

&lt;!-- Audio Element --&gt;
&lt;audio controls&gt;
    &lt;source src="music.mp3" type="audio/mpeg"&gt;
    Your browser does not support the audio tag.
&lt;/audio&gt;</code></pre>

          <h3>Canvas API</h3>
          <p>The HTML5 Canvas API allows for dynamic, scriptable rendering of 2D shapes and bitmap images.</p>
          <pre><code>&lt;canvas id="myCanvas" width="200" height="100"&gt;&lt;/canvas&gt;

&lt;script&gt;
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "#FF0000";
ctx.fillRect(0, 0, 150, 75);
&lt;/script&gt;</code></pre>
        `
      }
    ],
    css: [
      {
        id: 4,
        title: 'CSS Basics and Selectors',
        description: 'Understanding CSS syntax, selectors, and basic styling properties',
        difficulty: 'Beginner',
        duration: '35 min',
        progress: 80,
        rating: 4.6,
        topics: ['Selectors', 'Properties', 'Box Model', 'Colors'],
        completed: false,
        content: `
          <h2>CSS Basics and Selectors</h2>
          <p>CSS (Cascading Style Sheets) is used to style and layout web pages.</p>
          
          <h3>CSS Syntax</h3>
          <pre><code>selector {
    property: value;
    property: value;
}</code></pre>

          <h3>Common Selectors</h3>
          <ul>
            <li>Element selector: <code>p { color: red; }</code></li>
            <li>Class selector: <code>.my-class { color: blue; }</code></li>
            <li>ID selector: <code>#my-id { color: green; }</code></li>
            <li>Attribute selector: <code>input[type="text"] { border: 1px solid gray; }</code></li>
            <li>Pseudo-class: <code>a:hover { text-decoration: underline; }</code></li>
          </ul>
        `
      },
      {
        id: 5,
        title: 'CSS Flexbox Layout',
        description: 'Master flexible box layout for modern responsive designs',
        difficulty: 'Intermediate',
        duration: '50 min',
        progress: 100,
        rating: 4.9,
        topics: ['Flex Container', 'Flex Items', 'Alignment', 'Responsive'],
        completed: true,
        content: `
          <h2>CSS Flexbox Layout</h2>
          <p>Flexbox is a one-dimensional layout method for arranging items in rows or columns.</p>
          
          <h3>Flex Container Properties</h3>
          <pre><code>.container {
    display: flex;
    flex-direction: row | row-reverse | column | column-reverse;
    flex-wrap: nowrap | wrap | wrap-reverse;
    justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;
    align-items: stretch | flex-start | flex-end | center | baseline;
    align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}</code></pre>

          <h3>Flex Item Properties</h3>
          <pre><code>.item {
    order: 0; /* default is 0 */
    flex-grow: 0; /* default is 0 */
    flex-shrink: 1; /* default is 1 */
    flex-basis: auto; /* default is auto */
    align-self: auto | flex-start | flex-end | center | baseline | stretch;
}</code></pre>
        `
      },
      {
        id: 6,
        title: 'CSS Grid System',
        description: 'Create complex layouts with CSS Grid and advanced techniques',
        difficulty: 'Advanced',
        duration: '65 min',
        progress: 25,
        rating: 4.8,
        topics: ['Grid Container', 'Grid Items', 'Areas', 'Responsive Grid'],
        completed: false,
        content: `
          <h2>CSS Grid System</h2>
          <p>CSS Grid Layout is a two-dimensional layout system for the web.</p>
          
          <h3>Grid Container Properties</h3>
          <pre><code>.container {
    display: grid;
    grid-template-columns: 100px 100px 100px;
    grid-template-rows: 100px 100px;
    grid-gap: 10px;
    grid-template-areas: 
        "header header header"
        "sidebar content content"
        "footer footer footer";
}</code></pre>

          <h3>Grid Item Properties</h3>
          <pre><code>.item {
    grid-column: 1 / 3; /* start at column 1, end at column 3 */
    grid-row: 1 / 2; /* start at row 1, end at row 2 */
    grid-area: header; /* place in the "header" area */
}</code></pre>
        `
      }
    ],
    javascript: [
      {
        id: 7,
        title: 'JavaScript Fundamentals',
        description: 'Learn variables, functions, control structures, and basic concepts',
        difficulty: 'Beginner',
        duration: '40 min',
        progress: 90,
        rating: 4.7,
        topics: ['Variables', 'Functions', 'Loops', 'Conditionals'],
        completed: false,
        content: `
          <h2>JavaScript Fundamentals</h2>
          <p>JavaScript is a programming language that enables interactive web pages.</p>
          
          <h3>Variables and Data Types</h3>
          <pre><code>// Variables
let name = "John"; // String
const age = 30; // Number
let isStudent = true; // Boolean
let hobbies = ["reading", "coding", "gaming"]; // Array
let person = { name: "John", age: 30 }; // Object

// Modern variable declarations
let x = 5; // Block-scoped, can be reassigned
const y = 10; // Block-scoped, cannot be reassigned</code></pre>

          <h3>Functions</h3>
          <pre><code>// Function declaration
function greet(name) {
    return "Hello, " + name + "!";
}

// Arrow function
const greetArrow = (name) => {
    return "Hello, " + name + "!";
};

// Simplified arrow function
const add = (a, b) => a + b;</code></pre>
        `
      },
      {
        id: 8,
        title: 'DOM Manipulation',
        description: 'Interact with HTML elements using JavaScript DOM methods',
        difficulty: 'Intermediate',
        duration: '55 min',
        progress: 100,
        rating: 4.8,
        topics: ['DOM Selection', 'Event Handling', 'Dynamic Content', 'Styling'],
        completed: true,
        content: `
          <h2>DOM Manipulation</h2>
          <p>The Document Object Model (DOM) is a programming interface for HTML documents.</p>
          
          <h3>Selecting Elements</h3>
          <pre><code>// Get element by ID
const element = document.getElementById("myId");

// Get elements by class name
const elements = document.getElementsByClassName("myClass");

// Get elements by tag name
const paragraphs = document.getElementsByTagName("p");

// Query selector (returns first match)
const firstElement = document.querySelector(".myClass");

// Query selector all (returns all matches)
const allElements = document.querySelectorAll(".myClass");</code></pre>

          <h3>Modifying Elements</h3>
          <pre><code>// Change content
element.textContent = "New text content";
element.innerHTML = "<span>HTML content</span>";

// Change attributes
element.setAttribute("href", "https://example.com");
element.id = "newId";
element.className = "newClass";

// Change styles
element.style.color = "red";
element.style.backgroundColor = "black";</code></pre>
        `
      },
      {
        id: 9,
        title: 'Async JavaScript & APIs',
        description: 'Master promises, async/await, and API integration',
        difficulty: 'Advanced',
        duration: '70 min',
        progress: 40,
        rating: 4.9,
        topics: ['Promises', 'Async/Await', 'Fetch API', 'Error Handling'],
        completed: false,
        content: `
          <h2>Async JavaScript & APIs</h2>
          <p>Asynchronous JavaScript allows you to perform operations without blocking the main thread.</p>
          
          <h3>Promises</h3>
          <pre><code>// Creating a promise
const myPromise = new Promise((resolve, reject) => {
    // Asynchronous operation
    setTimeout(() => {
        const success = true;
        if (success) {
            resolve("Operation completed");
        } else {
            reject("Operation failed");
        }
    }, 1000);
});

// Using a promise
myPromise
    .then(result => console.log(result))
    .catch(error => console.error(error));</code></pre>

          <h3>Async/Await</h3>
          <pre><code>// Async function
async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Using the async function
fetchData().then(data => console.log(data));</code></pre>
        `
      }
    ]
  };

  const handleTutorialSelect = (tutorial) => {
    setSelectedTutorial(tutorial);
  };

  const handleMarkAsComplete = (tutorialId) => {
    const category = Object.keys(tutorialData).find(cat => 
      tutorialData[cat].some(tutorial => tutorial.id === tutorialId)
    );
    
    if (category) {
      const updatedTutorials = { ...tutorialData };
      updatedTutorials[category] = updatedTutorials[category].map(tutorial => 
        tutorial.id === tutorialId ? { ...tutorial, completed: true, progress: 100 } : tutorial
      );
      
      setTutorials(updatedTutorials);
      setSelectedTutorial(prev => ({ ...prev, completed: true, progress: 100 }));
