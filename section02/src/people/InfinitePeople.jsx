import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Person } from "./Person";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ["sw-people"],
      queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam),
      getNextPageParam: (lastPage) => {
        return lastPage.next || undefined;
      },
    });

  if (isLoading) return <div className="loading">로딩중</div>;
  if (isError) {
    return (
      <div className="loading">에러 발생: 데이터를 불러오지 못했습니다.</div>
    );
  }

  return (
    <>
      {isFetching && <div className="loading">로딩중...</div>}
      <InfiniteScroll
        initialLoad={false}
        loadMore={() => {
          if (!isFetching) {
            fetchNextPage();
          }
        }}
        hasMore={hasNextPage}
      >
        {data.pages.map((pageData, i) => (
          <div key={i}>
            {pageData.results.map(
              (
                person // 수정: result → results
              ) => (
                <Person
                  key={person.name}
                  name={person.name}
                  hairColor={person.hair_color}
                  eyeColor={person.eye_color}
                />
              )
            )}
          </div>
        ))}
      </InfiniteScroll>
    </>
  );
}
