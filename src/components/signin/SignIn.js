import React from 'react'

const SignIn = ( {setRoute} ) => {
    return (
        <article className="pa4 black-80 bg-white w-30 center">
            <p> Sign In </p>
            <form action="sign-up_submit" method="get" acceptCharset="utf-8">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0" >
                    <div className="mt3">
                        <label className="db fw4 lh-copy f6" htmlFor="email-address">Email address</label>
                        <input className="pa2 input-reset ba bg-transparent w-100 measure" type="email" name="email-address"  id="email-address" />
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f6" htmlFor="password">Password</label>
                        <input className="b pa2 input-reset ba bg-transparent" type="password" name="password"  id="password" />
                    </div>
                </fieldset>
                <div className="mt3"><button className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" onClick={(e)=>setRoute('SIGNED_IN')}>Sign In </button></div>
            </form>
        </article>

    )
}

export default SignIn
