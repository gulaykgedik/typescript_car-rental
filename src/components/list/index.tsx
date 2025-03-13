import { FC, useEffect, useState } from "react";
import { fetchCars } from "../../utils/service";
import { Car } from "../../types";
import Warning from "../warning";
import Card from "./card";
import { useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";

const List: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cars, setCars] = useState<Car[] | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const make = searchParams.get("make");
    const model = searchParams.get("model");
    const year = searchParams.get("year");
    const page = searchParams.get("page") || "1";

    const filterParams = {
      ...(make && { make }),
      ...(model && { model }),
      ...(year && { year }),
      page,
    };

    fetchCars(filterParams)
      .then((data) => {
        setCars(data.results);
        setTotal(data.total_count);
      })
      .catch((err) => setError(err.message));
  }, [searchParams]);

  if (!cars) return <Warning>Yükleniyor</Warning>;

  if (error) return <Warning>{error}</Warning>;

  if (!cars || cars.length < 1) return <Warning>Veri Bulunamadı</Warning>;

  const currentPage = searchParams.get("page") || "1";

  return (
    <div className="padding-x max-width">
      <section className="home-cars-wrapper">
        {cars.map((car) => (
          <Card key={car.id} car={car} />
        ))}
      </section>

      {total && (
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          previousLabel="<"
          initialPage={parseInt(currentPage) - 1}
          onPageChange={(e) => {
            const newParams = new URLSearchParams(searchParams);
            newParams.set("page", (e.selected + 1).toString());
            setSearchParams(newParams);
          }}
          pageCount={Math.ceil(total / 10)}
          pageRangeDisplayed={5}
          renderOnZeroPageCount={null}
          containerClassName="pagination"
        />
      )}
    </div>
  );
};

export default List;
