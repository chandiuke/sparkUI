"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export function ControlledAccordionDemo() {
  const [expanded, setExpanded] = useState<string[]>([]);

  return (
    <div className="space-y-4 w-full">
      <div className="flex gap-2">
        <button
          onClick={() => setExpanded(["ctrl-1"])}
          className="px-3 py-1.5 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Open First
        </button>
        <button
          onClick={() => setExpanded(["ctrl-1", "ctrl-2"])}
          className="px-3 py-1.5 text-sm rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors"
        >
          Open All
        </button>
        <button
          onClick={() => setExpanded([])}
          className="px-3 py-1.5 text-sm rounded-lg bg-muted text-foreground hover:bg-muted/80 transition-colors"
        >
          Close All
        </button>
      </div>
      <Accordion 
        type="multiple"
        value={expanded} 
        onValueChange={setExpanded}
        variant="bordered"
      >
        <AccordionItem value="ctrl-1">
          <AccordionTrigger>First Item</AccordionTrigger>
          <AccordionContent>This accordion is controlled externally.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="ctrl-2">
          <AccordionTrigger>Second Item</AccordionTrigger>
          <AccordionContent>Use the buttons above to control the state.</AccordionContent>
        </AccordionItem>
      </Accordion>
      <p className="text-xs text-muted-foreground">
        Current state: {expanded.length > 0 ? expanded.join(", ") : "none"}
      </p>
    </div>
  );
}
