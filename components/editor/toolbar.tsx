"use client";

import { Editor } from "@tiptap/react";

import {
  Bold,
  Grid2x2Plus,
  Grid2x2X,
  Heading1,
  Heading2,
  Heading3,
  ImageIcon,
  Italic,
  Link2,
  List,
  ListMinus,
  ListOrdered,
  ListPlus,
  Loader2,
  Redo2,
  Sheet,
  Trash2,
  Underline as UnderlineIcon,
  Undo2,
} from "lucide-react";

import { useState } from "react";

type Props = {
  editor: Editor;
};

export default function Toolbar({ editor }: Props) {
  const [isUploading, setIsUploading] = useState(false);

  // todo: fix heading 3 not working

  const toolbarButtonClass = (isActive?: boolean) =>
    `
      flex
      items-center
      justify-center
      w-10
      h-10
      rounded-lg
      border
      transition
      cursor-pointer
      disabled:opacity-50
      disabled:cursor-not-allowed
      ${
        isActive
          ? "bg-black text-white border-black"
          : "bg-white hover:bg-gray-100 border-gray-200"
      }
    `;

  const addImage = async () => {
    const input = document.createElement("input");

    input.type = "file";

    input.accept = "image/*";

    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];

      if (!file) return;

      // File Type Validation

      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image.");

        return;
      }

      // File Size Validation
      // 5MB Limit

      const MAX_SIZE = 5 * 1024 * 1024;

      if (file.size > MAX_SIZE) {
        alert("Image size must be less than 5MB.");

        return;
      }

      try {
        setIsUploading(true);

        const formData = new FormData();

        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",

          body: formData,
        });

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const data = await response.json();

        editor
          .chain()
          .focus()
          .setImage({
            src: data.url,
          })
          .run();
      } catch (error) {
        console.error(error);

        alert("Image upload failed.");
      } finally {
        setIsUploading(false);
      }
    };
  };

  const addLink = () => {
    const previousUrl = editor.getAttributes("link").href;

    const url = window.prompt("Enter URL", previousUrl);

    if (url === null) return;

    if (url === "") {
      editor.chain().focus().unsetLink().run();

      return;
    }

    editor.chain().focus().setLink({ href: url }).run();
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-3 border-b bg-gray-50">
      {/* Bold */}
      <button
        title="Bold Text"
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={toolbarButtonClass(editor.isActive("bold"))}
      >
        <Bold size={18} />
      </button>

      {/* Italic */}
      <button
        title="Italic Text"
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={toolbarButtonClass(editor.isActive("italic"))}
      >
        <Italic size={18} />
      </button>

      {/* Underline */}
      <button
        title="Underline text"
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={toolbarButtonClass(editor.isActive("underline"))}
      >
        <UnderlineIcon size={18} />
      </button>

      {/* Link */}
      <button
        title="Add Link"
        type="button"
        onClick={addLink}
        className={toolbarButtonClass(editor.isActive("link"))}
      >
        <Link2 size={18} />
      </button>

      {/* H1 */}
      <button
        title="Heading 1"
        type="button"
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
        className={toolbarButtonClass(
          editor.isActive("heading", {
            level: 1,
          }),
        )}
      >
        <Heading1 size={18} />
      </button>

      {/* H2 */}
      <button
        title="Heading 2"
        type="button"
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
        className={toolbarButtonClass(
          editor.isActive("heading", {
            level: 2,
          }),
        )}
      >
        <Heading2 size={18} />
      </button>

      {/* H3 */}
      <button
        title="Heading 3"
        type="button"
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 3 }).run()
        }
        className={toolbarButtonClass(
          editor.isActive("heading", {
            level: 3,
          }),
        )}
      >
        <Heading3 size={18} />
      </button>

      {/* Bullet List */}
      <button
        title="Bullet List"
        type="button"
        onClick={() =>
          editor.chain().focus().toggleBulletList().run()
        }
        className={toolbarButtonClass(editor.isActive("bulletList"))}
      >
        <List size={18} />
      </button>

      {/* Ordered List */}
      <button
        title="Order List"
        type="button"
        onClick={() =>
          editor.chain().focus().toggleOrderedList().run()
        }
        className={toolbarButtonClass(editor.isActive("orderedList"))}
      >
        <ListOrdered size={18} />
      </button>

      {/* Table */}
      <button
        title="Table"
        type="button"
        onClick={() =>
          editor
            .chain()
            .focus()
            .insertTable({
              rows: 3,
              cols: 3,
              withHeaderRow: true,
            })
            .run()
        }
        className={toolbarButtonClass(editor.isActive("table"))}
      >
        <Sheet size={18} />
      </button>

      {/* Remove */}
      <button
        title="Remove Table"
        type="button"
        onClick={() => editor.chain().focus().deleteTable().run()}
        className={toolbarButtonClass()}
      >
        <Trash2 size={18} />
      </button>

      {/* Add Column */}
      <button
        title="Add Table column"
        type="button"
        onClick={() => editor.chain().focus().addColumnAfter().run()}
        className={toolbarButtonClass()}
      >
        <ListPlus size={18} />
      </button>

      {/* Remove Column */}
      <button
        title="Remove Table column"
        type="button"
        onClick={() => editor.chain().focus().deleteColumn().run()}
        className={toolbarButtonClass()}
      >
        <ListMinus size={18} />
      </button>

      {/* Add Row */}
      <button
        title="Add Table row"
        type="button"
        onClick={() => editor.chain().focus().addRowAfter().run()}
        className={toolbarButtonClass()}
      >
        <Grid2x2Plus size={18} />
      </button>

      {/* Remove Row */}
      <button
        title="Remove Table row"
        type="button"
        onClick={() => editor.chain().focus().deleteRow().run()}
        className={toolbarButtonClass()}
      >
        <Grid2x2X size={18} />
      </button>

      {/* Image Upload */}
      <button
        title="Attach Image"
        type="button"
        onClick={addImage}
        disabled={isUploading}
        className={toolbarButtonClass()}
      >
        {isUploading ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <ImageIcon size={18} />
        )}
      </button>

      {/* Undo */}
      <button
        title="Undo Last Action"
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        className={toolbarButtonClass()}
      >
        <Undo2 size={18} />
      </button>

      {/* Redo */}
      <button
        title="Redo Last Action"
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        className={toolbarButtonClass()}
      >
        <Redo2 size={18} />
      </button>
    </div>
  );
}
