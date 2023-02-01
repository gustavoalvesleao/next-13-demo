"use client";

import { apiFetch } from "@/utils/api-fetch";
import { useRouter } from "next/navigation";
import { Note } from "../../types";
import styles from "./Note.module.css";

export interface Props {
  note: Note;
}

const deleteNote = async (id: string, refresh: () => void) => {
  await apiFetch(`api/collections/notes/records/${id}`, { method: "DELETE" });
  refresh();
};

function Note({ note }: Props) {
  const router = useRouter();
  const { id, title, content, created } = note;

  const handleDeleteNote = () => {
    deleteNote(id, router.refresh);
  };

  return (
    <div className={styles.note}>
      <button className={styles.close} onClick={handleDeleteNote}>
        &#10006;
      </button>
      <h2>{title}</h2>
      <h5>{content}</h5>
      <p>{created}</p>
    </div>
  );
}

export default Note;
