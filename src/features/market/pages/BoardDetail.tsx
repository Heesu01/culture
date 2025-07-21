import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { useSwipeable } from "react-swipeable";
import Header from "@/shared/components/Header";
import heartIcon from "@/features/market/assets/Heart.png";
import heartFilledIcon from "@/features/market/assets/heart-filled.png";
import markerIcon from "@/features/market/assets/marker-primary.png";
import profileIcon from "@/features/market/assets/profile.png";
import {
  getBoardDetail,
  getComments,
  postComment,
  likeBoard,
  unlikeBoard,
} from "@/features/market/api/marketApi";
import type {
  BoardDetail as BoardDetailType,
  Comment,
} from "@/features/market/types/market";

const BoardDetail = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const [post, setPost] = useState<BoardDetailType | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      setCurrentImageIndex((prev) =>
        post && prev < post.imageDataList.length - 1 ? prev + 1 : prev
      );
    },
    onSwipedRight: () => {
      setCurrentImageIndex((prev) => (post && prev > 0 ? prev - 1 : prev));
    },
    trackMouse: true,
  });

  const fetchPostAndComments = useCallback(async () => {
    if (!boardId) return;
    try {
      const [postRes, commentRes] = await Promise.all([
        getBoardDetail(boardId),
        getComments(boardId),
      ]);
      setPost(postRes.data.data);
      setComments(commentRes.data.data.commentList);
      setCurrentImageIndex(0);
    } catch (error) {
      console.error("게시글 또는 댓글 조회 실패", error);
    }
  }, [boardId]);

  useEffect(() => {
    fetchPostAndComments();
  }, [fetchPostAndComments]);

  const handleCommentSubmit = async () => {
    if (!boardId || !newComment.trim()) return;
    try {
      await postComment(boardId, newComment.trim());
      setNewComment("");
      const res = await getComments(boardId);
      setComments(res.data.data.commentList);
    } catch (error) {
      console.error("댓글 등록 실패", error);
    }
  };

  const handleLikeToggle = async () => {
    if (!boardId || !post) return;
    try {
      if (post.liked) {
        await unlikeBoard(boardId);
        setPost(
          (prev) =>
            prev && { ...prev, liked: false, likeCount: prev.likeCount - 1 }
        );
      } else {
        await likeBoard(boardId);
        setPost(
          (prev) =>
            prev && { ...prev, liked: true, likeCount: prev.likeCount + 1 }
        );
      }
    } catch (error) {
      console.error("좋아요 처리 실패", error);
    }
  };

  if (!post) return <div>로딩 중...</div>;

  return (
    <div className="flex flex-col min-h-[92vh] px-[32px]">
      <Header title="시장이야기" showBack={true} />

      <div className="flex flex-col mt-[32px]">
        <div className="flex items-center text-primary text-body3 mb-[4px]">
          <img src={markerIcon} alt="마커" className="w-[12px] mr-[6.5px]" />
          {post.marketName}
        </div>

        <h1 className="text-subtitle1 mb-[8px]">{post.title}</h1>

        <p className="text-body4 text-subtext">
          {post.author} ·{" "}
          {(() => {
            const [year, month, day] = post.createdAt.split(" ")[0].split("-");
            return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
          })()}
        </p>

        <div className="border-t border-grayLine mt-[20px] mb-[20px]" />

        {post.imageDataList.length > 0 && (
          <div className="w-full rounded-[12px] overflow-hidden mb-[20px] relative">
            <div className="relative w-full aspect-[4/3]" {...swipeHandlers}>
              <img
                src={post.imageDataList[currentImageIndex].imageUrl}
                alt={`이미지 ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute right-[15px] bottom-[15px] bg-black/60 text-white px-[10px] py-[7px] rounded-[8px] text-[12px]">
                {currentImageIndex + 1} / {post.imageDataList.length}
              </div>
            </div>
          </div>
        )}

        <p className="text-body2 text-text mb-[12px]">{post.content}</p>

        <button
          className="flex items-center gap-[4.5px] text-primary text-body3"
          onClick={handleLikeToggle}
        >
          <img
            src={post.liked ? heartFilledIcon : heartIcon}
            alt="좋아요"
            className="w-[16px]"
          />
          <span>{post.likeCount}</span>
        </button>
      </div>

      <div className="border-t border-grayLine mt-[20px]" />

      <div className="flex flex-col mt-[20px] mb-[40px]">
        <p className="text-body1 mb-[12px]">댓글 {comments.length}</p>
        <div className="w-full mb-[20px] flex gap-[8px]">
          <input
            type="text"
            placeholder="댓글 작성하기"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 rounded-[8px] p-[12px] text-[16px] bg-grayBg outline-0"
          />
          <button
            onClick={handleCommentSubmit}
            className="px-[16px] py-[12px] bg-primary text-white rounded-[8px] text-body2"
          >
            등록
          </button>
        </div>

        {[...comments].reverse().map((comment) => (
          <div
            key={comment.commentId}
            className="flex items-start gap-[15px] mb-[12px]"
          >
            <img src={profileIcon} alt="프로필" className="w-[32px]" />
            <div className="flex flex-col">
              <p className="text-body4 text-subtext mb-[4px]">
                {comment.userId}
              </p>
              <p className="text-body2 text-text">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardDetail;
