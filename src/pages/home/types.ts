/**
 * Represents a document in the application.
 */
export interface Doc {
  /** The type of the document. */
  type: string;

  /** The title of the document. */
  title: string;

  /** The URL or path to the document's thumbnail image. */
  thumbnail: string;

  /** The position of the document in a list or order. */
  position: number;

  /** The unique identifier of the document. */
  id: string;
}
