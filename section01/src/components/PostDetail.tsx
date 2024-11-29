import { useQuery } from "@tanstack/react-query";

import "./PostDetail.css";
import { fetchComments } from "../api/api";

export function PostDetail({ post, deleteMutaion, updateMutation }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () => fetchComments(post.id),
    staleTime: 3000,
  });

  if (isLoading) return <div>로딩중</div>;
  if (isError) {
    return <div>에러</div>;
  }

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={() => deleteMutaion.mutate(post.id)}>Delete</button>{" "}
      {deleteMutaion.isPending && <p>삭제중</p>}
      {deleteMutaion.isError && <p>삭제실패{deleteMutaion.error.toString()}</p>}
      {deleteMutaion.isSuccess && <p>성공!</p>}
      <button onClick={() => updateMutation.mutate(post.id)}>
        Update title
      </button>
      {updateMutation.isPending && <p>수정중</p>}
      {updateMutation.isError && (
        <p>수정실패{updateMutation.error.toString()}</p>
      )}
      {updateMutation.isSuccess && <p>성공!</p>}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
