export default function ImageLoader({ src }) {
    const URL = process.env.URL
    return `${URL}/${src}`;
  }