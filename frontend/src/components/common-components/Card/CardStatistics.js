function CardStatistics({ title="", value="", titleColor = "", valueColor = "", icon="" }) {  
  return (
    <div className="min-w-fit shadow-xl rounded-3xl bg-white p-8 my-auto">
      <div className="flex items-center">
        <div className={`h-12 my-auto ${valueColor}`}>
          {icon}
        </div>
        <div className="my-2 flex-1 text-end">
          <h2 className="text-4xl font-bold"><span className={valueColor}>{value}</span></h2>
        </div>
      </div>
      <div>
        <p className={`mt-2 text-xl font-medium ${titleColor}`}>{title}</p>
      </div>
    </div>
  )
}

export default CardStatistics;
