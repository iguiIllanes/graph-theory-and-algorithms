const MiniMapNode = ({ x, y, color }) => {
  return <circle cx={x} cy={y} r="50" fill={color} />;
};

export default MiniMapNode;
