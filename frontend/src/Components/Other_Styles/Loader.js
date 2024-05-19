import React from 'react'
import styles_loader from '../Other_Styles/Loader.module.css'
function Loader() {
  return (
    <div class="flex flex-row min-h-screen justify-center items-center">
      <div className={`${styles_loader.spinner} `}>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
    </div>
  )
}

export default Loader
