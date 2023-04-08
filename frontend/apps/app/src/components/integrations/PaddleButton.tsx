import { env } from "../../shared/utils/helpers"
import Script from "next/script"

declare global {
  var Paddle: any
}

// export const PaddleLoader = () => {
//   const paddleLoad = () => {
//     Paddle.Setup({
//       vendor: Number(env.paddleVendorId),
//     })
//   }

//   return <Script src="https://cdn.paddle.com/paddle/paddle.js" onLoad={paddleLoad} />
// }

// export const PaddleButton = () => {
//   const paddlePay = () => {
//     Paddle.Checkout.open({
//       product: "...",
//     })
//   }

//   return <button onClick={paddlePay}>Pay</button>
// }
