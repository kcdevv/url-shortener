"use client";
import { Toaster } from "react-hot-toast";
import React from "react";
import './globals.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
