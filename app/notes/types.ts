export interface Note {
  "@collectionId": string;
  "@collectionName": string;
  id: string;
  created: string;
  updated: string;
  title: string;
  content: string;
}

export interface Notes {
  page: number;
  perPage: number;
  totalItems: number;
  items: Note[];
}

export interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  content: HTMLInputElement;
}
export interface NoteFormElements extends HTMLFormElement {
  readonly elements: FormElements;
}
