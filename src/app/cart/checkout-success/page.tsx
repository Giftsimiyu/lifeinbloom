export default function CheckoutSuccessPage(){
  return (
    <div className="max-w-3xl mx-auto px-6 py-20 text-center">
      <h1 className="font-display text-3xl mb-4">Thank you — your order is received</h1>
      <p className="text-(--color-neutral-grey)">We've received your order and will send confirmation to your email.</p>
      <p className="mt-6"><a href="/" className="text-(--color-accent-olive)">Continue browsing</a></p>
    </div>
  )
}
