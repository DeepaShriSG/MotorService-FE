import React,{useState} from 'react'

export const Updatedata = React.createContext(null)

function UpdateProvider({children}) {

    const [data, setdata] = useState([]);

  return (
    <Updatedata.Provider value={{data, setdata}}>
      {children}
    </Updatedata.Provider>
  )
}

export default UpdateProvider