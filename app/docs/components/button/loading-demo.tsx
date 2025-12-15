"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function LoadingDemo() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="flex flex-wrap gap-3">
      <Button color="primary" loading>Loading</Button>
      <Button color="primary" loading={isLoading} onClick={handleClick}>
        {isLoading ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  );
}
