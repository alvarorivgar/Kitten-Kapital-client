import React, { useEffect, useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Peer from "simple-peer";
import io from "socket.io-client";

let socket;

function VideoCall() {
  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    initialiseSocket();
  }, []);

  const initialiseSocket = async () => {
    try {
      console.log(process.env.REACT_APP_SOCKET_URL);
      socket = await io.connect(process.env.REACT_APP_SOCKET_URL);
      console.log("socket", socket);
      const response = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      console.log(myVideo);
      myVideo.current.srcObject = response;

      setStream(response);

      const socketResponse = await socket.on("me");
      setMe(socketResponse.id);
      console.log(socketResponse.id);

      socket.on("callUser", (data) => {
        setReceivingCall(true);
        setCaller(data.from);
        setName(data.name);
        setCallerSignal(data.signal);
      });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(me);

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
      });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    stream.getTracks().forEach(function (track) {
      track.stop();
    });
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center pt-1 mt-1 m-1">
          <div className="col-md-6 col-sm-6 col-xl-6 col-lg-4 formulario">
            <div className="form-group text-center pt-3">
              <div className="form-group text-center pt-1">
                <h1>Kitten Kapital</h1>
              </div>
              <div className="container">
                <div className="video-container">
                  <div className="video">
                    <video
                      playsInline
                      muted
                      ref={myVideo}
                      autoPlay
                      style={{ width: "150px" }}
                    />
                  </div>
                  <div className="video">
                    {callAccepted && !callEnded ? (
                      <video
                        playsInline
                        ref={userVideo}
                        autoPlay
                        style={{ width: "150px" }}
                      />
                    ) : null}
                  </div>
                </div>
                <div className="form-group mx-sm-4 pt-3">
                  <input
                    className="form-control"
                    id="filled-basic"
                    label="Name"
                    variant="filled"
                    value={name}
                    placeholder="Introduce your name"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <CopyToClipboard
                    text={me}
                    // style={{ marginBottom: "2rem" }}
                  >
                    <div className="form-group mx-sm-4 pb-2 pt-3">
                      <button className="btn btn-block ingresar">
                        Copy ID
                      </button>
                    </div>
                  </CopyToClipboard>
                  <div className="form-group mx-sm-4 pt-1">
                    <input
                      className="form-control"
                      id="filled-basic"
                      label="ID to call"
                      variant="filled"
                      value={idToCall}
                      placeholder="Paste the code"
                      onChange={(e) => setIdToCall(e.target.value)}
                    />
                  </div>
                  <div className="form-group mx-sm-4 pb-2 pt-3">
                    {callAccepted && !callEnded ? (
                      <button
                        className="btn btn-block ingresar"
                        variant="contained"
                        onClick={leaveCall}
                      >
                        End Call
                      </button>
                    ) : (
                      <button
                        className="btn btn-block ingresar"
                        aria-label="call"
                        onClick={() => callUser(idToCall)}
                      >
                        Call
                      </button>
                    )}
                    {/* {idToCall} */}
                  </div>
                </div>
                <div>
                  {receivingCall && !callAccepted ? (
                    <div className="form-group mx-sm-4 pb-2 pt-3">
                      <p class="date-of-birth-text">{name} is calling...</p>
                      <button
                        className="btn btn-block ingresar"
                        variant="contained"
                        onClick={answerCall}
                      >
                        Answer
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoCall;
