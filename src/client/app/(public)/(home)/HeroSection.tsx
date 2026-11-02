"use client";

import SliderImg1 from "@/app/assets/images/laptop-slider.jpg";
import SliderImg2 from "@/app/assets/images/furniture-slider.jpeg";
import SliderImg3 from "@/app/assets/images/shirt-slider.jpg";
import SliderImg4 from "@/app/assets/images/shoes-slider.jpeg";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  ShoppingBag,
  Star,
} from "lucide-react";
import Link from "next/link";

interface HeroSectionProps {
  isPreview?: boolean;
}

const HeroSection = ({ isPreview = false }: HeroSectionProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const sliderData = [
    {
      image: SliderImg1,
      title: "Discover Amazing Deals",
      subtitle: "Up to 70% off on selected items",
      ctaText: "Shop Now",
      ctaLink: "/shop",
      badge: "New Arrivals",
    },
    {
      image: SliderImg2,
      title: "Premium Quality Products",
      subtitle: "Handpicked items for your lifestyle",
      ctaText: "Explore",
      ctaLink: "/shop",
      badge: "Featured",
    },
    {
      image: SliderImg3,
      title: "Fast & Free Shipping",
      subtitle: "On orders over $50",
      ctaText: "Learn More",
      ctaLink: "/shop",
      badge: "Limited Time",
    },
    {
      image: SliderImg4,
      title: "Fast & Free Shipping",
      subtitle: "On orders over $50",
      ctaText: "Learn More",
      ctaLink: "/shop",
      badge: "Limited Time",
    },
  ];

  useEffect(() => {
    if (!isPreview) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) =>
          prev === sliderData.length - 1 ? 0 : prev + 1
        );
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [isPreview, sliderData.length]);

  const nextSlide = () => {
    setCurrentImageIndex((prev) =>
      prev === sliderData.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? sliderData.length - 1 : prev - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentImageIndex(index);
  };

  const currentSlide = sliderData[currentImageIndex];

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase italic leading-[0.9]">
          Everything You Need,
          <span className="text-emigreen">
            All in One Place.
          </span>
          </h1>
          <p className="mt-8 text-xl text-textDark font-medium max-w-xl mx-auto">
            Everyday essentials. Exceptional finds. A better way to shop.
          </p>
          <div className="mt-12 flex justify-center gap-6">
            <Link className="bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-emerald-400 transition-colors" href="/shop">Our Collection</Link>
          </div>
        {/* Hero Image Slider */}
        
      </div>
    </section>
  );
};

export default HeroSection;
