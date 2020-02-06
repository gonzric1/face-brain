import React from 'react'
import './ImageLinkForm.css'

function ImageLinkForm( {onInputChange, onButtonSubmit}) {
    return (
        <div className='center'>
            <div className='center'>
                <div className='pa4 br3 shadow-5 form flex'>
                    <input className='f4 pa2 w-70 center' type='tex' onChange={onInputChange}/>
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-dark-blue pointer'
                    onClick={onButtonSubmit}>Detect</button>
                </div>
                
            </div>
        </div>
    )
}

export default ImageLinkForm
