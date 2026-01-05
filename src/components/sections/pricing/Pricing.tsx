'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Check, Star, Zap, Shield } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_PRICING = {
  title: 'Choose Your Plan',
  subtitle: 'Select the perfect plan for your needs. Upgrade or downgrade at any time.',
  monthlyLabel: 'Monthly',
  annualLabel: 'Annual',
  annualSavings: 'Save 20%',
  plans: [
    {
      name: 'Starter',
      description: 'Perfect for individuals and small projects',
      monthlyPrice: 9,
      annualPrice: 7,
      currency: '$',
      period: 'month',
      features: ['Up to 5 projects', '10GB storage', 'Basic support', 'Standard templates'],
      ctaText: 'Get Started',
      ctaHref: '/signup?plan=starter',
    },
    {
      name: 'Professional',
      description: 'Ideal for growing teams and businesses',
      monthlyPrice: 29,
      annualPrice: 23,
      currency: '$',
      period: 'month',
      popular: true,
      features: [
        'Unlimited projects',
        '100GB storage',
        'Priority support',
        'Premium templates',
        'Advanced analytics',
        'Team collaboration',
      ],
      ctaText: 'Start Free Trial',
      ctaHref: '/signup?plan=professional',
    },
    {
      name: 'Enterprise',
      description: 'For large organizations with custom needs',
      monthlyPrice: 99,
      annualPrice: 79,
      currency: '$',
      period: 'month',
      features: [
        'Unlimited everything',
        '1TB storage',
        '24/7 dedicated support',
        'Custom templates',
        'Advanced security',
        'API access',
        'Custom integrations',
        'SLA guarantee',
      ],
      ctaText: 'Contact Sales',
      ctaHref: '/contact?plan=enterprise',
    },
  ],
} as const;

type PricingProps = Partial<typeof DEFAULT_PRICING>;

export default function Pricing(props: PricingProps) {
  const config = { ...DEFAULT_PRICING, ...props };
  const navigate = useSmartNavigation();
  const [isAnnual, setIsAnnual] = useState(false);

  const handlePlanSelect = (href: string) => {
    navigate(href);
  };

  return (
    <section id="pricing" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <Label
              htmlFor="billing-toggle"
              className={!isAnnual ? 'text-foreground' : 'text-muted-foreground'}
            >
              <span data-editable="monthlyLabel">{config.monthlyLabel}</span>
            </Label>
            <Switch
              id="billing-toggle"
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-primary"
            />
            <Label
              htmlFor="billing-toggle"
              className={isAnnual ? 'text-foreground' : 'text-muted-foreground'}
            >
              <span data-editable="annualLabel">{config.annualLabel}</span>
            </Label>
            {isAnnual && (
              <Badge variant="secondary" className="ml-2">
                <span data-editable="annualSavings">{config.annualSavings}</span>
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
          {config.plans.map((plan, idx) => (
            <Card
              key={idx}
              className={`relative bg-card text-card-foreground transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                plan.popular ? 'ring-2 ring-primary shadow-lg' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8 pt-8">
                <div className="mb-4 flex justify-center text-primary">
                  {idx === 0 && <Zap className="h-12 w-12" />}
                  {idx === 1 && <Star className="h-12 w-12" />}
                  {idx === 2 && <Shield className="h-12 w-12" />}
                </div>

                <h3 className="text-2xl font-bold mb-2">
                  <span data-editable={`plans[${idx}].name`}>{plan.name}</span>
                </h3>

                <p className="text-muted-foreground mb-6">
                  <span data-editable={`plans[${idx}].description`}>{plan.description}</span>
                </p>

                <div className="mb-6">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">
                      <span data-editable={`plans[${idx}].currency`}>{plan.currency}</span>
                      {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-muted-foreground">
                      /<span data-editable={`plans[${idx}].period`}>{plan.period}</span>
                    </span>
                  </div>
                  {isAnnual && (
                    <p className="text-sm text-muted-foreground mt-1">Billed annually</p>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span data-editable={`plans[${idx}].features[${featureIdx}]`}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handlePlanSelect(plan.ctaHref)}
                  data-editable-href={`plans[${idx}].ctaHref`}
                  data-href={plan.ctaHref}
                  className={`w-full ${
                    plan.popular
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                  size="lg"
                >
                  <span data-editable={`plans[${idx}].ctaText`}>{plan.ctaText}</span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
}
