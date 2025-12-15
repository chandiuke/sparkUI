"use client";

import React, { useState, useRef, useId } from "react";
import { clsx } from "clsx";

type FileUploadColor = "default" | "primary" | "secondary" | "success" | "warning" | "danger";

interface FileUploadProps {
  onFilesChange?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number; // in bytes
  label?: string;
  description?: string;
  color?: FileUploadColor;
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean;
  errorMessage?: string;
  className?: string;
}

interface UploadedFile {
  file: File;
  id: string;
  progress: number;
  error?: string;
}

const colorConfig = {
  default: { border: "border-foreground", bg: "bg-foreground/5", text: "text-foreground" },
  primary: { border: "border-primary", bg: "bg-primary/5", text: "text-primary" },
  secondary: { border: "border-secondary", bg: "bg-secondary/5", text: "text-secondary" },
  success: { border: "border-success", bg: "bg-success/5", text: "text-success" },
  warning: { border: "border-warning", bg: "bg-warning/5", text: "text-warning" },
  danger: { border: "border-danger", bg: "bg-danger/5", text: "text-danger" },
};

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

const getFileIcon = (type: string) => {
  if (type.startsWith("image/")) return "🖼️";
  if (type.startsWith("video/")) return "🎬";
  if (type.startsWith("audio/")) return "🎵";
  if (type.includes("pdf")) return "📄";
  if (type.includes("zip") || type.includes("rar")) return "📦";
  if (type.includes("doc") || type.includes("word")) return "📝";
  if (type.includes("sheet") || type.includes("excel")) return "📊";
  return "📎";
};

export function FileUpload({
  onFilesChange,
  accept,
  multiple = false,
  maxFiles = 10,
  maxSize = 10 * 1024 * 1024, // 10MB default
  label,
  description,
  color = "primary",
  disabled = false,
  required = false,
  invalid = false,
  errorMessage,
  className,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles || disabled) return;

    const fileArray = Array.from(newFiles);
    const validFiles: UploadedFile[] = [];

    for (const file of fileArray) {
      if (files.length + validFiles.length >= maxFiles) break;
      
      let error: string | undefined;
      if (file.size > maxSize) {
        error = `File too large (max ${formatFileSize(maxSize)})`;
      }

      validFiles.push({
        file,
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        progress: error ? 0 : 100,
        error,
      });
    }

    const updatedFiles = multiple ? [...files, ...validFiles] : validFiles.slice(0, 1);
    setFiles(updatedFiles);
    onFilesChange?.(updatedFiles.filter(f => !f.error).map(f => f.file));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const removeFile = (fileId: string) => {
    const updatedFiles = files.filter(f => f.id !== fileId);
    setFiles(updatedFiles);
    onFilesChange?.(updatedFiles.filter(f => !f.error).map(f => f.file));
  };

  const clearAll = () => {
    setFiles([]);
    onFilesChange?.([]);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className={clsx("w-full", className)}>
      {label && (
        <label htmlFor={id} className={clsx("block font-medium text-sm mb-2", invalid ? "text-danger" : "text-foreground")}>
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>
      )}

      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !disabled && inputRef.current?.click()}
        className={clsx(
          "relative border-2 border-dashed rounded-2xl p-8 transition-all duration-200 cursor-pointer",
          "flex flex-col items-center justify-center gap-3 text-center",
          isDragging && !disabled && [colorConfig[color].border, colorConfig[color].bg],
          !isDragging && "border-border hover:border-muted-foreground/50",
          invalid && "border-danger",
          disabled && "opacity-50 cursor-not-allowed bg-muted/30",
        )}
      >
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          required={required}
          aria-describedby={`${id}-description`}
          aria-invalid={invalid || undefined}
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />

        {/* Upload Icon */}
        <div className={clsx(
          "w-14 h-14 rounded-2xl flex items-center justify-center transition-all",
          isDragging ? colorConfig[color].bg : "bg-muted/50",
        )}>
          <svg className={clsx("w-7 h-7", isDragging ? colorConfig[color].text : "text-muted-foreground")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
        </div>

        <div>
          <p className="font-medium text-foreground">
            {isDragging ? "Drop files here" : "Drag & drop files here"}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            or <span className={colorConfig[color].text}>browse</span> to upload
          </p>
        </div>

        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}

        <p id={`${id}-description`} className="text-xs text-muted-foreground">
          Max {formatFileSize(maxSize)} per file {multiple && `• Up to ${maxFiles} files`}
        </p>
      </div>

      {invalid && errorMessage && (
        <p role="alert" aria-live="assertive" className="text-xs text-danger mt-2">{errorMessage}</p>
      )}
      
      {/* Screen reader announcement for file changes */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {files.length > 0 && `${files.length} file${files.length > 1 ? 's' : ''} selected`}
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{files.length} file{files.length > 1 ? "s" : ""}</span>
            <button
              type="button"
              onClick={clearAll}
              className="text-xs text-muted-foreground hover:text-danger transition-colors"
            >
              Clear all
            </button>
          </div>

          {files.map(({ file, id: fileId, progress, error }) => (
            <div
              key={fileId}
              className={clsx(
                "flex items-center gap-3 p-3 rounded-xl border transition-all",
                error ? "border-danger/50 bg-danger/5" : "border-border bg-card/50"
              )}
            >
              <span className="text-2xl">{getFileIcon(file.type)}</span>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className={clsx("text-xs", error ? "text-danger" : "text-muted-foreground")}>
                  {error || formatFileSize(file.size)}
                </p>
                
                {!error && progress < 100 && (
                  <div className="mt-1 h-1 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={clsx("h-full rounded-full transition-all", `bg-${color === "default" ? "foreground" : color}`)}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => removeFile(fileId)}
                className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-danger transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
