import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  const [api, setApi] = useState(null);

  useEffect(() => {
    const url =
      "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=24&regionCode=US&key=AIzaSyBj99eroGu1bPMnzbRaovIFHYlFZWOGE74";

    axios.get(url).then((data) => {
      setApi(data.data);
    });
  }, []);

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen text-white bg-[#1b2439]">
       <div className="flex flex-row-reverse">
        <aside className="bg-gray-900 w-full md:w-[250px] p-4 space-y-3">
          {[
            "الصفحة الرئيسية",
            "Shorts",
            "الاشتراكات",
            "السجل",
            "قوائم التشغيل",
            "فيديوهاتك",
            "دوراتك التدريبية",
            "المشاهدة لاحقاً",
            "الفيديوهات التي أعجبتني",
            "مقاطعك",
          ].map((item, index) => (
            <div
              key={index}
              className="p-3 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition text-right"
            >
              {item}
            </div>
          ))}
        </aside>

        {/* Videos */}
        <main className="flex-1 p-4 flex flex-wrap justify-center gap-6 overflow-y-auto">
          {api?.items?.map((item) => (
            <Link to={`/video/${item.id}`} key={item.id}>
              <div className="w-[300px] md:w-[340px] lg:w-[380px] border border-white/20 rounded-2xl shadow p-3 bg-white/10 hover:brightness-110 transition cursor-pointer">
                <img
                  src={item.snippet.thumbnails.high.url}
                  alt="thumbnail"
                  className="w-full h-[150px] object-cover rounded-lg mb-2"
                />
                <div className="flex items-center gap-2">
                  <img
                    src={item.snippet.thumbnails.default.url}
                    alt="channel"
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm line-clamp-2">
                      {item.snippet.title}
                    </span>
                    <span className="text-xs text-gray-300">
                      {item.snippet.channelTitle}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </main>
      </div>
    </div>
  );
}

export default Hero;
