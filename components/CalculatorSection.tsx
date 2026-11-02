"use client";

import React, { useState } from "react";

export default function CalculatorSection() {
  const [style, setStyle] = useState<"pizza" | "focaccia">("pizza");
  const [portions, setPortions] = useState<number>(2);

  const base =
    style === "pizza"
      ? { flour: 160, water: 104, salt: 4, yeast: 0.5, oil: 4, name: "pizze (kulki 260g)" }
      : { flour: 200, water: 150, salt: 5, yeast: 1.5, oil: 10, name: "porcje focacci" };

  return (
    <section className="bg-white rounded-2xl p-5 shadow-sm border border-[#E8DFD1] space-y-4">
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold">Kalkulator Ciasta</h2>
        <p className="text-xs text-[#2C221E]/70">Przelicznik składników na wagę do pizzy i focacci.</p>
      </div>

      <div className="grid grid-cols-2 gap-2 p-1 bg-[#F7F4EE] rounded-xl border border-[#E8DFD1]">
        <button
          type="button"
          onClick={() => setStyle("pizza")}
          className={`py-2 rounded-lg text-xs font-bold transition-all ${
            style === "pizza" ? "bg-[#2C221E] text-white shadow-sm" : "text-[#2C221E]/70"
          }`}
        >
          🍕 Pizza Neapolitańska
        </button>
        <button
          type="button"
          onClick={() => setStyle("focaccia")}
          className={`py-2 rounded-lg text-xs font-bold transition-all ${
            style === "focaccia" ? "bg-[#2C221E] text-white shadow-sm" : "text-[#2C221E]/70"
          }`}
        >
          🍞 Focaccia na blasze
        </button>
      </div>

      <div className="flex items-center justify-between p-3 bg-[#F7F4EE] rounded-xl border border-[#E8DFD1]">
        <div>
          <span className="text-xs font-bold block">Ilość sztuk:</span>
          <span className="text-[11px] text-[#2C221E]/60">{base.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPortions((p) => Math.max(1, p - 1))}
            className="w-9 h-9 rounded-full bg-[#E8DFD1] text-lg font-bold flex items-center justify-center active:scale-95 text-[#2C221E]"
          >
            -
          </button>
          <span className="font-extrabold text-base min-w-[24px] text-center">{portions}</span>
          <button
            type="button"
            onClick={() => setPortions((p) => p + 1)}
            className="w-9 h-9 rounded-full bg-[#2C221E] text-white text-lg font-bold flex items-center justify-center active:scale-95"
          >
            +
          </button>
        </div>
      </div>

      <div className="space-y-2 pt-1 text-xs">
        <h3 className="font-bold uppercase tracking-wider text-[#2C221E]/70">Gramatury składników:</h3>
        <div className="flex justify-between py-1.5 border-b border-[#E8DFD1]">
          <span>Mąka (np. Bio Orkisz 00)</span>
          <span className="font-bold text-[#C86443]">{base.flour * portions} g</span>
        </div>
        <div className="flex justify-between py-1.5 border-b border-[#E8DFD1]">
          <span>Woda (chłodna)</span>
          <span className="font-bold text-[#C86443]">{base.water * portions} ml</span>
        </div>
        <div className="flex justify-between py-1.5 border-b border-[#E8DFD1]">
          <span>Sól drobna</span>
          <span className="font-bold text-[#C86443]">{base.salt * portions} g</span>
        </div>
        <div className="flex justify-between py-1.5 border-b border-[#E8DFD1]">
          <span>Świeże drożdże</span>
          <span className="font-bold text-[#C86443]">{Math.round(base.yeast * portions * 10) / 10} g</span>
        </div>
        <div className="flex justify-between py-1.5 border-b border-[#E8DFD1]">
          <span>Oliwa z oliwek</span>
          <span className="font-bold text-[#C86443]">{base.oil * portions} g</span>
        </div>
        <div className="flex justify-between pt-2 text-sm font-extrabold text-[#2C221E]">
          <span>Łączna masa:</span>
          <span>{(base.flour + base.water + base.salt + base.yeast + base.oil) * portions} g</span>
        </div>
      </div>
    </section>
  );
}