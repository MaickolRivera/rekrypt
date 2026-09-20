interface BlurCircleProps {
  x?: number;
  y?: number;
  size?: number;
  color?: string;
}

const BlurCircle: React.FC<BlurCircleProps> = ({
  x = 0,
  y = 0,
  size = 250,
  color = "rgba(114, 57, 134, 0.)3",
}) => {
  return (
    <div
      className="fixed pointer-events-none"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: "100%",
        filter: "blur(200px)",
        opacity: 0.5,
        zIndex: 50,
      }}
    />
  );
};

export default BlurCircle;
