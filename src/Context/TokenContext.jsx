import { createContext, useState ,useEffect} from 'react';



export let TokenContext =createContext()


function TokenContextProvider( {children}) {
    const [token, setToken] = useState(null)
    useEffect(() => {
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"))
      } 
    }, [])
    

  return (
   <TokenContext.Provider value={{token, setToken}}>
        {children}
   </TokenContext.Provider>
  )
}

export default TokenContextProvider