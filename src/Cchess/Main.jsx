import React from 'react'
// import fs from 'fs'

const Main = () => {
    
    // const fetch = () => {
    //     fs.readFileSync('../Xiangqi/main.html')
    // }

    const iframe = "<iframe src='http://127.0.0.1:5500/src/Xiangqi/main.html'  weight='600px' height='800px'></iframe>";


    const iframeFunction = () => {
        return {
            __html: iframe
        }
    }

    return (


        <div>

            <div dangerouslySetInnerHTML={iframeFunction()} />
            
        </div>
    )
}

export default Main