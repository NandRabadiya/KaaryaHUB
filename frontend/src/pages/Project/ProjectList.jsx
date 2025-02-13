import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import {
  MagnifyingGlassIcon,
  MixerHorizontalIcon,
  ListBulletIcon,
} from "@radix-ui/react-icons";
import * as RadixIcons from "@radix-ui/react-icons";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import ProjectCard from "./ProjectCard";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export const tags = [
  "all", "react", "nodejs", "express", "mongodb", "typescript",
  "javascript", "css", "html", "tailwindcss", "bootstrap",
];

const ProjectList = () => {
  const [keyword, setKeyword] = React.useState("");
  const [viewMode, setViewMode] = React.useState("grid");
  
  const handleFilterChange = (section, value) => {
    console.log(value, section);
  };

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
  };

  const FilterContent = () => (
    <div className="space-y-7">
      <div>
        <h2 className="text-lg font-display mb-4">Category</h2>
        <RadioGroup
          onValueChange={(value) => handleFilterChange("category", value)}
          className="space-y-3"
          defaultValue="all"
        >
          {["all", "fullstack", "frontend", "backend"].map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <RadioGroupItem value={category} id={`category-${category}`} />
              <Label htmlFor={`category-${category}`} className="capitalize">
                {category.replace("_", " ")}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="pt-4">
        <h2 className="text-lg font-display mb-4">Tags</h2>
        <RadioGroup
          onValueChange={(value) => handleFilterChange("tag", value)}
          className="space-y-3"
        >
          {tags.map((tag) => (
            <div key={tag} className="flex items-center space-x-2">
              <RadioGroupItem value={tag} id={`tag-${tag}`} />
              <Label htmlFor={`tag-${tag}`} className="capitalize">
                {tag}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar for desktop */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <Card className="sticky top-8 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display">Filters</h2>
            <ThemeToggle/>
            </div>
            <ScrollArea className="h-[calc(100vh-12rem)]">
              <FilterContent />
            </ScrollArea>
          </Card>
        </aside>

        {/* Main content */}
        <main className="flex-1">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Input
                  onChange={handleSearchChange}
                  placeholder="Search projects..."
                  className="pl-10"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <RadixIcons.LayoutIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <ListBulletIcon className="h-4 w-4" />
                </Button>
                
                {/* Mobile filter button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <MixerHorizontalIcon className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <ScrollArea className="h-[calc(100vh-4rem)]">
                      <FilterContent />
                    </ScrollArea>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            <div className={`grid gap-6 ${
              viewMode === "grid" 
                ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
                : "grid-cols-1"
            }`}>
              {(keyword ? [1, 1, 1] : [1, 1, 1, 1, 1, 1, 1, 1]).map((item, index) => (
                <ProjectCard key={index} layout={viewMode} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProjectList;