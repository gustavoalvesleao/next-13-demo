import Link from "next/link";
import { Note, Notes } from "./types";
import styles from "./Notes.module.css";
import CreateNote from "./CreateNote";
import { apiFetch } from "utils/api-fetch";

async function getNotes() {
  try {
    const data: Notes = await apiFetch(
      "api/collections/notes/records?page=1&perPage=30",
      { cache: "no-store" }
    );
    return data?.items;
  } catch (e) {
    return [];
  }
}

export default async function NotesPage() {
  const notes = await getNotes();

  return (
    <div>
      <h1>Notes</h1>
      <div className={styles.grid}>
        {notes?.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </div>

      <CreateNote />
    </div>
  );
}

function Note({ note }: { note: Note }) {
  const { id, title, content, created } = note;
  return (
    <Link href={`/notes/${id}`}>
      <div className={styles.note}>
        <h2>{title}</h2>
        <h5>{content}</h5>
        <p>{created}</p>
      </div>
    </Link>
  );
}
