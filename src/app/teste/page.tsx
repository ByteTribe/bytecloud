"use client";

import { useState } from "react";

function maskCpf(cpf: string) {
  return cpf
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2");
}

export default function Teste() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <input
        onChange={(e) => {
          e.target.value = maskCpf(e.target.value);
        }}
        max={14}
        maxLength={14}
        className="border border-zinc-500"
        type="text"
      />
    </main>
  );
}
