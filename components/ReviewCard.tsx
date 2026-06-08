import Marquee from '@/components/ui/marquee'
import { Star } from 'lucide-react'

const reviews = [
  {
    name: 'Alex Johnson',
    role: 'DevOps Engineer',
    company: 'TechCorp',
    review:
      "Doorman has revolutionized how we manage our firewall rules. It's a game-changer for our CI/CD pipeline.",
  },
  {
    name: 'Samantha Lee',
    role: 'Full Stack Developer',
    company: 'WebSolutions Inc.',
    review:
      "The ability to version control our firewall config has improved our team's collaboration and reduced errors significantly.",
  },
  {
    name: 'Michael Chen',
    role: 'Security Specialist',
    company: 'SecureNet',
    review:
      "Doorman provides the perfect balance between security and ease of use. It's now an essential part of our toolkit.",
  },
  {
    name: 'Emily Rodriguez',
    role: 'CTO',
    company: 'StartupX',
    review:
      "We've cut down our deployment time by 40% since implementing Doorman. It's been a fantastic investment for our team.",
  },
  {
    name: 'David Kim',
    role: 'Lead Developer',
    company: 'InnovateTech',
    review:
      'The seamless integration with our existing Vercel setup made adoption a breeze. Highly recommended for any Vercel user.',
  },
]

export function ReviewCard({
  name,
  role,
  company,
  review,
}: {
  name: string
  role: string
  company: string
  review: string
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-80 flex-shrink-0 mx-4">
      <div className="flex items-center mb-4">
        <Star className="w-5 h-5 text-yellow-400" />
        <Star className="w-5 h-5 text-yellow-400" />
        <Star className="w-5 h-5 text-yellow-400" />
        <Star className="w-5 h-5 text-yellow-400" />
        <Star className="w-5 h-5 text-yellow-400" />
      </div>
      <p className="text-gray-600 mb-4">{review}</p>
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-gray-500">
          {role}, {company}
        </p>
      </div>
    </div>
  )
}

export function ReviewsMarquee() {
  return (
    <Marquee className="py-6" pauseOnHover={true} speed={40}>
      {reviews.map((review, index) => (
        <ReviewCard key={index} {...review} />
      ))}
    </Marquee>
  )
}
