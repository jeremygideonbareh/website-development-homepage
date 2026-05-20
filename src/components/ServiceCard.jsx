import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const ServiceCard = React.forwardRef(
  (
    {
      className,
      imageUrl,
      imageAlt,
      logo,
      title,
      location,
      overview,
      price,
      pricePeriod,
      onBookNow,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group relative w-full overflow-hidden rounded-xl border border-white/10 bg-black/50 backdrop-blur-md shadow-lg",
          "transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2",
          className
        )}
        {...props}
      >
        <img
          src={imageUrl}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/20"></div>

        <div className="relative flex h-full flex-col justify-between p-6 text-white">
          <div className="flex h-40 items-start">
             {logo && (
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/50 bg-black/20 backdrop-blur-sm">
                   {logo}
                </div>
             )}
          </div>

          <div className="space-y-4 transition-transform duration-500 ease-in-out group-hover:-translate-y-16">
            <div>
              <h3 className="text-3xl font-bold text-white">{title}</h3>
              <p className="text-sm text-white/80">{location}</p>
            </div>
            <div>
              <h4 className="font-semibold text-white/90">OVERVIEW</h4>
              <p className="text-sm text-white/70 leading-relaxed">
                {overview}
              </p>
            </div>
          </div>

          <div className="absolute -bottom-20 left-0 w-full p-6 opacity-0 transition-all duration-500 ease-in-out group-hover:bottom-0 group-hover:opacity-100">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-4xl font-bold text-white">${price}</span>
                <span className="text-white/80"> {pricePeriod}</span>
              </div>
              <Button onClick={onBookNow} size="lg" className="bg-white text-black hover:bg-white/90">
                Book Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
ServiceCard.displayName = "ServiceCard";

export { ServiceCard };
