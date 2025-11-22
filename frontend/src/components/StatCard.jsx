function StatCard({ title, value, icon, gradient, unit }) {
  return (
    <div
      className={`${gradient} text-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition`}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="w-8 h-8">{icon}</div>
      </div>
      <p className="text-3xl font-bold">{value}</p>
      {unit && (
        <p className="text-white text-opacity-80 text-sm mt-1">{unit}</p>
      )}
    </div>
  );
}

export default StatCard;
