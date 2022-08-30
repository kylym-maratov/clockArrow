import React, { useEffect, useState } from 'react';
import { Clock } from './components/clock';
import { useHttp } from './components/hooks/useHttp';
import { CurrentRegionTypes } from './types/app.types';


function App() {
  const [error, setError] = useState<string>('');
  const { getRegions, getCurrentTime } = useHttp(setError);
  const [regions, setRegions] = useState<string[]>([]);
  const [currentRegion, setCurrentRegion] = useState<CurrentRegionTypes>({
    regionName: '',
    region: null
  });

  useEffect(() => {
    if (!regions.length) {
      getRegions().then(async (data) => {
        if (data) {
          setRegions(data)
          setCurrentRegion({
            regionName: data[0],
            region: await getCurrentTime(data[0])
          });
        }
      })
    }

    if (currentRegion.regionName) {
      getCurrentTime(currentRegion.regionName).then((data) => {
        setCurrentRegion({ regionName: currentRegion.regionName, region: data });
      });
    }


  }, [currentRegion.regionName]);

  const selectRegion = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentRegion({ regionName: target.value, region: null });
  }

  return (
    <div className="App">
      <div className="container">
        <div className="clock-wrapper">
          <Clock region={currentRegion.region} />
        </div>
        <h1>
          {currentRegion.regionName} {currentRegion.region && currentRegion.region.utc_offset}</h1>
        <div className="nav">
          <select onChange={selectRegion} disabled={!regions.length}>{
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
