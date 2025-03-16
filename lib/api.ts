export async function fetchPosts() {
    const res = await fetch("http://localhost:8080/api/posts");
    return res.json();
}
