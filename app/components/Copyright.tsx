"use client";

import { useEffect, useState } from "react";

export default function Copyright() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <div className="text-center text-sm text-stone-500">
      © {currentYear ?? ""} BookNest. All rights reserved.
    </div>
  );
}
