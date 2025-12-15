"use client";

import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { CodePreview, CodeBlock } from "@/components/docs/code-preview";
import { TableOfContents } from "@/components/docs/toc";

const tocItems = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "colors", title: "Colors" },
  { id: "with-label", title: "With Label" },
  { id: "multiple-files", title: "Multiple Files" },
  { id: "file-types", title: "File Types" },
  { id: "max-size", title: "Max Size" },
  { id: "controlled", title: "Controlled Mode" },
  { id: "validation", title: "Validation" },
  { id: "disabled", title: "Disabled" },
  { id: "props", title: "Props" },
];

export default function FileUploadPage() {
  const [files, setFiles] = useState<File[]>([]);

  return (
          <div className="flex gap-16">
        <div className="flex-1 min-w-0 max-w-3xl">
          <header className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-3">File Upload</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A drag & drop file uploader with progress tracking, file list, and validation.
            </p>
          </header>

          <div className="space-y-16">
            <section id="installation">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Installation</h2>
              <CodeBlock code="npx sparkui-cli add file-upload" language="bash" />
            </section>

            <section id="usage">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Usage</h2>
              <CodeBlock
                code={`import { FileUpload } from "@/components/ui/file-upload"

export default function Example() {
  const handleFiles = (files: File[]) => {
    console.log("Files:", files)
  }
  
  return (
    <FileUpload
      label="Upload files"
      onFilesChange={handleFiles}
    />
  )
}`}
              />
            </section>

            <section id="colors">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Colors</h2>
              <p className="text-muted-foreground mb-6">The color affects the drag highlight and accent elements.</p>
              <CodePreview
                preview={
                  <div className="grid md:grid-cols-2 gap-4 w-full">
                    <FileUpload color="primary" description="Primary color" />
                    <FileUpload color="secondary" description="Secondary color" />
                  </div>
                }
                code={`<FileUpload color="primary" />
<FileUpload color="secondary" />`}
              />
            </section>

            <section id="with-label">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">With Label</h2>
              <CodePreview
                preview={
                  <div className="w-full">
                    <FileUpload 
                      label="Profile Picture" 
                      description="PNG, JPG up to 5MB"
                      color="primary"
                      required
                    />
                  </div>
                }
                code={`<FileUpload 
  label="Profile Picture" 
  description="PNG, JPG up to 5MB"
  required
/>`}
              />
            </section>

            <section id="multiple-files">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Multiple Files</h2>
              <CodePreview
                preview={
                  <div className="w-full">
                    <FileUpload 
                      label="Documents" 
                      multiple 
                      maxFiles={5}
                      color="primary"
                    />
                  </div>
                }
                code={`<FileUpload 
  label="Documents" 
  multiple 
  maxFiles={5}
/>`}
              />
            </section>

            <section id="file-types">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">File Types</h2>
              <p className="text-muted-foreground mb-6">Restrict accepted file types using the accept prop.</p>
              <CodePreview
                preview={
                  <div className="grid md:grid-cols-2 gap-4 w-full">
                    <FileUpload 
                      label="Images Only" 
                      accept="image/*"
                      description="JPG, PNG, GIF, WebP"
                      color="primary"
                    />
                    <FileUpload 
                      label="Documents" 
                      accept=".pdf,.doc,.docx"
                      description="PDF, Word documents"
                      color="secondary"
                    />
                  </div>
                }
                code={`<FileUpload 
  label="Images Only" 
  accept="image/*"
/>
<FileUpload 
  label="Documents" 
  accept=".pdf,.doc,.docx"
/>`}
              />
            </section>

            <section id="max-size">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Max Size</h2>
              <p className="text-muted-foreground mb-6">Limit file size (in bytes). Files exceeding the limit show an error.</p>
              <CodePreview
                preview={
                  <div className="w-full">
                    <FileUpload 
                      label="Small files only" 
                      maxSize={1024 * 1024}
                      description="Max 1MB per file"
                      color="warning"
                    />
                  </div>
                }
                code={`<FileUpload 
  label="Small files only" 
  maxSize={1024 * 1024} // 1MB
/>`}
              />
            </section>

            <section id="controlled">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Controlled Mode</h2>
              <CodePreview
                preview={
                  <div className="w-full space-y-4">
                    <FileUpload
                      label="Upload Files"
                      onFilesChange={setFiles}
                      multiple
                      color="primary"
                    />
                    <p className="text-sm text-muted-foreground">
                      Files selected: <span className="text-foreground font-mono">{files.length}</span>
                    </p>
                  </div>
                }
                code={`const [files, setFiles] = useState<File[]>([])

<FileUpload
  label="Upload Files"
  onFilesChange={setFiles}
  multiple
/>
<p>Files selected: {files.length}</p>`}
              />
            </section>

            <section id="validation">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Validation</h2>
              <CodePreview
                preview={
                  <div className="w-full">
                    <FileUpload
                      label="Required Upload"
                      invalid
                      errorMessage="Please upload at least one file"
                      required
                    />
                  </div>
                }
                code={`<FileUpload
  label="Required Upload"
  invalid
  errorMessage="Please upload at least one file"
  required
/>`}
              />
            </section>

            <section id="disabled">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Disabled</h2>
              <CodePreview
                preview={
                  <div className="w-full">
                    <FileUpload label="Disabled Upload" disabled />
                  </div>
                }
                code={`<FileUpload label="Disabled Upload" disabled />`}
              />
            </section>

            <section id="props">
              <h2 className="text-xl font-semibold mb-6 scroll-mt-6">Props</h2>
              <div className="overflow-x-auto rounded-xl border border-border bg-card">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left py-4 px-5 font-medium">Prop</th>
                      <th className="text-left py-4 px-5 font-medium">Type</th>
                      <th className="text-left py-4 px-5 font-medium">Default</th>
                      <th className="text-left py-4 px-5 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    {[
                      ["onFilesChange", "(files: File[]) => void", "-", "Called when files change"],
                      ["accept", "string", "-", "Accepted file types (e.g. image/*)"],
                      ["multiple", "boolean", "false", "Allow multiple files"],
                      ["maxFiles", "number", "10", "Maximum number of files"],
                      ["maxSize", "number (bytes)", "10MB", "Maximum file size"],
                      ["label", "string", "-", "Label text above uploader"],
                      ["description", "string", "-", "Helper text in drop zone"],
                      ["color", "default | primary | secondary | success | warning | danger", "primary", "Accent color"],
                      ["disabled", "boolean", "false", "Disable the uploader"],
                      ["required", "boolean", "false", "Show required asterisk"],
                      ["invalid", "boolean", "false", "Show error state"],
                      ["errorMessage", "string", "-", "Error message text"],
                    ].map(([prop, type, def, desc]) => (
                      <tr key={prop} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                        <td className="py-4 px-5 font-mono text-foreground text-sm">{prop}</td>
                        <td className="py-4 px-5 font-mono text-xs text-primary/80">{type}</td>
                        <td className="py-4 px-5 font-mono text-xs">{def}</td>
                        <td className="py-4 px-5 text-xs">{desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>

        <div className="hidden xl:block w-52 shrink-0">
          <div className="sticky top-6">
            <TableOfContents items={tocItems} />
          </div>
        </div>
      </div>
  );
}
