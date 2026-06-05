import React from "react";
import { spotData, spotsOrder } from "./constants";

interface MapBackgroundProps {
  activeSpotId: number | null;
  isExiting: boolean;
  clearHideBuffer: (id: number) => void;
  startHideBuffer: () => void;
  setHoveredSpotId: (id: number | null) => void;
}

export default function MapBackground({
  activeSpotId,
  isExiting,
  clearHideBuffer,
  startHideBuffer,
  setHoveredSpotId,
}: MapBackgroundProps) {
  return (
    <div className="map-background-container">
      <svg id="map-mockup-svg" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M-50,260 C250,380 500,240 800,320 T1450,220"
          fill="none"
          stroke="#bce4f4"
          strokeWidth="36"
          strokeLinecap="round"
        />
        <path
          d="M-50,260 C250,380 500,240 800,320 T1450,220"
          fill="none"
          stroke="#d5f1fe"
          strokeWidth="24"
          strokeLinecap="round"
        />
        <path
          d="M 800,100 L 920,80 L 940,160 L 820,180 Z"
          fill="#d5edd5"
          stroke="#bfebb3"
          strokeWidth="1.2"
        />
        <path
          d="M 60,420 L 160,400 L 180,480 L 80,500 Z"
          fill="#d5edd5"
          stroke="#bfebb3"
          strokeWidth="1.2"
        />
        <path
          d="M 120,60 L 220,50 L 240,130 L 140,140 Z"
          fill="#d5edd5"
          stroke="#bfebb3"
          strokeWidth="1.2"
        />
        <line
          x1="0"
          y1="120"
          x2="2000"
          y2="120"
          stroke="#dfcbb8"
          strokeWidth="10"
        />
        <line
          x1="0"
          y1="120"
          x2="2000"
          y2="120"
          stroke="#fbe8d1"
          strokeWidth="6"
        />
        <line
          x1="74%"
          y1="0"
          x2="74%"
          y2="2000"
          stroke="#dfcbb8"
          strokeWidth="12"
        />
        <line
          x1="74%"
          y1="0"
          x2="74%"
          y2="2000"
          stroke="#fbeed8"
          strokeWidth="8"
        />
        <line
          x1="60%"
          y1="0"
          x2="90%"
          y2="1000"
          stroke="#d5dbd6"
          strokeWidth="8"
        />
        <line
          x1="60%"
          y1="0"
          x2="90%"
          y2="1000"
          stroke="#ffffff"
          strokeWidth="4"
        />
        <line
          x1="0"
          y1="620"
          x2="2000"
          y2="480"
          stroke="#dfcbb8"
          strokeWidth="8"
        />
        <line
          x1="0"
          y1="620"
          x2="2000"
          y2="480"
          stroke="#fbeed8"
          strokeWidth="5"
        />
        <line
          x1="20%"
          y1="0"
          x2="20%"
          y2="2000"
          stroke="#ffffff"
          strokeWidth="4.5"
        />
        <line
          x1="45%"
          y1="0"
          x2="45%"
          y2="2000"
          stroke="#ffffff"
          strokeWidth="4.5"
        />
        <line
          x1="0"
          y1="360"
          x2="2000"
          y2="360"
          stroke="#ffffff"
          strokeWidth="4.5"
        />
        <line
          x1="0"
          y1="780"
          x2="2000"
          y2="780"
          stroke="#ffffff"
          strokeWidth="4.5"
        />
        <line
          x1="120"
          y1="120"
          x2="80"
          y2="500"
          stroke="#ffffff"
          strokeWidth="2.5"
        />
        <line
          x1="15%"
          y1="15%"
          x2="25%"
          y2="50%"
          stroke="#ffffff"
          strokeWidth="2.5"
        />
        <line
          x1="74%"
          y1="360"
          x2="95%"
          y2="760"
          stroke="#ffffff"
          strokeWidth="2.5"
        />
        <text
          x="450"
          y="302"
          fill="#588ea2"
          fontFamily="'DM Sans', sans-serif"
          fontSize="10.5"
          fontWeight="700"
          letterSpacing="0.1em"
          transform="rotate(11, 450, 302)"
        >
          PASIG RIVER
        </text>
        <text
          x="76%"
          y="150"
          fill="#9d7658"
          fontFamily="'DM Sans', sans-serif"
          fontSize="9"
          fontWeight="700"
          letterSpacing="0.08em"
        >
          C-5 HIGHWAY
        </text>
        <text
          x="300"
          y="112"
          fill="#9d7658"
          fontFamily="'DM Sans', sans-serif"
          fontSize="9"
          fontWeight="700"
          letterSpacing="0.08em"
        >
          SHAW BOULEVARD
        </text>
        <text
          x="80.5%"
          y="280"
          fill="#819684"
          fontFamily="'DM Sans', sans-serif"
          fontSize="11"
          fontWeight="700"
          letterSpacing="0.15em"
        >
          ORTIGAS CENTER
        </text>
        <text
          x="10%"
          y="300"
          fill="#819684"
          fontFamily="'DM Sans', sans-serif"
          fontSize="11"
          fontWeight="700"
          letterSpacing="0.15em"
        >
          KAPITOLYO
        </text>
        <text
          x="10.5%"
          y="415"
          fill="#a0b8a4"
          fontFamily="'DM Sans', sans-serif"
          fontSize="8.5"
          fontWeight="700"
          letterSpacing="0.08em"
        >
          CAPITOL COMMONS
        </text>
        <text
          x="14%"
          y="132"
          fill="#a0b8a4"
          fontFamily="'DM Sans', sans-serif"
          fontSize="8.5"
          fontWeight="700"
          letterSpacing="0.08em"
        >
          RAINFOREST PARK
        </text>
      </svg>

      <div className="map-center-fog"></div>

      {/* Pins layout mapping */}
      <div
        className={`map-pin ${activeSpotId === 1 ? "active" : ""}`}
        id="pin-spot-1"
        style={{ left: "15%", top: "20%" }}
        onMouseEnter={() => clearHideBuffer(1)}
        onMouseLeave={startHideBuffer}
      >
        <div className="pin-pulsar"></div>
        <div className="pin-core"></div>
      </div>
      <div
        className={`map-pin ${activeSpotId === 2 ? "active" : ""}`}
        id="pin-spot-2"
        style={{ left: "13%", top: "48%" }}
        onMouseEnter={() => clearHideBuffer(2)}
        onMouseLeave={startHideBuffer}
      >
        <div className="pin-pulsar"></div>
        <div className="pin-core"></div>
      </div>
      <div
        className={`map-pin ${activeSpotId === 3 ? "active" : ""}`}
        id="pin-spot-3"
        style={{ left: "16%", top: "76%" }}
        onMouseEnter={() => clearHideBuffer(3)}
        onMouseLeave={startHideBuffer}
      >
        <div className="pin-pulsar"></div>
        <div className="pin-core"></div>
      </div>
      <div
        className={`map-pin ${activeSpotId === 4 ? "active" : ""}`}
        id="pin-spot-4"
        style={{ left: "85%", top: "20%" }}
        onMouseEnter={() => clearHideBuffer(4)}
        onMouseLeave={startHideBuffer}
      >
        <div className="pin-pulsar"></div>
        <div className="pin-core"></div>
      </div>
      <div
        className={`map-pin ${activeSpotId === 5 ? "active" : ""}`}
        id="pin-spot-5"
        style={{ left: "87%", top: "48%" }}
        onMouseEnter={() => clearHideBuffer(5)}
        onMouseLeave={startHideBuffer}
      >
        <div className="pin-pulsar"></div>
        <div className="pin-core"></div>
      </div>
      <div
        className={`map-pin ${activeSpotId === 6 ? "active" : ""}`}
        id="pin-spot-6"
        style={{ left: "84%", top: "76%" }}
        onMouseEnter={() => clearHideBuffer(6)}
        onMouseLeave={startHideBuffer}
      >
        <div className="pin-pulsar"></div>
        <div className="pin-core"></div>
      </div>

      {spotsOrder.map((id) => {
        const data = spotData[id];
        if (activeSpotId !== id) return null;
        return (
          <div
            key={id}
            id={`bubble-dynamic-${id}`}
            className={`floating-chat-bubble entered ${isExiting ? "exiting" : ""}`}
            style={{
              left: data.side === "left" ? "42px" : "auto",
              right: data.side === "right" ? "42px" : "auto",
              top: data.top,
            }}
            onMouseEnter={() => setHoveredSpotId(id)}
            onMouseLeave={startHideBuffer}
          >
            <div className="chat-bubble-header">
              <span className="chat-bubble-group">{data.group}</span>
              <span className="chat-bubble-meta">vs-{id}</span>
            </div>
            <div className="chat-bubble-body">{data.msg}</div>
          </div>
        );
      })}
    </div>
  );
}
