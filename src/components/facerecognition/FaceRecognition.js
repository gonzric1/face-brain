import React from 'react'
import './facerecognition.css'

export function FaceRecognition( {image, boundingBoxes} ) {
    
    const faces = boundingBoxes.map((box, i) => (
        <div className='bounding' key={i} style={{top: box.top, 
            bottom: box.bottom, 
            left: box.left, 
            right: box.right}}></div>
    ))

    return (
        <div className='center ma'>
            <div className="absolute mt2">
                <img alt="" src={image} width='500px' height='auto'/>
                {faces}
            </div>

        </div>
    )
    

}
export default FaceRecognition
