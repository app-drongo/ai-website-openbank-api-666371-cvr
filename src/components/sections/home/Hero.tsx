'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Shield, Code, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_HERO = {
  badge: 'Enterprise-Grade APIs',
  title: 'Test Open Banking Infrastructure for Modern Fintech',
  subtitle:
    'Build compliant financial applications with our robust APIs. Enterprise-grade security, comprehensive documentation, and scalable architecture designed for regulated environments.',
  primaryCta: 'Start Building',
  primaryCtaHref: '/docs',
  secondaryCta: 'View Documentation',
  secondaryCtaHref: '/documentation',
  features: [
    {
      title: 'Test Open Banking Infrastructure for Modern Fintech',
      description:
        'SOC 2 Type II certified with end-to-end encryption and regulatory compliance built-in',
    },
    {
      title: 'Test Open Banking Infrastructure for Modern Fintech',
      description:
        'Comprehensive SDKs, interactive documentation, and seamless integration workflows',
    },
    {
      title: 'Test Open Banking Infrastructure for Modern Fintech',
      description:
        'Auto-scaling architecture that handles millions of transactions with 99.99% uptime',
    },
  ],
  stats: [
    { value: '99.99%', label: 'API Uptime' },
    { value: '50ms', label: 'Response Time' },
    { value: '500M+', label: 'API Calls/Month' },
  ],
} as const;

type HeroProps = Partial<typeof DEFAULT_HERO>;

export default function Hero(props: HeroProps) {
  const config = { ...DEFAULT_HERO, ...props };
  const navigate = useSmartNavigation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handlePrimaryCta = () => {
    navigate(config.primaryCtaHref);
  };

  const handleSecondaryCta = () => {
    navigate(config.secondaryCtaHref);
  };

  return (
    <section id="hero" className="bg-background text-foreground py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div
            className={`mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
              <span data-editable="badge">{config.badge}</span>
            </Badge>
          </div>

          {/* Main Heading */}
          <div
            className={`mb-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span data-editable="title">{config.title}</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              <span data-editable="subtitle">{config.subtitle}</span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            className={`mb-16 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={handlePrimaryCta}
                data-editable-href="primaryCtaHref"
                data-href={config.primaryCtaHref}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-lg font-semibold"
              >
                <span data-editable="primaryCta">{config.primaryCta}</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleSecondaryCta}
                data-editable-href="secondaryCtaHref"
                data-href={config.secondaryCtaHref}
                className="px-8 py-3 text-lg font-semibold"
              >
                <span data-editable="secondaryCta">{config.secondaryCta}</span>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div
            className={`mb-16 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
              {config.stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                    <span data-editable={`stats[${idx}].value`}>{stat.value}</span>
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    <span data-editable={`stats[${idx}].label`}>{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features Grid */}
          <div
            className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {config.features.map((feature, idx) => (
                <Card
                  key={idx}
                  className="bg-card text-card-foreground border-border hover:shadow-lg transition-shadow duration-300"
                >
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 flex justify-center">
                      <div className="p-3 rounded-lg bg-primary/10 text-primary">
                        {idx === 0 && <Shield className="h-8 w-8" />}
                        {idx === 1 && <Code className="h-8 w-8" />}
                        {idx === 2 && <Zap className="h-8 w-8" />}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">
                      <span data-editable={`features[${idx}].title`}>{feature.title}</span>
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      <span data-editable={`features[${idx}].description`}>
                        {feature.description}
                      </span>
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
