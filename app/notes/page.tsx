// "use client";

import Link from "next/link";
import { Notes } from "./types";
import styles from "./Notes.module.css";
import CreateNote from "./CreateNote";
import { apiFetch } from "utils/api-fetch";
import Note from "./components/Note/Note";

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
          <Link href={`/notes/${note.id}`} key={note.id}>
            <Note note={note} />
          </Link>
        ))}
      </div>

      <CreateNote />
    </div>
  );
}
