import { Dispatch, SetStateAction } from "react";
import { DiscoverParams, useDiscoverMovie } from "../../apiCalls/movies";
import { useDiscoverSeries } from "../../apiCalls/series";
import { MOVIES_NAME, SERIES_NAME } from "../../constants";
import { serializeSearchResults } from "../../utils/serializeSearchResults";
import { useDataToSerieEntryList } from "./useSeriesEntryList";
import { ContentEntry } from "../../entities/ContentEntry";

export const useDiscoverContent = (setResults: Dispatch<SetStateAction<ContentEntry[]>>,
  setSearched: Dispatch<SetStateAction<boolean>>) => {
  const {discoverMovie, loading: loadingMovies} = useDiscoverMovie();
  const {discoverSeries, loading: loadingSeries} = useDiscoverSeries();
  const { toMovieListEntries, toSeriesListEntries } = useDataToSerieEntryList();
  const loading = loadingMovies || loadingSeries;

  const onSuccessSeries = (response: any) => {
    console.log('Busqueda exitosa: ');
    const parsedResponse = toSeriesListEntries(response.data);
    const serializedData = serializeSearchResults(parsedResponse, SERIES_NAME);
    setResults(serializedData);
    setSearched(true);
  }

  const onSuccessMovies = (response: any) => {
    console.log('Busqueda exitosa: ');
    const parsedResponse = toMovieListEntries(response.data);
    const serializedData = serializeSearchResults(parsedResponse, MOVIES_NAME);
    setResults(serializedData);
    setSearched(true);
  }

  const discover = (category: string, checkedGenres: number[], runtimeLte: number,
    runtimeGte: number, inMyPlatforms: boolean) => {
    const filters: DiscoverParams = {
      country: 'AR',
      page: 1,
      genderIds: checkedGenres.toString(),
      ...(runtimeLte !== -1 && { runtimeLte: runtimeLte }),
      runtimeGte: runtimeGte,
      inMyPlatforms: inMyPlatforms
    }
    if (category == MOVIES_NAME) {
      discoverMovie(filters, onSuccessMovies);
    } else {
      discoverSeries(filters, onSuccessSeries);
    }
  }

  return {discover, loading}
}