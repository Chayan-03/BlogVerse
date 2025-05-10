// src/components/RightSidebar.jsx
import React from "react";
import { Input } from "@/components/ui/input";

export default function RightSidebar() {
  return (
    <aside className="w-[300px] hidden lg:block px-6 py-4 space-y-6 position-sticky top-0 h-screen">
      <div>
        <Input placeholder="Search blogs..." />
      </div>

      <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
        <h4 className="font-semibold mb-3">Trending Topics</h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>#AI</li>
          <li>#Tech</li>
          <li>#PersonalGrowth</li>
          <li>#Coding</li>
        </ul>
      </div>
    </aside>
  );
}
