import React from 'react'

function Navigation( {route, setRoute} ) {

    const signButton = (routes) => {
        let link = '';
        switch (routes) {
            case 'HOME':
            case 'SIGNED_IN':
                link = <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p className='f3 link dim white underline pa3 pointer' onClick={(e)=> setRoute('SIGNED_OUT')}>Sign out</p>
                    </nav>;
                break;
                
            case 'SIGNED_OUT':
            case 'REGISTER':
                link = <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p className='f3 link dim white underline pa3 pointer' onClick={(e)=> setRoute('SIGN_IN')}>Sign in</p>
                    <p className='f3 link dim white underline pa3 pointer' onClick={(e)=> setRoute('REGISTER')}>Register</p>
                    </nav>

                break;
            default:
                break;
        }
        return link
    }

    return (
        signButton(route)
    )
}

export default Navigation
