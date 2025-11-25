import { RubiksCubeScene } from "./components/RubiksCubeScene";
import { ResolvedConfig } from "./config";

interface AppProps {
  config: ResolvedConfig;
}

export default function App({ config }: AppProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_50%)]" />
      <div className="smoke-bg" aria-hidden="true" />
      
      {/* Header */}
      <div className="absolute top-8 left-0 right-0 text-center z-10">
        <h1 className="text-white mb-2">{config.headline}</h1>
        <p className="text-neutral-400">{config.subheadline}</p>
      </div>
      
      {/* Main 3D Cube Scene */}
      <RubiksCubeScene config={config} />
      
      {/* Footer */}
      <div className="absolute bottom-8 left-0 right-0 text-center text-neutral-500 text-sm z-10">
        <p>Tap or hover squares to explore venues</p>
      </div>
    </div>
  );
}
