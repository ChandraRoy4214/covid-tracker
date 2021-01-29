import React from 'react'

function InfoBox({title, cases, total}) {
    return (
        <div className = "infoBox">
            <h3 className = "ibTitle">{title}</h3>
            <h2 className = "ibCases">+{cases}</h2>
            <h3 className = "ibTotal">{total} Total</h3>
        </div>
    )
}

export default InfoBox
