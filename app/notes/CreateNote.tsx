"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { apiFetch } from "../../utils/api-fetch";
import { NoteFormElements } from "./types";

const createNote = async (
  title: string,
  content: string,
  refresh: () => void
) => {
  // const db = new PocketBase('http://127.0.0.1:8090');

  // await db.records.create('notes', {
  //   title,
  //   content,
  // });

  await apiFetch("api/collections/notes/records", { data: { title, content } });
  refresh();
};

export default function CreateNote() {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");

  const router = useRouter();

  const handleNoteSubmit = (e: React.FormEvent<NoteFormElements>) => {
    e.preventDefault();

    const { title, content } = e.currentTarget.elements;
    createNote(title.value, content.value, router.refresh);

    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleNoteSubmit}>
      <h3>Create a new Note</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        name="title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        name="content"
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Create note</button>
    </form>
  );
}
