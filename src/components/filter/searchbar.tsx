import { FC, useState, FormEvent } from "react";
import ReactSelect from "react-select";
import { makes } from "../../utils/constants";
import { useNavigate, useSearchParams } from "react-router-dom";

const Searchbar: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [make, setMake] = useState<string | null>(
    searchParams.get("make") || null
  );
  const [model, setModel] = useState<string>(searchParams.get("model") || "");

  const options = makes.map((make) => ({
    label: make,
    value: make,
  }));

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newParams = new URLSearchParams();

    searchParams.forEach((value, key) => {
      if (key !== "make" && key !== "model") {
        newParams.set(key, value);
      }
    });

    if (make) {
      newParams.set("make", make);
    }

    if (model && model.trim() !== "") {
      newParams.set("model", model);
    }

    newParams.set("page", "1");

    navigate(`?${newParams.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="searchbar flex gap-3 items-center justify-center"
    >
      <div className="searchbar-item items-end">
        <div className="w-full flex flex-col">
          <label htmlFor="">Marka</label>
          <ReactSelect
            className="w-full text-black"
            options={options}
            placeholder="Marka Seçiniz"
            value={make ? { label: make, value: make } : null}
            onChange={(option) => setMake(option ? option.value : null)}
            isClearable
          />
        </div>

        <button type="submit" className="ml-3 sm:hidden cursor-pointer">
          <img src="/search.svg" alt="search" className="size-[40px]" />
        </button>
      </div>

      <div className="searchbar-item flex flex-col !items-start">
        <div className="w-full flex flex-col">
          <label htmlFor="">Model</label>

          <div className="w-full flex">
            <div className="absolute ml-3 mt-1">
              <img src="/model-icon.png" alt="model" className="size-[25px]" />
            </div>
            <input
              type="text"
              className="searchbar-input rounded text-black bg-white"
              placeholder="Model yazınız..."
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
            <button type="submit" className="ml-3 cursor-pointer">
              <img src="/search.svg" alt="search" className="size-[40px]" />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Searchbar;
