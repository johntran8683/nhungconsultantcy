import { Quote } from 'lucide-react'

const TestimonialSection = () => {
  return (
    <section className="section-padding bg-blue-600 text-white">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <Quote className="h-16 w-16 text-blue-200 mx-auto mb-8" />
          <blockquote className="text-2xl italic leading-relaxed mb-8">
            &ldquo;Nhung&apos;s expertise in M&E and gender inclusion has been instrumental in advancing our project success. 
              Her systematic approach and deep understanding of development challenges make her an invaluable partner.&rdquo;
          </blockquote>
          <div className="text-center">
            <div className="font-semibold text-xl mb-2">Amy Luinstra</div>
            <div className="text-blue-200">
              Manager - Global Manufacturing, Agribusiness & Forestry, IFC
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialSection
