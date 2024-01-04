import React from 'react'

export const DontAccess = () => {
  return (
    <div class="error">
           <div class="container-floud">
               <div class="col-xs-12 ground-color text-center">
                   <div class="container-error-404">
                       <div class="clip"><div class="shadow"><span class="digit thirdDigit">4</span></div></div>
                       <div class="clip"><div class="shadow"><span class="digit secondDigit">0</span></div></div>
                       <div class="clip"><div class="shadow"><span class="digit firstDigit">4</span></div></div>
                       <div class="msg">OH!<span class="triangle"></span></div>
                   </div>
                   <h2 class="h1">Sorry! You Don' Have Access This Menu</h2>
                   {/* <h2 class="h1">Please refresh your page, or logout your account</h2> */}
               </div>
           </div>
        </div>
  )
}
