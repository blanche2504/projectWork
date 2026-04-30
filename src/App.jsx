import { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import Tutorial from "./components/Tutorial";
import Tutorials from "./components/Tutorials";

import reactImg from "./assets/react.png";
import nextjsImg from "./assets/nextjs.png";
import angularImg from "./assets/angular.png";
import svelteImg from "./assets/svelte.png";
import FormTutorials from "./components/FormTutorials";
import Comments from "./components/Comments";
import Interview from "./components/Interview";
import Posts from "./components/Posts";

const interv = [
    {
        title: "1. wow",
        allText: "cazzo palle",
        progress: 1,
    },
    {
        title: "2. wow",
        allText: "cazzo palle?",
        progress: 2,
    },
    {
        title: "3. wow",
        allText: "cazzo palle!",
        progress: 3,
    },
];

const tutorials = [
    {
        topic: "React",
        language: "JS/TypeScript",
        title: "First app in React",
        excerpt: "React.js Lorem Ipsum è un testo segnaposto.",
        allText:
            "React.js Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione.",
        readingTime: 15,
        pic: reactImg,
        isDifficult: false,
        website: {
            title: "React site",
            link: "https://react.dev/",
        },
    },
    {
        topic: "Next.js",
        language: "TypeScript",
        title: "A React-based framework!",
        excerpt: "Next.js Lorem Ipsum è un testo segnaposto.",
        allText:
            "Next.js Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione.",
        readingTime: 12,
        pic: nextjsImg,
        isDifficult: true,
        website: {
            title: "Next.js site",
            link: "https://nextjs.org/",
        },
    },
    {
        topic: "Angular",
        language: "TypeScript",
        title: "Angular 18 is out!",
        excerpt: "Angular Lorem Ipsum è un testo segnaposto.",
        allText:
            "Angular Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione.",
        readingTime: 10,
        pic: angularImg,
        isDifficult: false,
        website: {
            title: "Angular site",
            link: "https://angular.dev/",
        },
    },
    {
        topic: "Svelte",
        language: "JS/TypeScript",
        title: "Cybernetically enhanced web apps",
        excerpt: "Svelte Lorem Ipsum è un testo segnaposto.",
        allText:
            "Svelte Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione.",
        readingTime: 14,
        pic: svelteImg,
        isDifficult: false,
        website: {
            title: "Svelte site",
            link: "https://svelte.dev/",
        },
    },
    {
        topic: "React",
        language: "JS/TypeScript",
        title: "First app in React",
        excerpt: "React.js Lorem Ipsum è un testo segnaposto.",
        allText:
            "React.js Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione.",
        readingTime: 15,
        pic: reactImg,
        isDifficult: false,
        website: {
            title: "React site",
            link: "https://react.dev/",
        },
    },
    {
        topic: "Angular",
        language: "TypeScript",
        title: "Angular 18 is out!",
        excerpt: "Angular Lorem Ipsum è un testo segnaposto.",
        allText:
            "Angular Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione.",
        readingTime: 10,
        pic: angularImg,
        isDifficult: false,
        website: {
            title: "Angular site",
            link: "https://angular.dev/",
        },
    },
];

function App() {
    console.log("APP()");

    const [comments, setComments] = useState([]);

    function addComment(comment) {
        //comments.push(comment); //NOOOOOO IN REACT!

        setComments((cs) => [...cs, comment]);
    }

    const [n, setN] = useState(0);

    console.log("n: ", n);

    function increment() {
        // //1.
        // setN(n + 1);
        // setN(n + 1);
        // setN(n + 1);
        // setN(n + 1);

        //2.
        setN((prevN) => prevN + 1);
        setN((prevN) => prevN + 1);
        setN((prevN) => prevN + 1);
        setN((prevN) => prevN + 1);
    }

    return (
        <>
            <Posts />

            <h1>Titolo!</h1>
            {/* <p>VALORE DI N: {n}</p>
        {
            n < 5 ? (
            <p>Minore di 5</p>
            ) : (
            <h5>MAGGIORE DI 5</h5>
            )
        }
        <button onClick={increment}>Incrementa N</button> */}

            {tutorials.length > 0 ? (
                <FormTutorials
                    tutorialsP={tutorials}
                    onAddComment={addComment}
                />
            ) : (
                <p>Non ci sono tutorial disponibili</p>
            )}

            <Comments commentsP={comments} />

            {tutorials.length > 0 ? (
                <Tutorials tutorialsP={tutorials} />
            ) : (
                <p>Non ci sono tutorial disponibili</p>
            )}
            <Interview interview={interv[0]} />
        </>
    );
}

export default App;
