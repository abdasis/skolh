import { type ConnectorDot, type ConnectorPath } from './types';

interface Props {
    paths: ConnectorPath[];
    dots: ConnectorDot[];
}

const ConnectorOverlay = ({ paths, dots }: Props) => {
    return (
        <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            style={{ overflow: 'visible' }}
        >
            {paths.map((p) => (
                <path
                    key={p.id}
                    d={p.d}
                    fill="none"
                    stroke="rgb(5 150 105 / 0.5)"
                    strokeWidth={2}
                    strokeDasharray={p.dashed ? '6 4' : undefined}
                />
            ))}
            {dots.map((dot) => (
                <circle
                    key={dot.id}
                    cx={dot.point.x}
                    cy={dot.point.y}
                    r={5}
                    fill="rgb(5 150 105)"
                    stroke="white"
                    strokeWidth={2}
                />
            ))}
        </svg>
    );
};

export { ConnectorOverlay };
