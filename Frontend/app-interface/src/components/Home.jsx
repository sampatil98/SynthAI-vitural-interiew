import React, { useState, useEffect } from 'react';
import './Home.css';

const Home = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  

  useEffect(() => {
    getQuestion();
    
  }, []);

  const handleStartClick = () => {
    console.log('clicked');
    getQuestion();
  };

  const handleStopClick = () => {
    recognition.stop();
  };

  const handleSpeak = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
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
      console.log(transcript);
    };

    recognition.onerror = (event) => {
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

  const getQuestion = () => {
    fetch('http://localhost:8080/getQuestion')
      .then((res) => res.json())
      .then((data) => {
        setQuestion(data.question);
      
      });
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!transcript) return;

    const obj = {
      prompt: question,
      studentAnswer: transcript,
    };

    fetch('http://localhost:8080/submit-ans', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((data) => {
        setAnswer(data.data);
        setTranscript(transcript);
        getQuestion();
      });
  };

  let recognition = null;
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = true;

    recognition.onresult = (event) => {
      const currentTranscript =
        event.results[event.results.length - 1][0].transcript;
      setTranscript(currentTranscript);
    };
    console.log(transcript);
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };
  } else {
    console.error('Speech recognition is not supported in this browser.');
  }

  return (
    <div id="main">
      <h1>welcome to virtual-interview</h1>
      <div id="container">
        {question && <h3>{question}</h3>}
       
        {answer && (
          <div className="each-div">
            <h6 className="ans">{answer}</h6>

          </div>
        )}
      </div>

      <div id="button">
        <button id="start" onClick={handleStartClick}>
          Start
        </button>
        <button id="end" onClick={handleStopClick} disabled>
          End
        </button>
      </div>

      <form name="dataform" id="form">
        <input
          type="text"
          className="words"
          id="inputtext"
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
        />
        <button
          type="button"
          id="startButton"
          onClick={handleSpeak}
          disabled={!question}
        >
          Speak
        </button>
        <button type="button" id="stopButton" onClick={handleStopClick} disabled>
          Stop
        </button>
        <button id="btn" onClick={handleSend} disabled={!transcript}>
          Send
        </button>
      </form>
    </div>
  );
};

export default Home;
