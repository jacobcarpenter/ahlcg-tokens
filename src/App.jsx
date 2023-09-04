import { Random } from "random";
import { xor128 } from "seedrandom";
import "./App.css";
import { RandomStar } from "./RandomStar";

const rng = new Random();
// rng.use(xor128("ahlcg1"));

const layers = [2, 3];
const points = [8, 20];
const radiusScale = [0.4, 1.0];

const tokenCount = 16;
const padding = 18;
const columns = 4;
const spacing = 28;

export function App() {
  const radius = 12;

  return (
    <>
      <div className="printable">
        <svg style={{ width: "200mm" }} viewBox="0 0 200 200">
          {Array.from({ length: tokenCount }).map((_, i) => (
            <g
              key={i}
              transform={`translate(${(i % columns) * spacing + padding}, ${
                Math.trunc(i / columns) * spacing + padding
              })`}
            >
              <RandomStar
                radius={radius}
                radiusScale={radiusScale}
                layers={layers}
                points={points}
                rng={rng}
              />
            </g>
          ))}
        </svg>
      </div>
      <div className="printable right">
        <svg
          style={{ width: "200mm", transform: "scalex(-1)" }}
          viewBox="0 0 200 200"
        >
          {Array.from({ length: tokenCount }).map((_, i) => (
            <g
              key={i}
              transform={`translate(${(i % columns) * spacing + padding}, ${
                Math.trunc(i / columns) * spacing + padding
              })`}
            >
              <circle
                cx="0"
                cy="0"
                r={radius}
                fill="transparent"
                stroke="red"
                strokeWidth={"0.1"}
              />
              <circle
                cx="0"
                cy="0"
                r={radius * 0.8}
                fill="black"
                stroke="none"
              />
              <circle
                cx="0"
                cy="0"
                r={radius * 0.8 - 2}
                fill="white"
                stroke="none"
              />
            </g>
          ))}

          {/* <line x1="100" y1="100" x2="300" y2="100" stroke="#000" />
        <g transform="rotate(-1, 200, 100)">
          <line x1="100" y1="100" x2="300" y2="100" stroke="#000" />
        </g>

        <line x1="263" y1="90" x2="311" y2="100" stroke="#000" />
        <g transform={`rotate(2, ${(311 + 263) / 2}, ${(90 + 100) / 2})`}>
          <line x1="263" y1="90" x2="311" y2="100" stroke="#000" />
        </g>

        <line x1="263" y1="110" x2="311" y2="100" stroke="#000" />
        <g transform={`rotate(-4, ${(311 + 263) / 2}, ${(90 + 100) / 2})`}>
          <line x1="263" y1="110" x2="311" y2="100" stroke="#000" />
        </g> */}
        </svg>
      </div>
    </>
  );
}
