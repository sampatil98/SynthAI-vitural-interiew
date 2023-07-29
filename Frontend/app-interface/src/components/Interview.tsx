import React, { useState ,useRef} from 'react';

const Interview= () => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
//   const recognitionRef = useRef<null | SpeechRecognition >(null);
  const handleStartListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event:any) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const transcript = result[0].transcript;

        if (result.isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript = transcript;
        }
      }

      setTranscript(finalTranscript + interimTranscript);
    };

    recognition.onerror = (event:any) => {
      console.error('Speech recognition error:', event.error);
    };

    recognition.onend = () => {
      if (isListening) {
        // Restart recognition if continuous listening is enabled
        recognition.start();
      }
    };

    recognition.start();
    setIsListening(true);
  };


  const handleStopListening = () => {
    // if (recognitionRef.current) {
    //   recognitionRef.current.stop();
      setIsListening(false);
    // }
  }
  console.log(transcript)
  return (
    <div className="flex gap-30%   h-screen" >
    

      {/* Interview Container */}
     
    <div className="flex items-center pl-8 justify-center h-screen">
      <div className="border rounded-lg p-4 w-96">
        {/* Speech Text Container */}
        <div className="bg-gray-200 p-2 rounded-lg mb-4">
          {transcript}
        </div>

        {/* Input Box */}
        <div className="mb-4">
          <input type="text" placeholder="Enter text here" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        {/* Start Button */}
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full mb-2">Start</button>

        {/* Speak and Stop Buttons */}
        <div className="flex justify-end">
          <button onClick={handleStartListening} className="bg-green-500 text-white px-3 py-1 rounded-lg mr-2">Speak</button>
          <button onClick={handleStopListening} className="bg-red-500 text-white px-3 py-1 rounded-lg">Stop</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Interview;
