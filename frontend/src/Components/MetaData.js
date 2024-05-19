import {Helmet} from "react-helmet-async"
import React from 'react'

function MetaData(title) {
  return (
    <Helmet>
        <title>{`${title} - ALS`}</title>
    </Helmet>
  )
}

export default MetaData
