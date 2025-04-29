import React, { useCallback, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import Draggable from 'react-draggable';
import AudioRecorder from "./components/AudioRecorder";
import { Volume2, VolumeX } from 'lucide-react';


const App = () => {
  const bookRef = useRef();
  const audioRef = useRef();
  const divRef=useRef();
  const videoRef=useRef();


  
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(2);
  const [permission, setPermission] = useState(false);
  const [totalPages, setTotalPages] = useState(10);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [visibleTooltip, setVisibleTooltip] = useState(null);
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);


  console.log(videoIsPlaying,'videoIsPlaying');






  const audiosArray = [
    "https://videoforinteractivedemons.s3.ap-south-1.amazonaws.com/bank_audio/pre-retirement.mp3",
    "https://videoforinteractivedemons.s3.ap-south-1.amazonaws.com/bank_audio/retirement.mp3",
  ];

  const pages = [
    {
      src: "/images/1.jpg",
      coordinates: [
        { x: 98, y: 20,label:"offer",description:"offer seems good" },
        { x: 90, y: 30,label:"x",description:"y" },
        // { x: 90, y: 21,label:"x",description:"y" },
      ],
    },
    {
      src: "/images/2.jpg",
      coordinates: [
        { x: 33, y: 67,label:"x",description:"y" },
        { x: 45, y: 12,label:"x",description:"y" },
        { x: 89, y: 44 ,label:"x",description:"y"},
      ],
    },
    {
      src: "/images/3.jpg",
      coordinates: [
        { x: 33, y: 67,label:"x",description:"y" },
        { x: 45, y: 12,label:"x",description:"y" },
        { x: 89, y: 44 ,label:"x",description:"y"},
      ],
    },
    {
      src: "/images/4.jpg",
      coordinates: [
        { x: 33, y: 67,label:"x",description:"y" },
        { x: 45, y: 12,label:"x",description:"y" },
        { x: 89, y: 44 ,label:"x",description:"y"},
      ],
    },
    {
      src: "/images/5.jpg",
      coordinates: [
        { x: 33, y: 67,label:"x",description:"y" },
        { x: 45, y: 12,label:"x",description:"y" },
        { x: 89, y: 44 ,label:"x",description:"y"},
      ],
    },
    {
      src: "/images/6.jpg",
      coordinates: [
        { x: 33, y: 67,label:"x",description:"y" },
        { x: 45, y: 12,label:"x",description:"y" },
        { x: 89, y: 44 ,label:"x",description:"y"},
      ],
    },
    {
      src: "/images/7.jpg",
      coordinates: [
        { x: 33, y: 67,label:"x",description:"y" },
        { x: 45, y: 12,label:"x",description:"y" },
        { x: 89, y: 44 ,label:"x",description:"y"},
      ],

    },
    {
      src: "/images/8.jpg",
      coordinates: [
        { x: 33, y: 67,label:"x",description:"y" },
        { x: 45, y: 12,label:"x",description:"y" },
        { x: 89, y: 44 ,label:"x",description:"y"},
      ],
    },
  ];

  const onFlip = useCallback(
    (e) => {
      console.log("Current page: " + e.data);
      if(!audioRef.current) return
      audioRef.current.src = audiosArray[currentAudioIndex];
      setCurrentAudioIndex(currentAudioIndex === 0 ? 1 : 0);
      audioRef.current.play();
      setIsPlaying(true)
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
              className="transition-transform duration-300 self-center relative"
            >
              <HTMLFlipBook
                width={400}
                height={600}
                size="stretch"
                minWidth={300}
                maxWidth={500}
                minHeight={500}
                maxHeight={600}
                maxShadowOpacity={0}
                showCover={false}
                mobileScrollSupport={true}
                onFlip={onFlip}
                ref={bookRef}
                className=""
                startPage={0}
                usePortrait={false}
                useMouseEvents={false}
                showPageCorners={true}
                disableFlipByClick={false}
              >
                {pages.map((page, index) => (
                  <div
                    key={index}
                    className="bg-white overflow-hidden relative"
                  >
                    <img
                      src={page.src}
                      alt={page.alt}
                      className="w-full h-full object-cover"
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

            <div className="absolute bottom-0 w-full  bg-gray-800  flex items-center justify-center gap-4">
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <button
                onClick={handleZoomOut}
                className="text-white p-3 hover:bg-gray-700"
                aria-label="Zoom out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 12H4"
                  />
                </svg>
              </button>

              <div className=" flex justify-center items-center gap-2 ">
                <div className="text-white w-24">
                  Page {currentPage} / {totalPages}
                </div>
              </div>

              <button
                onClick={handleZoomIn}
                className="text-white p-3 hover:bg-gray-700"
                aria-label="Zoom out"
              >
                <svg
                  stroke="#fff"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="12"
                    y1="5"
                    x2="12"
                    y2="19"
                    stroke="#fff"
                    stroke-width="2"
                  />
                  <line
                    x1="5"
                    y1="12"
                    x2="19"
                    y2="12"
                    stroke="#fff"
                    stroke-width="2"
                  />
                </svg>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <button
                onClick={toggleFullscreen}
                className="text-white p-3 hover:bg-gray-700"
                aria-label="Full screen"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
                  />
                </svg>
              </button>

              <button
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
