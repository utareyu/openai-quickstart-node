import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [Input, setInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ request: Input }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI app</title>
        <link rel="icon" href="/router.png" />
      </Head>

      <main className={styles.main}>
        <img src="/router.png" className={styles.icon} />
        <h3>Generate text to Cisco IOS Command</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="input"
            placeholder="what you want to do?"
            value={Input}
            onChange={(e) => setInput(e.target.value)}
          />
          <input type="submit" value="Generate Command" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
