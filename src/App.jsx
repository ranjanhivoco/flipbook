import React, { useCallback, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import Draggable from "react-draggable";
import AudioRecorder from "./components/AudioRecorder";
import { ChevronLeft, ChevronRight, Fullscreen, Minus, Plus, Volume2, VolumeX } from "lucide-react";

const App = () => {
  const bookRef = useRef();
  const audioRef = useRef();
  const divRef = useRef();
  const videoRef = useRef();

  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(2);
  const [permission, setPermission] = useState(false);
  const [totalPages, setTotalPages] = useState(10);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [visibleTooltip, setVisibleTooltip] = useState(null);
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);

  console.log(videoIsPlaying, "videoIsPlaying");

  const audiosArray = [
    "https://videoforinteractivedemons.s3.ap-south-1.amazonaws.com/bank_audio/pre-retirement.mp3",
    "https://videoforinteractivedemons.s3.ap-south-1.amazonaws.com/bank_audio/retirement.mp3",
  ];

  const pages = [
    {
      src: "/images/1.jpg",
      coordinates: [
        { x: 98, y: 20, label: "offer", description: "offer seems good" },
        { x: 90, y: 30, label: "x", description: "y" },
        // { x: 90, y: 21,label:"x",description:"y" },
      ],
    },
    {
      src: "/images/2.jpg",
      coordinates: [
        { x: 33, y: 67, label: "x", description: "y" },
        { x: 45, y: 12, label: "x", description: "y" },
        { x: 89, y: 44, label: "x", description: "y" },
      ],
    },
    {
      src: "/images/3.jpg",
      coordinates: [
        { x: 33, y: 67, label: "x", description: "y" },
        { x: 45, y: 12, label: "x", description: "y" },
        { x: 89, y: 44, label: "x", description: "y" },
      ],
    },
    {
      src: "/images/4.jpg",
      coordinates: [
        { x: 33, y: 67, label: "x", description: "y" },
        { x: 45, y: 12, label: "x", description: "y" },
        { x: 89, y: 44, label: "x", description: "y" },
      ],
    },
    {
      src: "/images/5.jpg",
      coordinates: [
        { x: 33, y: 67, label: "x", description: "y" },
        { x: 45, y: 12, label: "x", description: "y" },
        { x: 89, y: 44, label: "x", description: "y" },
      ],
    },
    {
      src: "/images/6.jpg",
      coordinates: [
        { x: 33, y: 67, label: "x", description: "y" },
        { x: 45, y: 12, label: "x", description: "y" },
        { x: 89, y: 44, label: "x", description: "y" },
      ],
    },
    {
      src: "/images/7.jpg",
      coordinates: [
        { x: 33, y: 67, label: "x", description: "y" },
        { x: 45, y: 12, label: "x", description: "y" },
        { x: 89, y: 44, label: "x", description: "y" },
      ],
    },
    {
      src: "/images/8.jpg",
      coordinates: [
        { x: 33, y: 67, label: "x", description: "y" },
        { x: 45, y: 12, label: "x", description: "y" },
        { x: 89, y: 44, label: "x", description: "y" },
      ],
    },
  ];

  const onFlip = useCallback(
    (e) => {
      console.log("Current page: " + e.data);
      if (!audioRef.current) return;
      audioRef.current.src = audiosArray[currentAudioIndex];
      setCurrentAudioIndex(currentAudioIndex === 0 ? 1 : 0);
      audioRef.current.play();
      setIsPlaying(true);
    },
    [currentAudioIndex]
  );

  const handleZoomIn = () => {
    setZoomLevel(Math.min(zoomLevel + 0.1, 1.5));
  };

  const handleZoomOut = () => {
    setZoomLevel(Math.max(zoomLevel - 0.1, 0.8));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      divRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
      // Reset the audio to the beginning
      // audioRef.current.currentTime = 0;
    } else {
      // Play the audio
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleTooltip = (pageIndex, pointIndex) => {
    const tooltipId = `${pageIndex}-${pointIndex}`;
    if (visibleTooltip === tooltipId) {
      setVisibleTooltip(null);
    } else {
      setVisibleTooltip(tooltipId);
    }
  };

  const toggleVideoPlayBack = () => {
    if (!videoRef.current) return;

    if (videoIsPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setVideoIsPlaying(!videoIsPlaying);
  };

  return (
    <>
      <div className="fixed min-h-screen w-full flex flex-col items-center justify-center">
        <div className="w-full max-w-5xl ">
          <div
            ref={divRef}
            className="relative bg-teal-600 flex flex-col items-center justify-center  pb-10"
          >
            <div
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: "center",
              }}
              className="transition-transform duration-300 ease-out self-center w-full h-full relative flex justify-center select-none mx-4 md:m-0"
              // className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 ease-out select-none inset-0 flex items-center justify-center p-8"
            >
              <HTMLFlipBook
                height={400}
                width={400}
                size="stretch"
                minWidth={300}
                maxWidth={500}
                minHeight={400}
                maxHeight={600}
                mobileScrollSupport={true}
                onFlip={onFlip}
                flippingTime={500}
                ref={bookRef}
                startPage={0}
                autoSize={true}
                showPageCorners={true}
              >
                {pages.map((page, index) => (
                  <div
                    key={index}
                    // className="page relative flex items-center justify-center"
                    className="bg-white overflow-hidden relative w-full h-full self-center flex justify-center"
                  >
                    <img
                      src={page.src}
                      alt={page.alt}
                      className="w-auto h-full object-contain"
                      // className="max-w-full max-h-full object-contain rounded-lg transition-transform duration-100 ease-in-out"
                    />

                    {page.coordinates.map((coordinate, pointIndex) => (
                      <div key={pointIndex}>
                        <button
                          style={{
                            left: `${coordinate.x}%`,
                            top: `${coordinate.y}%`,
                          }}
                          onClick={toggleVideoPlayBack}
                          className="absolute w-6 h-6 bg-blue-500 animate-pulse hover:bg-red-600 rounded-full flex items-center justify-center text-white transform -translate-x-1/2 -translate-y-1/2 border-2 border-white shadow-md"
                        >
                          <span className="text-xs font-bold">
                            {pointIndex + 1}
                          </span>
                        </button>

                        {/* {visibleTooltip === `${index}-${pointIndex}` && (
                          <div
                            className="absolute z-10 bg-white p-3 rounded shadow-lg max-w-xs"
                            style={{
                              left: `${
                                coordinate.x > 50
                                  ? coordinate.x - 5
                                  : coordinate.x + 5
                              }%`,
                              top: `${
                                coordinate.y > 50
                                  ? coordinate.y - 5
                                  : coordinate.y + 5
                              }%`,
                              transform: `translate(${
                                coordinate.x > 50 ? "-100%" : "0"
                              }, ${coordinate.y > 50 ? "-100%" : "0"})`,
                            }}
                          >
                            <h3 className="font-bold text-lg mb-1">
                              {coordinate.label}
                            </h3>
                            <p className="text-sm">{coordinate.description}</p>
                          </div>
                        )} */}
                      </div>
                    ))}
                  </div>
                ))}
              </HTMLFlipBook>
            </div>

            {/* <div className="bottom-0 left-0 right-0 bg-white text-black max-w-3/5 p-4"> */}
            <div className="absolute bottom-0 w-full  bg-gray-800  flex items-center justify-center gap-2 md:gap-4  mx-4 ">
              <button
                onClick={() => {
                  bookRef.current.pageFlip().flipPrev();
                  setCurrentPage(
                    currentPage > 0 ? currentPage - 2 : currentPage
                  );
                }}
                className="text-white p-3 hover:bg-gray-700"
                aria-label="Previous page"
              >
                <ChevronLeft size={28} />
              </button>

              <button
                onClick={handleZoomOut}
                className="text-white p-3 hover:bg-gray-700"
                aria-label="Zoom out"
              >
                <Minus size={28} />
              </button>

              <div className="hidden md:flex justify-center items-center gap-2 ">
                <div className="text-white w-24">
                  Page {currentPage} / {totalPages}
                </div>
              </div>

              <button
                onClick={handleZoomIn}
                className="text-white p-3 hover:bg-gray-700"
                aria-label="Zoom out"
              >
                <Plus size={28} />
              </button>

              <button
                onClick={() => {
                  bookRef.current.pageFlip().flipNext();
                  setCurrentPage(
                    currentPage < totalPages ? currentPage + 2 : currentPage
                  );
                }}
                className="text-white p-3 hover:bg-gray-700"
                aria-label="Next page"
              >
                <ChevronRight size={28} />
              </button>

              <button
                onClick={toggleFullscreen}
                className="text-white p-3 hover:bg-gray-700"
                aria-label="Full screen"
              >
                <Fullscreen size={28} />
              </button>

              <button
                className="p-3"
                aria-label={isPlaying ? "Mute Audio" : "Play Audio"}
                onClick={toggleAudio}
              >
                {isPlaying ? (
                  <Volume2 color="white" size={24} />
                ) : (
                  <VolumeX color="white" size={24} />
                )}
              </button>
            </div>
          </div>
        </div>

        <audio ref={audioRef} className="hidden">
          <source type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>

        {/* <div className=" "> */}
        <AudioRecorder permission={permission} setPermission={setPermission} />
        {/* </div> */}

        <div
          className={`absolute left-0 w-[20vw]  top-1/2 -translate-y-1/2  rounded-lg shadow-lg
            ${videoIsPlaying ? "opacity-100" : "opacity-0"}
            `}
        >
          <video ref={videoRef} src="/videos/video.mp4"></video>
        </div>
      </div>
    </>
  );
};

export default App;
