
import React from 'react';
import { HandHeart, Search, DollarSign } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const reasons = [
  {
    icon: <Search size={36} className="text-purple-500" />,
    title: "Find Affordable Schools",
    description: "We help you locate quality schools within your budget that are perfect for your child's educational needs."
  },
  {
    icon: <DollarSign size={36} className="text-purple-500" />,
    title: "Financial Accessibility",
    description: "Access information about government schools, NGO-funded institutions, and low-cost private schools all in one place."
  },
  {
    icon: <HandHeart size={36} className="text-purple-500" />,
    title: "Support For All Families",
    description: "We believe every child deserves quality education regardless of their family's economic situation."
  }
];

const WhyUs = () => {
  return (
    <section className="py-16 bg-theme-500">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-purple-300 mb-4">Why You Need Us</h2>
          <p className="text-muted-foreground text-lg">
            We bridge the gap between low-income families and quality education, ensuring every child has access to the learning they deserve.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <Card key={index} className="bg-theme-300 border-theme-100 shadow-xl hover:shadow-purple-500/10 transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-theme-100 mb-4">
                  {reason.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-purple-300">{reason.title}</h3>
                <p className="text-muted-foreground">{reason.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
