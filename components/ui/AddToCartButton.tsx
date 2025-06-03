"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/Cartcontext"; 
import { useToast } from "@/contexts/ToastContext";


// Styling för knappen
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface Product {
  id: string;
  articleNumber: string;
  articleColorSize: string;
  image: string;
  title: string;
  description: string;
  price: number;
}

// Extra props för produktdata
interface AddToCartButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  product?: Product;
  quantity?: number;
}

const AddToCartButton = React.forwardRef<HTMLButtonElement, AddToCartButtonProps>(
  (
    { className, variant, size, asChild = false, product, quantity = 1, ...props },
    ref
  ) => {
    const { addItem } = useCart();
    const { showToast } = useToast();


    const Comp = asChild ? Slot : "button";

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault(); 
      // Prevent card link from triggering when clicking Buy

      if (product) {
        addItem(product, quantity);
        showToast(`${product.title} has been added!`);

      }

      if (props.onClick) {
        props.onClick(e); // Run other possible onClick actions passed in props
      }
    };

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        onClick={handleClick}
      />
    );
  }
);

AddToCartButton.displayName = "AddToCartButton";

export { AddToCartButton, buttonVariants };
