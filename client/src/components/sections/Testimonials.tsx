import { TestimonialCard } from "@/components/ui/testimonial-card";

export default function Testimonials() {
  const testimonials = [
    {
      quote: "DataCanvas has transformed how we analyze our marketing campaigns. The drag-and-drop interface makes it easy to build dashboards, and the visualizations help us identify opportunities we were missing before.",
      author: "Sarah Chen",
      title: "Marketing Director, TechGrowth",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      quote: "We needed a way to connect multiple data sources to create unified reports. DataCanvas not only solved that problem but also gave us insights we didn't know were possible. Game-changer for our team.",
      author: "Michael Rodriguez",
      title: "Data Analytics Lead, GlobalRetail",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      quote: "As a fintech startup, we deal with massive amounts of data. DataCanvas helps us make sense of it all and communicate insights to stakeholders. The security features give us peace of mind with sensitive information.",
      author: "David Park",
      title: "CTO, FinanceFlow",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  ];

  return (
    <div className="py-16 bg-white" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Testimonials</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Trusted by data teams worldwide
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            See how organizations are transforming their data into actionable insights.
          </p>
        </div>
        
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              title={testimonial.title}
              avatar={testimonial.avatar}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
