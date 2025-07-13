import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "@/shared/components/Header";
import markerIcon from "@/features/market/assets/marker-primary.png";
import cameraIcon from "@/features/market/assets/camera.png";
import Button from "@/shared/components/Button";
import { createBoard } from "@/features/market/api/marketApi";
import Modal from "@/features/market/components/PostSuccesModal";

const CreatePost = () => {
  const { marketName } = useParams<{ marketName: string }>();
  const decodedMarketName = decodeURIComponent(marketName || "");
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [showModal, setShowModal] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files);
      if (images.length + selected.length <= 3) {
        setImages([...images, ...selected]);
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    images.forEach((image) => {
      formData.append("image", image);
    });

    try {
      await createBoard(marketName ?? "", formData);
      setShowModal(true);
    } catch (error) {
      console.error("글 작성 실패", error);
      alert("작성에 실패했습니다.");
    }
  };

  const handleModalConfirm = () => {
    setShowModal(false);
    const currentPath = location.pathname;
    const newPath = currentPath.replace(/\/write$/, "");
    navigate(newPath);
  };

  return (
    <div className="flex flex-col h-full">
      <Header title="글 작성하기" showBack={true} />

      <div className="px-[32px]">
        <div className="mt-[32px] text-primary text-body3 flex items-center gap-[4px] border border-primary rounded-[8px] px-[11px] py-[15px] w-full">
          <img src={markerIcon} alt="시장 마커" className="w-[12px]" />
          {decodedMarketName || "시장명"}
        </div>

        <input
          type="text"
          placeholder="제목을 입력해 주세요 (필수)"
          className="mt-[12px] text-body2 outline-none border border-grayLine rounded-[8px] px-[11px] py-[15px] w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="relative mt-[12px]">
          <textarea
            placeholder="방문하신 시장은 어떠셨나요?"
            className="text-body2 min-h-[220px] outline-none border border-grayLine rounded-[8px] px-[11px] py-[15px] w-full"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={200}
          />
          <span className="absolute bottom-[-15px] right-[8px] text-body3 text-subtext">
            {content.length} / 200
          </span>
        </div>

        <div className="flex mt-[41px] gap-[13px] justify-end">
          {images.map((image, idx) => (
            <div key={idx} className="relative w-[100px] h-[100px]">
              <img
                src={URL.createObjectURL(image)}
                alt={`preview-${idx}`}
                className="w-full h-full object-cover rounded-[8px]"
              />
              <button
                onClick={() => handleRemoveImage(idx)}
                className="absolute top-[-5px] right-[-6px] text-[10px] bg-black/70 text-white w-[17px] h-[17px] rounded-full"
              >
                ×
              </button>
            </div>
          ))}

          {images.length < 3 && (
            <label className="w-[100px] h-[100px] border border-grayLine rounded-[8px] flex justify-center items-center cursor-pointer bg-white shrink-0">
              <img src={cameraIcon} alt="카메라" className="w-[24px]" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                multiple
              />
            </label>
          )}
        </div>
      </div>

      <div className="w-full absolute bottom-[50px] flex justify-center px-[32px]">
        <Button
          variant="primary"
          className="text-subtitle1 w-full"
          disabled={!title.trim()}
          onClick={handleSubmit}
        >
          작성완료
        </Button>
      </div>

      {showModal && (
        <Modal
          title="작성 완료"
          description={`시장 이야기 목록에서\n내가 쓴 글을 확인할 수 있어요!`}
          onConfirm={handleModalConfirm}
        />
      )}
    </div>
  );
};

export default CreatePost;
