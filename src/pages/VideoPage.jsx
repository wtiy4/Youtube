import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Nav from "../components/Nav";
import axios from "axios";
import { FaThumbsUp } from "react-icons/fa";
import { BsFillHandThumbsDownFill } from "react-icons/bs";

function VideoPage() {
  const { id } = useParams();
  const [videoData, setVideoData] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(5000);
  const [commentText, setCommentText] = useState("");

  const user = JSON.parse(localStorage.getItem("user")) || {
    id: null,
    username: "guest",
  };

  const [comments, setComments] = useState(() => {
    const stored = localStorage.getItem(`comments:${id}`);
    return stored
      ? JSON.parse(stored)
      : [
          {
            id: 1,
            username: "Alwaleed Alharbi",
            userId: "1",
            comment: "مسلسل منفوخ 👎🏻",
          },
          {
            id: 2,
            username: "Faisal Alharbi",
            userId: "2",
            comment: "😍رهيب خلصته في جلسة وحدة ",
          },
        ];
  });

  const myKey = "AIzaSyBj99eroGu1bPMnzbRaovIFHYlFZWOGE74";

  useEffect(() => {
    setLiked(false);
    setDisliked(false);

    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${id}&key=${myKey}`
      )
      .then((res) => {
        const video = res.data.items[0];
        setCurrentVideo(video);
        setLikes(Number(video.statistics.likeCount));
      });

    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=20&regionCode=US&key=${myKey}`
      )
      .then((res) => {
        setVideoData(res.data);
      });
  }, [id]);

  const giveLike = () => {
    if (liked) setLikes(likes - 1);
    else setLikes(likes + 1);

    if (disliked) {
      setDislikes(dislikes - 1);
      setDisliked(false);
    }

    setLiked(!liked);
  };

  const giveDislike = () => {
    if (disliked) setDislikes(dislikes - 1);
    else setDislikes(dislikes + 1);

    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
    }

    setDisliked(!disliked);
  };

  const addComment = () => {
    if (!commentText.trim()) return;
    const newComment = {
      id: Date.now(),
      username: user.username,
      userId: user.id,
      comment: commentText,
    };
    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);
    localStorage.setItem(`comments:${id}`, JSON.stringify(updatedComments));
    setCommentText("");
  };

  const handleDeleteComment = (commentId) => {
    const updated = comments.filter((item) => item.id !== commentId);
    setComments(updated);
    localStorage.setItem(`comments:${id}`, JSON.stringify(updated));
  };

  return (
    <>
      <Nav />
      <div className="flex h-screen w-full overflow-hidden">
        <div className="flex flex-col w-[70%] p-6 overflow-y-auto">
          {!currentVideo ? (
            <p className="text-white">..</p>
          ) : (
            <>
              <iframe
                className="rounded-xl mb-4"
                width="100%"
                height="700"
                src={`https://www.youtube.com/embed/${id}`}
                title="YouTube video player"
                allowFullScreen
              ></iframe>

              <div className="text-white">
                <h1 className="text-xl font-bold mb-2">
                  {currentVideo.snippet.title}
                </h1>
                <p className="text-sm text-gray-400 mb-1 font-bold cursor-pointer">
                  {currentVideo.snippet.channelTitle}
                </p>
                <p className="text-sm text-gray-400 mb-1">
                  {currentVideo.statistics.viewCount} views
                </p>

                <div className="flex gap-4 mt-3">
                  <button
                    onClick={giveLike}
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      liked
                        ? "bg-blue-600 text-white"
                        : "bg-gray-800 text-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-2 cursor-pointer">
                      {likes}
                      <FaThumbsUp />
                    </div>
                  </button>

                  <button
                    onClick={giveDislike}
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      disliked
                        ? "bg-red-900 text-white"
                        : "bg-gray-800 text-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-2 cursor-pointer">
                      {dislikes}
                      <BsFillHandThumbsDownFill />
                    </div>
                  </button>
                </div>

                <p className="text-sm text-gray-400 mt-4">
                  {currentVideo.snippet.description?.slice(0, 200)}...
                </p>

                {/* Comments Section */}
                <div className="mt-6">
                  <h2 className="text-lg font-bold mb-2">Comments</h2>

                  <div className="mb-4">
                    <textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="write a comment"
                      className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-700"
                    />
                    <button
                      onClick={addComment}
                      className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
                    >
                      send
                    </button>
                  </div>

                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="relative bg-white/5 p-3 rounded-lg text-white"
                      >
                        <p className="font-semibold">{comment.username}</p>
                        <p className="text-sm text-gray-300">
                          {comment.comment}
                        </p>
                        {String(comment.userId) === String(user.id) && (
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                            className="absolute top-2 right-2 text-xl cursor-pointer t hover:text-red-600"
                          >
                            X
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="w-[30%] bg-[#111] p-4 overflow-y-auto">
          {!videoData ? (
            <p className="text-white">wait</p>
          ) : (
            videoData.items.map((item) => (
              <Link
                to={`/video/${item.id}`}
                key={item.id}
                className="flex mb-4 gap-3 hover:bg-white/10 p-2 rounded-lg cursor-pointer"
              >
                <img
                  src={item.snippet.thumbnails.medium.url}
                  alt="thumbnail"
                  className="w-[160px] h-[90px] object-cover rounded-lg"
                />
                <div className="flex flex-col justify-between text-white">
                  <div className="text-sm font-semibold line-clamp-2">
                    {item.snippet.title}
                  </div>
                  <div className="text-xs text-gray-400">
                    {item.snippet.channelTitle}
                  </div>
                  <div className="text-xs text-gray-500">
                    {item.statistics.viewCount} views
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default VideoPage;
