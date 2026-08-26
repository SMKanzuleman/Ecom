import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';

import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaListUl,
  FaListOl,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaUndo,
  FaRedo,
} from 'react-icons/fa';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export const RichTextEditor = ({
  content,
  onChange,
}: RichTextEditorProps) => {

  const editor = useEditor({
    extensions: [
      StarterKit,

      Underline,

      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],

    content,

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },

    editorProps: {
      attributes: {
        class:
          'min-h-[250px] p-4 outline-none text-sm text-black [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:my-3 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:my-3 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:my-2 [&_p]:my-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6',
      },
    },
  });

  if (!editor) {
    return null;
  }

  const buttonClass = (active: boolean = false) => `
    w-8 h-8 flex items-center justify-center
    rounded-md
    hover:bg-gray-200
    ${active ? 'bg-black text-white' : 'text-gray-700'}
  `;

  return (
    <div className="w-full border border-gray-300 rounded-xl overflow-hidden bg-white">

      {/* Toolbar */}

      <div className="flex items-center gap-1 flex-wrap p-2 border-b border-gray-300 bg-gray-50">

        {/* Undo */}

        <button
          type="button"
          title="Undo"
          disabled={!editor.can().undo()}
          onClick={() => editor.chain().focus().undo().run()}
          className={`${buttonClass()} disabled:opacity-30`}
        >
          <FaUndo size={13} />
        </button>

        {/* Redo */}

        <button
          type="button"
          title="Redo"
          disabled={!editor.can().redo()}
          onClick={() => editor.chain().focus().redo().run()}
          className={`${buttonClass()} disabled:opacity-30`}
        >
          <FaRedo size={13} />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Heading */}

        <select
          className="h-8 px-2 text-xs border border-gray-300 rounded-md outline-none"
          value={
            editor.isActive('heading')
              ? `h${editor.getAttributes('heading').level}`
              : 'paragraph'
          }
          onChange={(e) => {

            const value = e.target.value;

            if (value === 'paragraph') {
              editor.chain().focus().setParagraph().run();
              return;
            }

            const level = Number(
              value.replace('h', '')
            ) as 1 | 2 | 3;

            editor
              .chain()
              .focus()
              .toggleHeading({ level })
              .run();
          }}
        >
          <option value="paragraph">
            Normal
          </option>

          <option value="h1">
            Heading 1
          </option>

          <option value="h2">
            Heading 2
          </option>

          <option value="h3">
            Heading 3
          </option>
        </select>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Bold */}

        <button
          type="button"
          title="Bold"
          onClick={() =>
            editor.chain().focus().toggleBold().run()
          }
          className={buttonClass(editor.isActive('bold'))}
        >
          <FaBold />
        </button>

        {/* Italic */}

        <button
          type="button"
          title="Italic"
          onClick={() =>
            editor.chain().focus().toggleItalic().run()
          }
          className={buttonClass(editor.isActive('italic'))}
        >
          <FaItalic />
        </button>

        {/* Underline */}

        <button
          type="button"
          title="Underline"
          onClick={() =>
            editor.chain().focus().toggleUnderline().run()
          }
          className={buttonClass(editor.isActive('underline'))}
        >
          <FaUnderline />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Bullet List */}

        <button
          type="button"
          title="Bullet List"
          onClick={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          className={buttonClass(
            editor.isActive('bulletList')
          )}
        >
          <FaListUl />
        </button>

        {/* Ordered List */}

        <button
          type="button"
          title="Numbered List"
          onClick={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
          className={buttonClass(
            editor.isActive('orderedList')
          )}
        >
          <FaListOl />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Left */}

        <button
          type="button"
          title="Align Left"
          onClick={() =>
            editor.chain().focus().setTextAlign('left').run()
          }
          className={buttonClass(
            editor.isActive({ textAlign: 'left' })
          )}
        >
          <FaAlignLeft />
        </button>

        {/* Center */}

        <button
          type="button"
          title="Align Center"
          onClick={() =>
            editor.chain().focus().setTextAlign('center').run()
          }
          className={buttonClass(
            editor.isActive({ textAlign: 'center' })
          )}
        >
          <FaAlignCenter />
        </button>

        {/* Right */}

        <button
          type="button"
          title="Align Right"
          onClick={() =>
            editor.chain().focus().setTextAlign('right').run()
          }
          className={buttonClass(
            editor.isActive({ textAlign: 'right' })
          )}
        >
          <FaAlignRight />
        </button>

        {/* Justify */}

        <button
          type="button"
          title="Justify"
          onClick={() =>
            editor.chain().focus().setTextAlign('justify').run()
          }
          className={buttonClass(
            editor.isActive({ textAlign: 'justify' })
          )}
        >
          <FaAlignJustify />
        </button>

      </div>

      {/* Editor */}

      <EditorContent editor={editor} />

    </div>
  );
};