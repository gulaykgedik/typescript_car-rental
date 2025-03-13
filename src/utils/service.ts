import { Car } from "../types";

type ReturnType = {
  results: Car[];
  total_count: number;
};

interface FetchCarsParams {
  make?: string;
  model?: string;
  year?: string;
  page?: string;
}

export const fetchCars = async (
  params?: FetchCarsParams
): Promise<ReturnType> => {
  const baseUrl =
    "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/all-vehicles-model/records";
  const searchParams = new URLSearchParams();

  // Add refine parameters
  if (params?.make) {
    searchParams.append("refine", `make:"${params.make}"`);
  }

  if (params?.model) {
    searchParams.append("refine", `model:"${params.model}"`);
  }

  if (params?.year) {
    searchParams.append("refine", `year:"${params.year}"`);
  }

  // Add pagination
  const limit = 10;
  const offset = (parseInt(params?.page || "1") - 1) * limit;
  searchParams.append("limit", limit.toString());
  searchParams.append("offset", offset.toString());

  // Add sorting
  searchParams.append("order_by", "make,model");

  const finalUrl = `${baseUrl}?${searchParams.toString()}`;
  console.log("Fetching URL:", finalUrl);

  const res = await fetch(finalUrl);
  const data = await res.json();

  return data;
};
