import { Note } from "../types";
import styles from "../Notes.module.css";
import { apiFetch } from "utils/api-fetch";

async function getNote(noteId: string) {
  const data: Note = await apiFetch(`api/collections/notes/records/${noteId}`);
  return data;
}

export default async function NotePage({ params }: any) {
  const note = await getNote(params.id);

  return (
    <div>
      <h1>notes/{note.id}</h1>
      <div className={styles.note}>
        <h3>{note.title}</h3>
        <h5>{note.content}</h5>
        <p>{note.created}</p>
      </div>
    </div>
  );
}
