import React, { useEffect, useRef } from "react";
import useAudioRecorder from "../hooks/useAudioRecorder.js";
const AudioRecorder = ({ permission, setPermission }) => {
  const {
    // permission,
    recordingStatus,
    audioURL,
    error,
    requestPermission,
    startRecording,
    stopRecording,
    clearRecording,
    handleStart,
  } = useAudioRecorder({ permission, setPermission });

  const audioRef = useRef(null);

  useEffect(() => {
    if (permission) {
      setTimeout(() => {
        // startRecording();
        handleStart()
      }, 500);
    }
  }, [permission]);

  return (
    <div className=" flex flex-col justify-center items-center max-w-md mx-auto">
      {!permission && (
        <button
          onClick={() => {
            requestPermission();
            setPermission(true);
          }}
          className="absolute right-5 bottom-20 bg-green-800 rounded-full hover:bg-green-900 text-white font-medium  p-3 h-16 w-16 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
        >
          Start
        </button>
      )}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-4 text-red-700">
          {error}
        </div>
      )}

      {permission && (
        <div className="space-y-4">
          <button
            onClick={stopRecording}
            disabled={recordingStatus !== "recording"}
            className={`${
              recordingStatus !== "recording"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            } absolute right-5 bottom-20 text-white font-medium rounded-full h-16 w-16 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition`}
          >
            Stop
          </button>

          {audioURL && (
            <div className="fixed inset-0 flex items-center justify-center z-50  bg-opacity-40 backdrop-blur-sm">
              <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
                <div className="mb-4">
                  <audio
                    ref={audioRef}
                    controls
                    src={audioURL}
                    className="w-full rounded-md focus:outline-none"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      clearRecording()
                      setPermission(false);
                      // audioRef.current = null
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-md hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  >
                    Clear Recording
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
