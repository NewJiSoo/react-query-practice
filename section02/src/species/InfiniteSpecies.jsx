import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Species } from "./Species";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ["sw-species"],
      queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam),
      getNextPageParam: (lastPage) => {
        return lastPage.next || undefined;
      },
    });

  if (isLoading) return <div className="loading">로딩중</div>;
  if (isError) return <div className="loading">에러</div>;

  return (
    <>
      {isFetching && <div className="loading">로딩중</div>}
      <InfiniteScroll
        initialLoad={false}
        loadMore={() => {
          if (!isFetching) fetchNextPage();
        }}
        hasMore={hasNextPage}
      >
        {data.pages.map((pageData) => {
          return pageData.results.map((species) => {
            return (
              <Species
                key={species.name}
                name={species.name}
                language={species.language}
                averageLifespan={species.averageLifespan}
              />
            );
          });
        })}
      </InfiniteScroll>
    </>
  );
}
