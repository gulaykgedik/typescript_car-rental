import { FC, FormEvent, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Year: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [year, setYear] = useState<string>(searchParams.get("year") || "");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateURL();
  };

  const updateURL = () => {
    const newParams = new URLSearchParams(searchParams);

    searchParams.forEach((value, key) => {
      if (key !== "year") {
        newParams.set(key, value);
      }
    });

    if (year) {
      newParams.set("year", year);
    } else {
      newParams.delete("year");
    }

    navigate(`?${newParams.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="year">Yıl</label>

      <div className="flex">
        <input
          type="number"
          id="year"
          className="w-28 py-[6px] px-2 rounded-l-[4px] shadow text-black bg-white border-r border-zinc-200"
          placeholder="Yıl giriniz"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <button
          type="submit"
          className="bg-white rounded-r px-3 text-blue-500 hover:bg-zinc-200 transition cursor-pointer"
        >
          <img src="/search.svg" alt="search" className="size-[20px]" />
        </button>
      </div>
    </form>
  );
};

export default Year;
