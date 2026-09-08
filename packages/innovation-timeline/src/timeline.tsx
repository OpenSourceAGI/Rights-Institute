"use client"

import * as React from "react"
import { cn } from "@rights/ui/utils"
import { Badge } from "@rights/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@rights/ui/card"
import { User } from "lucide-react"

interface TimelineItem {
  id: string | number
  date: string
  title: string
  description: string
  innovator: string
  icon?: React.ReactNode
  status?: "completed" | "in-progress" | "pending"
  color?: string
}

interface TimelineProps {
  items: TimelineItem[]
  animate?: boolean
  className?: string
  connectorColor?: "primary" | "secondary" | "muted"
  iconColor?: "primary" | "secondary" | "muted"
  size?: "sm" | "md" | "lg"
}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ items, animate = false, className, connectorColor = "primary", iconColor = "primary", size = "md" }, ref) => {
    const sizeClasses = {
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
    }

    const iconSizeClasses = {
      sm: "w-8 h-8",
      md: "w-10 h-10",
      lg: "w-12 h-12",
    }

    const connectorColorClasses = {
      primary: "bg-gradient-to-b from-primary via-primary/80 to-primary/60",
      secondary: "bg-gradient-to-b from-secondary via-secondary/80 to-secondary/60",
      muted: "bg-gradient-to-b from-muted-foreground via-muted-foreground/80 to-muted-foreground/60",
    }

    const iconColorClasses = {
      primary: "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25",
      secondary:
        "bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground shadow-lg shadow-secondary/25",
      muted: "bg-gradient-to-br from-muted to-muted/80 text-muted-foreground shadow-lg shadow-muted/25",
    }

    return (
      <div ref={ref} className={cn("relative max-w-[500px] mx-auto", className)}>
        <div className={cn("flex flex-col", sizeClasses[size])}>
          {items.map((item, index) => (
            <div key={item.id} className="relative flex items-start group">
              {/* Enhanced Connector Line */}
              {index < items.length - 1 && (
                <div
                  className={cn(
                    "absolute left-20 top-12 w-0.5 h-full z-0",
                    connectorColorClasses[connectorColor],
                    animate && "transition-all duration-500 group-hover:w-1 group-hover:shadow-lg",
                  )}
                />
              )}

              {/* Year Display on Left */}
              <div className="w-16 flex-shrink-0 text-right pr-4">
                <Badge
                  variant="outline"
                  className="text-xs font-mono bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 animate-pulse"
                >
                  {item.date}
                </Badge>
              </div>

              {/* Enhanced Icon with Glow Effect */}
              <div
                className={cn(
                  "relative z-10 flex items-center justify-center rounded-full border-4 border-background shrink-0 transition-all duration-300",
                  iconSizeClasses[size],
                  iconColorClasses[iconColor],
                  animate && "group-hover:scale-125 group-hover:rotate-12 group-hover:shadow-2xl",
                )}
              >
                {item.icon}
              </div>

              {/* Enhanced Content - No Year */}
              <div className="flex-1 ml-6">
                <Card
                  className={cn(
                    "hover:shadow-xl transition-all duration-300 border-2 bg-gradient-to-br from-background to-background/80 backdrop-blur-sm",
                    animate && "group-hover:scale-[1.02] group-hover:border-primary/50 group-hover:shadow-primary/10",
                  )}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <CardTitle className="text-lg font-bold text-slate-800 group-hover:text-primary transition-all duration-300">
                        {item.title}
                      </CardTitle>
                      {item.status && item.status !== "completed" && (
                        <Badge
                          variant={item.status === "in-progress" ? "secondary" : "outline"}
                          className="text-xs animate-pulse"
                        >
                          {item.status}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-sm mb-4 leading-relaxed text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                      {item.description}
                    </CardDescription>
                    <div className="flex items-center text-xs text-muted-foreground group-hover:text-primary transition-colors duration-300">
                      <User className="w-3 h-3 mr-2 flex-shrink-0" />
                      <span className="font-medium">{item.innovator}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
)

Timeline.displayName = "Timeline"

export { Timeline, type TimelineItem, type TimelineProps }
