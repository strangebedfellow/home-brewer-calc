"use client";

import { useState } from "react";
import AccordionItem from "./AccordionItem";
import {
  calculateAbvMetrics,
  calculateDilution,
  calculatePrimingSugar,
  calculateRefractometerCorrection,
} from "../lib/calculators";
import { convertToPlato, convertToSg } from "../lib/conversions";

function InputField({ label, name, step, placeholder, value, onChange }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-(--text-muted)">{label}</span>
      <input
        name={name}
        type="number"
        step={step}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-(--border) bg-(--surface-1) px-3 py-2 text-(--text-primary) outline-none transition placeholder:text-(--text-muted) focus:border-(--accent) focus:ring-2 focus:ring-(--accent)/35"
      />
    </label>
  );
}

function SelectField({ label, name, value, onChange, options }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-(--text-muted)">{label}</span>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-(--border) bg-(--surface-1) px-3 py-2 text-(--text-primary) outline-none transition focus:border-(--accent) focus:ring-2 focus:ring-(--accent)/35"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function ResultBlock({ title, value }) {
  return (
    <div className="rounded-xl border border-(--border) bg-(--surface-1) px-4 py-3">
      <p className="text-xs uppercase tracking-wide text-(--text-muted)">{title}</p>
      <p className="mt-1 text-xl font-semibold text-(--text-primary)">{value}</p>
    </div>
  );
}

function DilutionCalculator() {
  const [worthVolume, setWorthVolume] = useState("20");
  const [currentGravity, setCurrentGravity] = useState("16");
  const [targetGravity, setTargetGravity] = useState("12");
  const [result, setResult] = useState("6.67");

  const onSubmit = (event) => {
    event.preventDefault();
    setResult(calculateDilution(Number(worthVolume), Number(currentGravity), Number(targetGravity)));
  };

  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed text-(--text-muted)">
        Gęstość brzeczki po zakończeniu warzenia jest zbyt wysoka? Oblicz ilość wody, jaką należy dolać, aby uzyskać
        zaplanowaną gęstość początkową.
      </p>
      <form onSubmit={onSubmit} className="grid gap-3 md:grid-cols-3">
        <InputField
          label="Ilość brzeczki (L)"
          name="worthVolume"
          step="0.1"
          placeholder="20"
          value={worthVolume}
          onChange={(event) => setWorthVolume(event.target.value)}
        />
        <InputField
          label="Obecna gęstość (BLG)"
          name="currentGravity"
          step="0.1"
          placeholder="16"
          value={currentGravity}
          onChange={(event) => setCurrentGravity(event.target.value)}
        />
        <InputField
          label="Oczekiwana gęstość (BLG)"
          name="targetGravity"
          step="0.1"
          placeholder="12"
          value={targetGravity}
          onChange={(event) => setTargetGravity(event.target.value)}
        />
        <button
          type="submit"
          className="md:col-span-3 rounded-xl bg-(--accent) px-4 py-3 font-semibold text-(--accent-contrast) transition hover:opacity-90"
        >
          Oblicz
        </button>
      </form>
      <ResultBlock title="Ilość wody do dodania" value={`${result} L`} />
    </div>
  );
}

function DensityConverter() {
  const [blg, setBlg] = useState("12");
  const [sg, setSg] = useState("1.048");
  const [sgResult, setSgResult] = useState("1.048");
  const [blgResult, setBlgResult] = useState("11.91");

  const onBlgSubmit = (event) => {
    event.preventDefault();
    setSgResult(convertToSg(blg));
  };

  const onSgSubmit = (event) => {
    event.preventDefault();
    setBlgResult(convertToPlato(Number(sg)));
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <form onSubmit={onBlgSubmit} className="space-y-3 rounded-xl border border-(--border) bg-(--surface-1) p-4">
        <InputField
          label="BLG"
          name="blg"
          step="0.1"
          placeholder="12"
          value={blg}
          onChange={(event) => setBlg(event.target.value)}
        />
        <button type="submit" className="w-full rounded-xl bg-(--accent) px-3 py-2 font-semibold text-(--accent-contrast) hover:opacity-90">
          Oblicz
        </button>
        <ResultBlock title="SG (Specific Gravity)" value={sgResult} />
      </form>
      <form onSubmit={onSgSubmit} className="space-y-3 rounded-xl border border-(--border) bg-(--surface-1) p-4">
        <InputField
          label="SG (Specific Gravity)"
          name="sg"
          step="0.001"
          placeholder="1.048"
          value={sg}
          onChange={(event) => setSg(event.target.value)}
        />
        <button type="submit" className="w-full rounded-xl bg-(--accent) px-3 py-2 font-semibold text-(--accent-contrast) hover:opacity-90">
          Oblicz
        </button>
        <ResultBlock title="BLG" value={blgResult} />
      </form>
    </div>
  );
}

function AlcoholCalculator() {
  const [og, setOg] = useState("12");
  const [fg, setFg] = useState("3");
  const [result, setResult] = useState({
    abv: "4.80",
    abw: "3.81",
    fermentationDegree: "75.0",
  });

  const onSubmit = (event) => {
    event.preventDefault();
    setResult(calculateAbvMetrics(Number(og), Number(fg)));
  };

  return (
    <div className="space-y-4">
      <form onSubmit={onSubmit} className="grid gap-3 md:grid-cols-2">
        <InputField
          label="Gęstość początkowa (BLG)"
          name="og"
          step="0.01"
          placeholder="12"
          value={og}
          onChange={(event) => setOg(event.target.value)}
        />
        <InputField
          label="Gęstość końcowa (BLG)"
          name="fg"
          step="0.01"
          placeholder="3"
          value={fg}
          onChange={(event) => setFg(event.target.value)}
        />
        <button
          type="submit"
          className="md:col-span-2 rounded-xl bg-(--accent) px-4 py-3 font-semibold text-(--accent-contrast) transition hover:opacity-90"
        >
          Oblicz
        </button>
      </form>
      <div className="grid gap-3 md:grid-cols-3">
        <ResultBlock title="ABV (objętościowo)" value={`${result.abv} %`} />
        <ResultBlock title="ABW (wagowo)" value={`${result.abw} %`} />
        <ResultBlock title="Stopień odfermentowania" value={`${result.fermentationDegree} %`} />
      </div>
    </div>
  );
}

function RefractometerCalculator() {
  const [ob, setOb] = useState("12");
  const [fb, setFb] = useState("6");
  const [result, setResult] = useState("2.92");

  const onSubmit = (event) => {
    event.preventDefault();
    const { correctedBlg } = calculateRefractometerCorrection(Number(ob), Number(fb));
    setResult(correctedBlg);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed text-(--text-muted)">
        Refraktometr mierzy współczynnik załamania światła. Przy fermentacji alkohol zaburza odczyt, dlatego wynik
        wymaga korekty.
      </p>
      <form onSubmit={onSubmit} className="grid gap-3 md:grid-cols-2">
        <InputField
          label="Gęstość początkowa (BRIX)"
          name="ob"
          step="0.01"
          placeholder="12"
          value={ob}
          onChange={(event) => setOb(event.target.value)}
        />
        <InputField
          label="Gęstość końcowa (BRIX)"
          name="fb"
          step="0.01"
          placeholder="6"
          value={fb}
          onChange={(event) => setFb(event.target.value)}
        />
        <button
          type="submit"
          className="md:col-span-2 rounded-xl bg-(--accent) px-4 py-3 font-semibold text-(--accent-contrast) transition hover:opacity-90"
        >
          Oblicz
        </button>
      </form>
      <ResultBlock title="Gęstość końcowa po korekcie" value={`${result} BLG`} />
    </div>
  );
}

const PRIMING_SUGAR_OPTIONS = [
  { value: "glucose", label: "Glukoza (dekstroza)" },
  { value: "sucrose", label: "Cukier (sacharoza)" },
];

function PrimingCalculator() {
  const [volume, setVolume] = useState("20");
  const [targetCo2, setTargetCo2] = useState("2.5");
  const [temperature, setTemperature] = useState("20");
  const [sugarType, setSugarType] = useState("glucose");
  const [result, setResult] = useState(() => calculatePrimingSugar(20, 2.5, 20, "glucose"));

  const onSubmit = (event) => {
    event.preventDefault();
    setResult(calculatePrimingSugar(Number(volume), Number(targetCo2), Number(temperature), sugarType));
  };

  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed text-(--text-muted)">
        Oblicz, ile cukru dodać do piwa przed rozlewem, aby uzyskać zamierzone nasycenie CO₂. Podaj najwyższą
        temperaturę, jaką piwo osiągnęło po zakończeniu fermentacji – od niej zależy, ile CO₂ jest już w nim
        rozpuszczone.
      </p>
      <form onSubmit={onSubmit} className="grid gap-3 md:grid-cols-2">
        <InputField
          label="Ilość piwa (L)"
          name="volume"
          step="0.1"
          placeholder="20"
          value={volume}
          onChange={(event) => setVolume(event.target.value)}
        />
        <InputField
          label="Docelowe nasycenie (vol CO₂)"
          name="targetCo2"
          step="0.1"
          placeholder="2.5"
          value={targetCo2}
          onChange={(event) => setTargetCo2(event.target.value)}
        />
        <InputField
          label="Temperatura piwa (°C)"
          name="temperature"
          step="0.5"
          placeholder="20"
          value={temperature}
          onChange={(event) => setTemperature(event.target.value)}
        />
        <SelectField
          label="Rodzaj cukru"
          name="sugarType"
          value={sugarType}
          onChange={(event) => setSugarType(event.target.value)}
          options={PRIMING_SUGAR_OPTIONS}
        />
        <button
          type="submit"
          className="md:col-span-2 rounded-xl bg-(--accent) px-4 py-3 font-semibold text-(--accent-contrast) transition hover:opacity-90"
        >
          Oblicz
        </button>
      </form>
      <div className="grid gap-3 md:grid-cols-3">
        <ResultBlock title="Ilość cukru" value={`${result.sugarTotal} g`} />
        <ResultBlock title="Na 1 L piwa" value={`${result.sugarPerLiter} g`} />
        <ResultBlock title="CO₂ obecny w piwie" value={`${result.residualCo2} vol`} />
      </div>
    </div>
  );
}

export default function Calculators() {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggle = (index) => {
    setActiveIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <div className="grid gap-4">
      <AccordionItem index={0} activeIndex={activeIndex} onToggle={toggle} title="Korekta gęstości brzeczki">
        <DilutionCalculator />
      </AccordionItem>
      <AccordionItem index={1} activeIndex={activeIndex} onToggle={toggle} title="Konwerter jednostek gęstości">
        <DensityConverter />
      </AccordionItem>
      <AccordionItem index={2} activeIndex={activeIndex} onToggle={toggle} title="Oblicz zawartość alkoholu w piwie">
        <AlcoholCalculator />
      </AccordionItem>
      <AccordionItem index={3} activeIndex={activeIndex} onToggle={toggle} title="Korekta odczytu refraktometru">
        <RefractometerCalculator />
      </AccordionItem>
      <AccordionItem index={4} activeIndex={activeIndex} onToggle={toggle} title="Cukier do refermentacji">
        <PrimingCalculator />
      </AccordionItem>
    </div>
  );
}
