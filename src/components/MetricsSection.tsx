'use client'

import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

const MetricsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  })

  const [counters, setCounters] = useState({
    portfolio: 0,
    programs: 0,
    compliance: 0,
  })

  const metrics = [
    { key: 'portfolio', value: 30, suffix: 'M+', label: 'Portfolio Managed' },
    { key: 'programs', value: 50, suffix: '+', label: 'Programs Evaluated' },
    { key: 'compliance', value: 100, suffix: '%', label: 'Quality Compliance Rate' },
  ]

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setCounters({
          portfolio: 30,
          programs: 50,
          compliance: 100,
        })
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [inView])

  return (
    <section className="bg-white pt-10 pb-6">
      <div className="container">
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric) => (
            <div
              key={metric.key}
              className="text-center p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
            >
              <div className="text-4xl font-bold text-blue-600 mb-2 animate-counter">
                {counters[metric.key as keyof typeof counters]}{metric.suffix}
              </div>
              <div className="text-gray-600 font-medium">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MetricsSection
