"use client";

import { memo } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { clsx } from "clsx";

interface CodeHighlighterProps {
  code: string;
  language: string;
}

// Memoized code renderer for better performance
const CodeHighlighter = memo(function CodeHighlighter({
  code,
  language,
}: CodeHighlighterProps) {
  return (
    <Highlight theme={themes.nightOwl} code={code.trim()} language={language}>
      {({
        className: preClassName,
        style,
        tokens,
        getLineProps,
        getTokenProps,
      }) => (
        <pre
          className={clsx(
            preClassName,
            "p-4 overflow-x-auto text-sm leading-relaxed"
          )}
          style={{ ...style, background: "rgb(17, 17, 17)" }}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              <span className="inline-block w-8 text-gray-500 select-none text-right mr-4">
                {i + 1}
              </span>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
});

export default CodeHighlighter;
