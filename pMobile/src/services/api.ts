export async function fetchExample() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    return res.json();
  }
  