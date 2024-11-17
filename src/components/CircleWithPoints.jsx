import Point from "./Points";

const CircleWithPoints = ({ radius = 265, points = 6 }) => {
  const centerX = radius;
  const centerY = radius;

  const coordinates = Array.from({ length: points }, (_, index) => {
    const angle = (2 * Math.PI * index) / points;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return { x, y };
  });

  return (
    <div
      className="absolute top-1/2 left-1/2 border-[1px] border-[rgba(66,86,122,0.1)] rounded-full  "
      style={{
        width: 2 * radius,
        height: 2 * radius,
        transform: 'translate(-50%, -50%)',
      }}>
      {coordinates.map((coord, index) => (
         <Point key={index} coord={coord} index={index + 1} />
      ))}
    </div>
  );
};

export default CircleWithPoints;
