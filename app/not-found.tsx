import Link from "next/link";
export default function NotFound(){return <main className="not-found"><p className="eyebrow">The trail has gone dark</p><h1>This room is not in the exhibition.</h1><p>Judith and her maid may have already left the camp.</p><div><Link className="button button--primary" href="/">Return to the entrance</Link><Link className="button button--outline" href="/gallery">Open the gallery</Link></div></main>}

