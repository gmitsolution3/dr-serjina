"use client";

import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { Table } from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ResizeImage from "tiptap-extension-resize-image";

import debounce from "lodash.debounce";
import { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import Toolbar from "./toolbar";

export default function Editor({
  onTitleChange,
  onSlugChange,
  onThumbnailChange,
  onContentChange,
}: {
  onTitleChange: Dispatch<SetStateAction<string>>;
  onSlugChange: Dispatch<SetStateAction<string>>;
  onThumbnailChange: Dispatch<SetStateAction<string>>;
  onContentChange: Dispatch<SetStateAction<{}>>;
}) {
  const debouncedContentChange = useMemo(
    () =>
      debounce((content) => {
        onContentChange(content);
      }, 2000),

    [onContentChange],
  );

  useEffect(() => {
    return () => {
      debouncedContentChange.cancel();
    };
  }, [debouncedContentChange]);

  const editor = useEditor({
    extensions: [
      StarterKit,

      Underline,

      Link.configure({
        openOnClick: false,

        autolink: true,

        defaultProtocol: "https",

        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),

      ResizeImage.configure({
        inline: false,
        allowBase64: true,
      }),

      Placeholder.configure({
        placeholder: "Write your amazing blog here...",
      }),

      Table.configure({
        resizable: true,
      }),

      TableRow,

      TableHeader,

      TableCell,
    ],

    editorProps: {
      attributes: {
        class:
          "prose tiptap prose-lg max-w-none focus:outline-none min-h-[400px] p-6",
      },
    },

    content: "",

    onUpdate: ({ editor }) => {
      debouncedContentChange(editor.getJSON());
    },

    immediatelyRender: false,
  });

  //? retrive saved draft from localdb
  useEffect(() => {
    const savedDraft = localStorage.getItem("blog-draft");

    if (!savedDraft) return;

    const parsedDraft = JSON.parse(savedDraft);

    onTitleChange(parsedDraft.title || "");

    onThumbnailChange(parsedDraft.thumbnail || "");

    onSlugChange(parsedDraft.slug)

    onContentChange(parsedDraft.content)

    editor?.commands.setContent(parsedDraft.content || "");
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="w-full border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">
      {/* Toolbar */}
      <Toolbar editor={editor} />

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
}
