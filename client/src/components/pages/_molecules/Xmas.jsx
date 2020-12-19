import React from 'react'
import api from "../../../api"


const Xmas = ({id,user, updateGlobalValues, size}) => {
    
    const handleFound = async (id)=> {
        let data 
        try {
            data = await api.xmasFind(id)
        } catch (err){
            console.err('err')
            return updateGlobalValues(err,true,true)
        }
        updateGlobalValues(data,true,true)
    }
    const sizes = {
        s: 0.1,
        m: 0.5,
        l: 1
    }
    const giftIcon = (
      <span
        style={{fontSize:`${sizes[size]}rem`, cursor:"pointer"}}
        role="img"
        title="Missing gift!"
        aria-label="Missing gift!"
      >
        🎁
      </span>
    );

    const show = user && user.xmas && !user.xmas[id]

    
    return (
        show && (
      <div onClick={() => handleFound(id)}>
        {giftIcon}
      </div>)
    );
}

export default Xmas
