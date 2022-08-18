import React, { useEffect, useState } from 'react';
import { Clock } from './components/clock';
import { useHttp } from './components/hooks/useHttp';


interface CurrentRegionTypes {
  regionName: string;
  region: object | null;
}


function App() {
  const [error, setError] = useState<string>('')
  const { getRegions, getCurrentTime } = useHttp(setError)
  const [regions, setRegions] = useState<string[]>([])
  const [currentRegion, setCurrentRegion] = useState<CurrentRegionTypes>({
    regionName: '',
    region: null
  })

  useEffect(() => {
    if (!regions.length) {
      getRegions().then(async (data) => {
        if (data) {
          setRegions(data)
          setCurrentRegion({
            regionName: data[0],
            region: await getCurrentTime(data[0])
          })
        }
      })
    }

    if (currentRegion.regionName) {
      getCurrentTime(currentRegion.regionName).then((data) => {
        setCurrentRegion({ regionName: currentRegion.regionName, region: data })
      })
    }


  }, [currentRegion.regionName])

  const selectRegion = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentRegion({ regionName: target.value, region: null })
  }

  return (
    <div className="App">
      <div className="container">
        <div className="dial">
          <Clock region={currentRegion.region} />
        </div>
        <h1 className="current-region">{currentRegion.regionName}</h1>
        <div className="nav">
          <select onChange={selectRegion}>{
            regions.map((item, i) => {
              return <option key={i}>{item}</option>
            })
          }</select>
          <div className="error">{error}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
