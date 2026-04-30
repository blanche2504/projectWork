import { useState, useEffect } from "react";

function Posts() {
    useEffect(() => {
        const controller = new AbortController();
        async function fetchPosts() {
            try {
                const response = await axios.get("https://dummyjson.com/posts");
                console.log(response.data);
            } catch (e) {}
        }
    }, []);
}

export default Posts;
