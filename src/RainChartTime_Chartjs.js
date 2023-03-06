// RainChartTime_Chartjs.js
import {useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import moment from 'moment'
import 'chartjs-adapter-moment';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
)

export function RainChartTime_Chartjs({rg_data, startDate, endDate}) {  
  const [labels, setLabels] = useState([]) 
  const [rainfall, setRainfall] = useState([])

  const options = {
    responsive: true,
    barThickness: 2,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'swmmNode',
      },
    },
    scales: {
      y: {
        position: 'left',
        reverse: true
      },
      x:{
        type:'time', 
        distribution: 'linear',
      },
    },
  }

  useEffect(()=>{
    let keysAll = rg_data?Array.from(rg_data.keys()):[]
    if(keysAll?.length > 0) {
      // Trim the keys by startDate and endDate:
      let newDat = new Map()
      let thisDate = new Date()
      for(let i = 0; i < keysAll.length; i++){
        thisDate = new Date(keysAll[i])
        if(thisDate >= startDate && thisDate <= endDate){
          newDat.set(keysAll[i], rg_data.get(keysAll[i]))
        }
      }

      let keys = newDat?Array.from(newDat.keys()):[]
      let maxObjs = 1000
      let falseStep = keys.length/maxObjs 
      if(falseStep < 1) falseStep = 1
      let labelData = []
      let rainData = []
      let theDate = new Date()
      for(let i = 0; i < keys.length; i=i+Math.ceil(falseStep)){
        theDate = new Date(keys[i])
        if(theDate >= startDate && theDate <= endDate){
          labelData.push(moment(keys[i]).utc().format('YYYY-MM-DD HH:mm:ss'))
          rainData.push(newDat.get(keys[i]))
        }
      }
      setLabels(labelData)
      setRainfall(rainData)
    }
    // If the rainfall data had been changed or there
    // is no raingage data, reset the rainfall data
    else{
      setRainfall([])
    }
  },[rg_data, startDate, endDate])

  const data = {
    labels,
    datasets: [
      {
        label: 'Rainfall',
        yAxisID: 'y',
        data: rainfall,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
      },
    ],
  }

  return (
    <Bar options={options} data={data} />
  )
}
