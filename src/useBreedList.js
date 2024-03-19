import { useQuery } from "@tanstack/react-query";
import fetchBreedList from "./fetchBreedList";

export default function useBreedList(animal) {
  const results = useQuery(["breeds", animal], () =>
    fetchBreedList({ querykey: ["breeds", animal] })
  );
  return [results?.data?.breeds ?? [], results.status];
}
